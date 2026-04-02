const PRODUCT_NAME = 'Bambu Lab P2S + AMS 2 Pro - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Velocidade Máxima', value: '1000 mm/s' },
  { label: 'Aceleração Máxima', value: '30.000 mm/s²' },
  { label: 'Volume de Impressão', value: '260 x 260 x 260 mm' },
  { label: 'Fluxo Multicolor', value: 'Até 24 cores (AMS 2 Pro)' },
];

const TECH_SPECS = [
  { name: 'Configuração', value: 'P2S + AMS 2 Pro (multicolor)' },
  { name: 'Volume útil', value: '260 x 260 x 260 mm' },
  { name: 'Velocidade de impressão', value: 'Até 1000 mm/s' },
  { name: 'Aceleração', value: 'Até 30.000 mm/s²' },
  { name: 'Temperatura de hotend', value: 'Até 350 °C' },
  { name: 'Temperatura de mesa', value: 'Até 120 °C' },
  { name: 'Câmara aquecida', value: 'Até 60 °C' },
  { name: 'Vazão máxima', value: 'Até 40 mm³/s' },
];

const DOWNLOADS = [
  {
    title: 'Página oficial P2S',
    description: 'Visão geral do equipamento, recursos e posicionamento da linha P2S.',
    href: 'https://bambulab.com/pt-br/p2s',
  },
  {
    title: 'Ficha técnica oficial (Specs)',
    description: 'Tabela oficial com volume, velocidade, aceleração e envelope térmico.',
    href: 'https://bambulab.com/pt-br/p2s/specs',
  },
  {
    title: 'FAQ e operação',
    description: 'Perguntas frequentes com orientações de uso, materiais e configuração.',
    href: 'https://bambulab.com/pt-br/p2s/faq',
  },
  {
    title: 'Showcase de aplicações',
    description: 'Galeria de aplicações e resultados para referência comercial e técnica.',
    href: 'https://bambulab.com/pt-br/p2s/showcase',
  },
];

export default function ProductBambuH2sPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-p2s">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>Bambu Lab P2S</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/bambu-lab-h2s-ams2pro-cinza.webp" alt="Bambu Lab P2S com AMS 2 Pro" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Linha profissional 2026</span>
            <h1>Bambu Lab P2S + AMS 2 Pro</h1>
            <p>
              Plataforma de alta performance para equipes que precisam imprimir mais rápido, com repetibilidade e
              operação multicolor no mesmo fluxo de trabalho.
            </p>

            <div className="product-hero-cta-group">
              <a className="product-cta product-cta--primary" href="#produto-downloads">Baixar ficha e manual</a>
              <a
                className="product-cta product-cta--secondary"
                href={`/?orcamento=${encodeURIComponent(PRODUCT_NAME)}#hero`}
              >
                Solicitar orçamento
              </a>
            </div>

            <ul className="product-trust-list">
              <li>Fluxo multicolor com AMS 2 Pro e expansão para até 24 cores</li>
              <li>Envelope térmico técnico: 350 °C (hotend), 120 °C (mesa) e 60 °C (câmara)</li>
              <li>Ecossistema Bambu Studio, aplicativo e atualizações OTA</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Padrão de PDP profissional com os números-chave de decisão no primeiro scroll.</p>
          </header>
          <div className="product-highlight-grid">
            {TOP_HIGHLIGHTS.map((item) => (
              <article className="product-highlight-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="product-section" id="produto-especificacoes">
          <header className="product-section-header">
            <h2>Especificações técnicas</h2>
            <p>Resumo técnico para comparação, homologação interna e validação comercial.</p>
          </header>
          <div className="product-spec-grid">
            {TECH_SPECS.map((spec) => (
              <article className="product-spec-card" key={spec.name}>
                <h3>{spec.name}</h3>
                <p>{spec.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="product-section" id="produto-downloads">
          <header className="product-section-header">
            <h2>Downloads e fontes oficiais</h2>
            <p>Links oficiais para equipe técnica e comercial validar ficha, operação e aplicações.</p>
          </header>
          <div className="product-download-grid">
            {DOWNLOADS.map((item) => (
              <article className="product-download-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} target="_blank" rel="noreferrer">Abrir recurso</a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
