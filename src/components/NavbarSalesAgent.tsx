import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { trackEvent } from '../lib/analytics';
import { requestSalesAgentReply, type SalesMessage } from '../lib/salesAgent';
import { transcribeWithWhisper } from '../lib/audioTranscription';
import { toSitePath } from '../lib/sitePath';

type ChatMessage = SalesMessage & {
  id: string;
};

type CatalogSuggestion = {
  href: string;
  name: string;
  category: string;
  image: string;
  summary: string;
};

const CATALOG_SUGGESTIONS_MAP: Record<string, CatalogSuggestion> = {
  '/catalogo/produtos/bambu-lab-h2s-ams-combo': {
    href: '/catalogo/produtos/bambu-lab-h2s-ams-combo',
    name: 'Bambu Lab P2S + AMS 2 Pro',
    category: 'Multicolor profissional',
    image: '/bambu-lab-h2s-ams2pro-cinza.webp',
    summary: 'Alta velocidade e fluxo multicolor para operação técnica.',
  },
  '/catalogo/produtos/bambu-lab-a1-combo-ams-lite': {
    href: '/catalogo/produtos/bambu-lab-a1-combo-ams-lite',
    name: 'Bambu Lab A1 Combo (AMS Lite)',
    category: 'Entrada avançada',
    image: '/bambu-lab-a1-ams-lite-combo.webp',
    summary: 'Calibração automática e multicolor com setup rápido.',
  },
  '/catalogo/produtos/flashforge-ad5x': {
    href: '/catalogo/produtos/flashforge-ad5x',
    name: 'Flashforge AD5X',
    category: 'CoreXY multicolor',
    image: '/flashforge-ad5x-multicolor.webp',
    summary: 'Alta produtividade para protótipos e peças de apresentação.',
  },
  '/catalogo/produtos/creality-ender-3-v3-se': {
    href: '/catalogo/produtos/creality-ender-3-v3-se',
    name: 'Creality Ender-3 V3 SE',
    category: 'FDM de entrada',
    image: '/creality-ender-3-v3-se.webp',
    summary: 'Operação simples para começar produção com baixo custo.',
  },
  '/catalogo/produtos/creatbot-d1000-hs': {
    href: '/catalogo/produtos/creatbot-d1000-hs',
    name: 'CreatBot D1000 HS',
    category: 'Industrial grande formato',
    image: '/creatbot-d1000-hs.webp',
    summary: 'Volume extremo para peças grandes e lotes industriais.',
  },
  '/catalogo/produtos/anycubic-kobra-s1-combo': {
    href: '/catalogo/produtos/anycubic-kobra-s1-combo',
    name: 'Anycubic Kobra S1 Combo',
    category: 'CoreXY fechado',
    image: '/anycubic-kobra-s1-combo.webp',
    summary: 'Velocidade elevada e operação multicolor em combo.',
  },
  '/catalogo/produtos/exyzprint-pro': {
    href: '/catalogo/produtos/exyzprint-pro',
    name: 'EXYZprint PRO',
    category: 'Prototipagem técnica',
    image: '/ezy.webp',
    summary: 'Foco em consistência para baixo volume e acabamento.',
  },
};

function createId(role: SalesMessage['role']): string {
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createMessage(role: SalesMessage['role'], content: string): ChatMessage {
  return {
    id: createId(role),
    role,
    content,
  };
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function cleanLinkPunctuation(value: string): { clean: string; tail: string } {
  const match = value.match(/[)\].,;!?]+$/);
  if (!match) return { clean: value, tail: '' };
  const tail = match[0];
  return { clean: value.slice(0, -tail.length), tail };
}

