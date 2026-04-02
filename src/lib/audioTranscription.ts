type OpenAiTranscriptionResponse = {
  text?: string;
  error?: {
    message?: string;
  };
};

export type WhisperTranscriptionResult =
  | { ok: true; text: string }
  | { ok: false; code: 'missing_key' | 'empty_audio' | 'api_error' | 'network_error'; message: string };

export async function transcribeWithWhisper(audioBlob: Blob): Promise<WhisperTranscriptionResult> {
  const env = import.meta.env as Record<string, string | undefined>;
  const groqApiKey = (env.VITE_GROQ_API_KEY ?? env['\uFEFFVITE_GROQ_API_KEY'])?.trim();
  const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY?.trim();
  const useGroq = Boolean(groqApiKey);
  const apiKey = useGroq ? groqApiKey : openAiApiKey;
  if (!apiKey) {
    return {
      ok: false,
      code: 'missing_key',
      message: 'Whisper nao configurado. Defina VITE_GROQ_API_KEY no .env.local e reinicie o projeto.',
    };
  }

  if (!audioBlob.size || audioBlob.size < 2048) {
    return {
      ok: false,
      code: 'empty_audio',
      message: 'Audio muito curto ou vazio. Grave por pelo menos 2 segundos e tente novamente.',
    };
  }

  const model = useGroq
    ? import.meta.env.VITE_GROQ_WHISPER_MODEL?.trim() || 'whisper-large-v3-turbo'
    : import.meta.env.VITE_OPENAI_WHISPER_MODEL?.trim() || 'whisper-1';
  const formData = new FormData();
  formData.append('model', model);
  formData.append('language', 'pt');
  formData.append('response_format', 'json');
  formData.append('file', audioBlob, 'mensagem.webm');

  try {
    const endpoint = useGroq
      ? 'https://api.groq.com/openai/v1/audio/transcriptions'
      : 'https://api.openai.com/v1/audio/transcriptions';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const payload = (await response.json()) as OpenAiTranscriptionResponse;

    if (!response.ok) {
      const detail = payload.error?.message?.trim();
      return {
        ok: false,
        code: 'api_error',
        message: detail || `Falha na transcricao (HTTP ${response.status}).`,
      };
    }

    const text = payload.text?.trim();
    if (!text) {
      return {
        ok: false,
        code: 'empty_audio',
        message: 'Nao houve texto reconhecido no audio. Fale mais perto do microfone e tente novamente.',
      };
    }

    return { ok: true, text };
  } catch {
    return {
      ok: false,
      code: 'network_error',
      message: 'Falha de rede ao chamar o Whisper. Verifique conexao e permissoes do navegador.',
    };
  }
}
