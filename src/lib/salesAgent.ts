export type SalesRole = 'user' | 'assistant';

export type SalesMessage = {
  role: SalesRole;
  content: string;
};

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

const SALES_LINKS = [
  { label: 'Catalogo completo', url: '/catalogo' },
  { label: 'Bambu Lab P2S + AMS 2 Pro', url: '/catalogo/produtos/bambu-lab-h2s-ams-combo' },
  { label: 'Bambu Lab A1 Combo (AMS Lite)', url: '/catalogo/produtos/bambu-lab-a1-combo-ams-lite' },
  { label: 'Flashforge AD5X', url: '/catalogo/produtos/flashforge-ad5x' },
  { label: 'Creality Ender-3 V3 SE', url: '/catalogo/produtos/creality-ender-3-v3-se' },
  { label: 'Anycubic Kobra S1 Combo', url: '/catalogo/produtos/anycubic-kobra-s1-combo' },
  { label: 'CreatBot D1000 HS', url: '/catalogo/produtos/creatbot-d1000-hs' },
  { label: 'Consultoria PRISM 3D', url: '/consultoria' },
  { label: 'Solicitar contato', url: '/#cta' },
] as const;

const SALES_SYSTEM_PROMPT = `
Voce e o Especialista IA da PRISM 3D.
Fale sempre em portugues do Brasil.

Seu papel:
- Responder duvidas sobre o universo de impressao 3D com linguagem clara.
- Qualificar necessidade do cliente (aplicacao, material, volume, prazo e meta de negocio).
- Recomendar o produto mais adequado e explicar o motivo em linguagem comercial clara quando houver oportunidade natural na conversa.
- Encaminhar links internos do site para acelerar a decisao.
- Convidar para o proximo passo comercial (contato ou proposta).

Especialidades tecnicas obrigatorias:
- Tipos de impressao: FDM, SLA, SLS, Metal e seus cenarios de uso.
- Materiais: PLA, PETG, ABS, ASA, TPU, Nylon, PC e compostos.
- Processo: orientacao de peca, suporte, adesao de mesa, warping, retracao, acabamento e tolerancia.
- Software: Bambu Studio, OrcaSlicer, Cura e PrusaSlicer.
- Operacao: manutencao basica, fluxo de producao, previsibilidade e qualidade.
- Negocio: custo por peca, margem, payback e selecao por aplicacao.

Regras:
- Use linguagem humana, acolhedora e prestativa.
- Demonstre atencao ao contexto do cliente e valide a necessidade antes de recomendar.
- Explique termos tecnicos de forma simples quando necessario.
- Seja objetivo, mas com tom consultivo e educado.
- Nao invente preco, estoque, prazo de entrega ou garantia.
- Se faltarem dados, faca perguntas objetivas.
- Mantenha respostas curtas, diretas e orientadas a conversao.
- Use no maximo 1 pergunta por resposta.
- Quando indicar produto, inclua o link interno correspondente.
- Ao recomendar equipamento, traga no maximo 3 opcoes.
- Nao force recomendacao de produto em toda resposta; primeiro resolva a duvida tecnica do cliente.

Links oficiais que voce pode usar:
${SALES_LINKS.map((item) => `- ${item.label}: ${item.url}`).join('\n')}

Formato recomendado:
1) Diagnostico rapido da necessidade.
2) Resposta tecnica objetiva.
3) Recomendacao com justificativa (quando fizer sentido).
4) Proximo passo com link.
`.trim();

export type SalesAgentReplyResult =
  | { ok: true; text: string }
  | { ok: false; code: 'missing_key' | 'api_error' | 'network_error' | 'empty_response'; message: string };

function trimHistory(history: SalesMessage[]): SalesMessage[] {
  const clean = history
    .map((message) => ({ role: message.role, content: message.content.trim() }))
    .filter((message) => message.content.length > 0);

  return clean.slice(-12);
}

export async function requestSalesAgentReply(history: SalesMessage[]): Promise<SalesAgentReplyResult> {
  const env = import.meta.env as Record<string, string | undefined>;
  const apiKey = (env.VITE_GROQ_API_KEY ?? env['\uFEFFVITE_GROQ_API_KEY'])?.trim();
  if (!apiKey) {
    return {
      ok: false,
      code: 'missing_key',
      message: 'IA não configurada. Defina VITE_GROQ_API_KEY no .env.local e reinicie o projeto.',
    };
  }

  const model = import.meta.env.VITE_GROQ_MODEL?.trim() || 'llama-3.3-70b-versatile';
  const messages = [
    { role: 'system', content: SALES_SYSTEM_PROMPT },
    ...trimHistory(history),
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 420,
        messages,
      }),
    });

    const payload = (await response.json()) as GroqChatCompletionResponse;

    if (!response.ok) {
      return {
        ok: false,
        code: 'api_error',
        message: payload.error?.message?.trim() || `Falha na resposta da IA (HTTP ${response.status}).`,
      };
    }

    const text = payload.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return {
        ok: false,
        code: 'empty_response',
        message: 'A IA não retornou conteúdo nesta tentativa. Tente novamente.',
      };
    }

    return { ok: true, text };
  } catch {
    return {
      ok: false,
      code: 'network_error',
      message: 'Falha de rede ao consultar a IA. Verifique sua conexão e tente novamente.',
    };
  }
}