function parseLineWithLinks(line: string): Array<{ type: 'text' | 'link'; value: string }> {
  const urlRegex = /(https?:\/\/[^\s]+|\/[A-Za-z0-9\-/_#?=&%.]+)/g;
  const parts = line.split(urlRegex).filter((part) => part.length > 0);
  return parts.flatMap((part) => {
    if (part.startsWith('http://') || part.startsWith('https://') || part.startsWith('/')) {
      const { clean, tail } = cleanLinkPunctuation(part);
      const items: Array<{ type: 'text' | 'link'; value: string }> = [];
      if (clean) items.push({ type: 'link', value: clean });
      if (tail) items.push({ type: 'text', value: tail });
      return items;
    }
    return [{ type: 'text', value: part }];
  });
}

function extractCatalogSuggestions(messageText: string): CatalogSuggestion[] {
  const regex = /\/catalogo\/produtos\/[a-z0-9-]+/gi;
  const rawMatches = messageText.match(regex) ?? [];
  const unique = Array.from(new Set(rawMatches.map((item) => item.toLowerCase())));
  return unique
    .map((href) => CATALOG_SUGGESTIONS_MAP[href])
    .filter((item): item is CatalogSuggestion => Boolean(item))
    .slice(0, 3);
}

type NavbarSalesAgentProps = {
  onActiveChange?: (active: boolean) => void;
};

export default function NavbarSalesAgent({ onActiveChange }: NavbarSalesAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const hasAutoIntroRef = useRef(false);

  const canSend = useMemo(
    () => inputValue.trim().length > 0 && !isLoading && !isTranscribing,
    [inputValue, isLoading, isTranscribing]
  );

  const ensureAutoIntro = useCallback(() => {
    if (hasAutoIntroRef.current) return;
    if (messagesRef.current.length > 0) return;

    const greeting = getTimeGreeting();
    const intro = createMessage(
      'assistant',
      `${greeting}! Eu sou a Especialista IA da PRISM 3D.\nEstou aqui para te ajudar com impressoras 3D, materiais, ajustes de impressão e escolha do melhor equipamento para sua aplicação.\nSe quiser, me conte o que você pretende fabricar e eu te oriento passo a passo.`
    );

    setMessages([intro]);
    messagesRef.current = [intro];
    hasAutoIntroRef.current = true;
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages, isLoading]);

  useEffect(() => {
    onActiveChange?.(isOpen || isHovering);
    return () => {
      onActiveChange?.(false);
    };
  }, [isOpen, isHovering, onActiveChange]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (wrapperRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isLoading || isTranscribing) return;

      trackEvent('sales_ai_message_sent', {
        area: 'header',
        size: text.length,
      });

      const userMessage = createMessage('user', text);
      const nextHistory: ChatMessage[] = [...messagesRef.current, userMessage];
      setMessages(nextHistory);
      messagesRef.current = nextHistory;
      setInputValue('');
      setIsLoading(true);

      const replyResult = await requestSalesAgentReply(
        nextHistory.map((message) => ({ role: message.role, content: message.content }))
      );

      setMessages((prev) => {
        const assistantText = replyResult.ok ? replyResult.text : replyResult.message;
        const next = [...prev, createMessage('assistant', assistantText)];
        messagesRef.current = next;
        return next;
      });
      setIsLoading(false);
    },
    [isLoading, isTranscribing]
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void sendMessage(inputValue);
    },
    [inputValue, sendMessage]
  );

  const handleAudioInteraction = useCallback(async () => {
    if (isTranscribing) return;

    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.requestData();
        mediaRecorderRef.current.stop();
      }
      return;
    }

    if (!('mediaDevices' in navigator) || !navigator.mediaDevices?.getUserMedia || !('MediaRecorder' in window)) {
      setMessages((prev) => [
        ...prev,
        createMessage(
          'assistant',
          'Seu navegador não suporta gravação de áudio para transcrição. Você pode continuar digitando normalmente.'
        ),
      ]);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const preferredMimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
      const supportedMimeType = preferredMimeTypes.find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = supportedMimeType
        ? new MediaRecorder(stream, { mimeType: supportedMimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);

        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });

        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }

        audioChunksRef.current = [];
        const transcription = await transcribeWithWhisper(audioBlob);

        if (transcription.ok) {
          trackEvent('sales_ai_voice_transcribed', {
            area: 'header',
            size: transcription.text.length,
          });
          void sendMessage(transcription.text);
        } else {
          trackEvent('sales_ai_voice_error', {
            area: 'header',
            code: transcription.code,
          });
          setMessages((prev) => [...prev, createMessage('assistant', transcription.message)]);
        }

        setIsTranscribing(false);
      };

      recorder.start(250);
      setIsRecording(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage(
          'assistant',
          'Não consegui acessar o microfone. Verifique a permissão do navegador e tente novamente.'
        ),
      ]);
    }
  }, [isRecording, isTranscribing, sendMessage]);

  return (
    <div
      className={`navbar-sales ${isOpen ? 'is-open' : ''}`}
      ref={wrapperRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        type="button"
        className="navbar-sales-trigger"
        onClick={() => {
          const willOpen = !isOpen;
          if (willOpen) ensureAutoIntro();
          setIsOpen(willOpen);
          trackEvent('sales_ai_toggle', {
            area: 'header',
            state: isOpen ? 'close' : 'open',
          });
        }}
        aria-expanded={isOpen}
        aria-controls="navbar-sales-panel"
        aria-label="Abrir Especialista IA"
      >
        <img src="/botao especialista ia.png" alt="Especialista IA" loading="lazy" />
      </button>

      {isOpen ? (
        <section id="navbar-sales-panel" className="navbar-sales-panel" aria-label="Especialista IA PRISM 3D">
          <header className="navbar-sales-header">
            <div className="navbar-sales-brand">
              <span className="navbar-sales-logo" aria-label="Logo prism3d">
                prism<span>3d</span>
              </span>
              <h3>Especialista IA</h3>
            </div>
          </header>

          <div className="navbar-sales-messages" role="log" aria-live="polite">
            {messages.map((message) => (
              <article key={message.id} className={`navbar-sales-msg ${message.role === 'assistant' ? 'is-assistant' : 'is-user'}`}>
                <div className="navbar-sales-msg-text">
                  {message.content.split('\n').map((line, lineIndex) => (
                    <p key={`${message.id}-${lineIndex}`}>
                      {parseLineWithLinks(line).map((part, partIndex) => (
                        part.type === 'link'
                          ? (
                            <a
                              key={`${message.id}-${lineIndex}-${partIndex}`}
                              href={toSitePath(part.value)}
                              target={part.value.startsWith('http') ? '_blank' : undefined}
                              rel={part.value.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {part.value}
                            </a>
                            )
                          : (
                            <span key={`${message.id}-${lineIndex}-${partIndex}`}>{part.value}</span>
                            )
                      ))}
                    </p>
                  ))}

                  {message.role === 'assistant' ? (
                    (() => {
                      const suggestions = extractCatalogSuggestions(message.content);
                      if (!suggestions.length) return null;

                      return (
                        <div className="navbar-sales-suggestions" aria-label="Sugestões visuais de produtos do catálogo">
                          {suggestions.map((suggestion) => (
                            <a
                              key={`${message.id}-${suggestion.href}`}
                              className="navbar-sales-product-card"
                              href={toSitePath(suggestion.href)}
                              onClick={() => {
                                trackEvent('sales_ai_catalog_suggestion_click', {
                                  area: 'header',
                                  product: suggestion.name,
                                  destination: suggestion.href,
                                });
                              }}
                            >
                              <img src={suggestion.image} alt={suggestion.name} loading="lazy" />
                              <span className="navbar-sales-product-copy">
                                <strong>{suggestion.name}</strong>
                                <small>{suggestion.category}</small>
                                <em>{suggestion.summary}</em>
                              </span>
                              <span className="navbar-sales-product-cta">Ver</span>
                            </a>
                          ))}
                        </div>
                      );
                    })()
                  ) : null}
                </div>
              </article>
            ))}

            {isLoading ? (
              <article className="navbar-sales-msg is-assistant is-loading">
                <div className="navbar-sales-msg-text">
                  <p>Analisando...</p>
                </div>
              </article>
            ) : null}
            <div ref={endRef} />
          </div>

          <form className="navbar-sales-form" onSubmit={onSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Digite sua dúvida sobre impressão 3D"
              disabled={isLoading || isTranscribing}
            />
            <button
              type="button"
              className={`navbar-sales-mic ${isRecording ? 'is-recording' : ''}`}
              onClick={() => {
                void handleAudioInteraction();
              }}
              disabled={isLoading || isTranscribing}
            >
              {isRecording ? 'Parar' : isTranscribing ? 'Whisper...' : 'Áudio'}
            </button>
            <button type="submit" disabled={!canSend}>
              Enviar
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}

