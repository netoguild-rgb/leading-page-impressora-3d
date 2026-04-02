import { trackEvent } from '../lib/analytics';

const OUTCOME_CARDS = [
  {
    label: 'CAPACIDADE DE ENTREGA',
    value: 'Lote piloto à série',
    description: 'Linha estruturada para validar projeto e escalar para produção recorrente com previsibilidade.',
  },
  {
    label: 'CONTROLE DE QUALIDADE',
    value: 'Padrão por checklist',
    description: 'Inspeção em etapas críticas para reduzir retrabalho e manter acabamento técnico consistente.',
  },
  {
    label: 'PRAZO OPERACIONAL',
    value: 'SLA acordado',
    description: 'Planejamento de fila, setup e despacho alinhado à necessidade comercial de cada cliente.',
  },
];

const SIDE_CARDS = [
  {
    title: 'Protótipo funcional',
    description: 'Validação rápida de geometria, encaixe e aplicação antes de abrir lote comercial.',
  },
  {
    title: 'Produção sob demanda',
    description: 'Fabricação em fluxo contínuo para baixo e médio volume com rastreabilidade por pedido.',
  },
  {
    title: 'Acabamento técnico',
    description: 'Suporte para pós-processo, organização de kit e entrega pronta para uso final.',
  },
];

const METHOD_STEPS = [
  {
    title: 'Briefing técnico-comercial',
    description:
      'Levantamos aplicação, volume, material e critério de qualidade para definir o melhor fluxo de produção.',
  },
  {
    title: 'Plano de fabricação',
    description:
      'Definimos parâmetros, sequência de máquina, tempo de ciclo e checkpoints de validação por etapa.',
  },
  {
    title: 'Execução assistida',
    description:
      'Rodamos lote piloto com acompanhamento técnico para garantir estabilidade e repetibilidade do processo.',
  },
  {
    title: 'Escala controlada',
    description:
      'Organizamos rotina de produção e indicadores para sustentar prazo, qualidade e margem em volumes maiores.',
  },
];

const DELIVERABLES = [
  'Plano técnico de execução por aplicação',
  'Matriz de materiais e acabamento recomendado',
  'Checklist de qualidade por etapa',
  'Roteiro de lote piloto e escala',
  'Canal técnico-comercial para acompanhamento',
];

const FAQ_ITEMS = [
  {
    question: 'Quais tipos de projeto o serviço atende?',
    answer:
      'Atendemos desde protótipos funcionais até lotes de produção de baixo e médio volume para aplicações técnicas e comerciais.',
  },
  {
    question: 'Vocês atendem apenas impressão 3D?',
    answer:
      'A base é impressão 3D, com suporte de acabamento e organização de entrega conforme a necessidade do projeto.',
  },
  {
    question: 'Como funciona o prazo de entrega?',
    answer:
      'O prazo é definido por escopo e volume, com SLA acordado após o briefing técnico e validação do lote piloto.',
  },
  {
    question: 'Posso contratar por demanda recorrente?',
    answer:
      'Sim. Estruturamos fluxo recorrente para empresas que precisam de reposição, personalização e previsibilidade de entrega.',
  },
];

export default function ServicesPage() {
  return (
    <section className="consulting services section-flow section-reveal" id="servicos">
      <div className="consulting-container">
        <header className="consulting-hero">
          <div className="consulting-hero-copy">
            <span className="consulting-badge">SERVIÇOS PRISM 3D</span>
            <h1>Serviços de fabricação 3D para transformar demanda em entrega consistente.</h1>
            <p>
              Operamos linha técnica para protótipos, lote piloto e produção sob demanda com foco em prazo, qualidade
              e repetibilidade.
            </p>

            <div className="consulting-cta-group">
              <a
                className="catalog-cta catalog-cta--primary"
                href="/#cta"
                onClick={() => {
                  trackEvent('cta_click', {
                    area: 'services_page',
                    cta: 'solicitar_proposta',
                    destination: '/#cta',
                  });
                }}
              >
                Solicitar proposta
              </a>
              <a
                className="catalog-cta catalog-cta--secondary"
                href="https://wa.me/558133334455?text=Ol%C3%A1%2C%20PRISM%203D!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20de%20fabrica%C3%A7%C3%A3o%203D."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('cta_click', {
                    area: 'services_page',
                    cta: 'falar_com_operacao',
                    destination: 'whatsapp',
                  });
                }}
              >
                Falar com operação
              </a>
            </div>
          </div>

          <aside className="consulting-hero-visual" aria-label="Linha de produção PRISM 3D">
            <div className="consulting-hero-media" aria-hidden="true">
              <span className="services-hero-bg" />
            </div>
          </aside>
        </header>

        <section className="consulting-card-row" aria-label="Capacidade operacional e modelo de atendimento">
          <div className="consulting-outcomes">
            {OUTCOME_CARDS.map((item) => (
              <article className="consulting-outcome-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="consulting-side-cards">
            {SIDE_CARDS.map((item) => (
              <article className="consulting-side-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="consulting-section">
          <header className="consulting-section-header">
            <h2>Fluxo de operação</h2>
            <p>Etapas objetivas para sair do briefing e chegar em entrega com padrão.</p>
          </header>

          <ol className="consulting-steps-grid">
            {METHOD_STEPS.map((step) => (
              <li className="consulting-step-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="consulting-section">
          <header className="consulting-section-header">
            <h2>Entregáveis do serviço</h2>
            <p>Itens que garantem aprovação técnica e continuidade comercial do projeto.</p>
          </header>

          <ul className="consulting-deliverables">
            {DELIVERABLES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="consulting-section">
          <header className="consulting-section-header">
            <h2>Perguntas frequentes</h2>
            <p>Respostas diretas para decisão de contratação e início de operação.</p>
          </header>

          <div className="consulting-faq">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="consulting-faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
