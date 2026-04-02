import { trackEvent } from '../lib/analytics';

const OUTCOME_CARDS = [
  {
    label: 'CUSTO POR PEÇA',
    value: '-18% a -35%',
    description: 'Meta típica após padronização de parâmetros, setup e materiais.',
  },
  {
    label: 'LEAD TIME TÉCNICO',
    value: '-30%',
    description: 'Reduzimos retrabalho e aceleramos aprovação de protótipos.',
  },
  {
    label: 'PREVISIBILIDADE',
    value: 'SLA definido',
    description: 'Fluxo com checkpoints objetivos para time comercial e engenharia.',
  },
];

const SIDE_CARDS = [
  {
    title: 'Diagnóstico 360',
    description: 'Leitura técnica e comercial do processo atual com prioridades de ganho por etapa.',
  },
  {
    title: 'Plano 90 dias',
    description: 'Roadmap de implantação com entregas objetivas, responsabilidade e meta por ciclo.',
  },
  {
    title: 'Governança de escala',
    description: 'Indicadores e rituais de controle para manter qualidade, prazo e margem ao crescer.',
  },
];

const METHOD_STEPS = [
  {
    title: 'Diagnóstico operacional',
    description:
      'Levantamento de máquinas, materiais, gargalos, capacidade, variação de qualidade e maturidade do processo atual.',
  },
  {
    title: 'Plano técnico-comercial',
    description:
      'Definimos mix de materiais, famílias de peças, matriz de custo por aplicação e modelo de proposta para venda com margem.',
  },
  {
    title: 'Implantação guiada',
    description:
      'Executamos setup de parâmetros, padrão de operação, checklists de qualidade e rotina de validação para lote piloto.',
  },
  {
    title: 'Escala e controle',
    description:
      'Entregamos indicadores de performance, rotina de melhoria contínua e governança para manter consistência no crescimento.',
  },
];

const DELIVERABLES = [
  'Mapa de capacidade e gargalos',
  'Matriz de materiais por aplicação',
  'Modelo de custo por peça e margem-alvo',
  'Playbook de operação e qualidade',
  'Roteiro de escala para 90 dias',
];

const FAQ_ITEMS = [
  {
    question: 'Para quem essa consultoria é indicada?',
    answer:
      'Para empresas que já produzem ou desejam estruturar uma operação de impressão 3D com previsibilidade técnica e comercial.',
  },
  {
    question: 'A consultoria inclui treinamento de equipe?',
    answer:
      'Sim. O plano inclui transferência prática de método para operação, qualidade e tomada de decisão comercial.',
  },
  {
    question: 'Qual o prazo médio de implantação?',
    answer:
      'Depende da maturidade atual, mas normalmente iniciamos ganhos perceptíveis entre 30 e 60 dias de execução.',
  },
  {
    question: 'Vocês atendem remoto e presencial?',
    answer:
      'Atendemos em formato híbrido. A combinação é definida no diagnóstico inicial conforme escopo e criticidade.',
  },
];

export default function ConsultoriaPage() {
  return (
    <section className="consulting section-flow section-reveal" id="consultoria">
      <div className="consulting-container">
        <header className="consulting-hero">
          <div className="consulting-hero-copy">
            <span className="consulting-badge">CONSULTORIA PRISM 3D</span>
            <h1>Consultoria para transformar impressão 3D em operação escalável.</h1>
            <p>
              Estruturamos processo, custo e qualidade para seu time vender melhor, produzir com consistência e
              crescer com margem.
            </p>

            <div className="consulting-cta-group">
              <a
                className="catalog-cta catalog-cta--primary"
                href="/#cta"
                onClick={() => {
                  trackEvent('cta_click', {
                    area: 'consultoria_page',
                    cta: 'solicitar_diagnostico',
                    destination: '/#cta',
                  });
                }}
              >
                Solicitar diagnóstico
              </a>
              <a
                className="catalog-cta catalog-cta--secondary"
                href="https://wa.me/558133334455?text=Ol%C3%A1%2C%20PRISM%203D!%20Gostaria%20de%20saber%20mais%20sobre%20a%20consultoria%20para%20opera%C3%A7%C3%A3o%20de%20impress%C3%A3o%203D."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('cta_click', {
                    area: 'consultoria_page',
                    cta: 'falar_com_especialista',
                    destination: 'whatsapp',
                  });
                }}
              >
                Falar com especialista
              </a>
            </div>
          </div>
          <aside className="consulting-hero-visual" aria-label="Painel visual da consultoria">
            <div className="consulting-hero-media" aria-hidden="true">
              <span className="consulting-hero-slide consulting-hero-slide--one" />
              <span className="consulting-hero-slide consulting-hero-slide--two" />
            </div>
          </aside>
        </header>

        <section className="consulting-card-row" aria-label="Indicadores e plano de consultoria">
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
            <h2>Metodologia de implantação</h2>
            <p>Estrutura em quatro etapas para reduzir risco e acelerar resultado.</p>
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
            <h2>Entregáveis principais</h2>
            <p>O que seu time recebe para operar com padrão e previsibilidade.</p>
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
            <p>Respostas objetivas para aprovação técnica e comercial.</p>
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
