const PRODUCT_NAME = 'Bambu Lab A1 Combo (AMS Lite) - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Volume de Impressão', value: '256 x 256 x 256 mm' },
  { label: 'Multicolor', value: 'Combo com AMS Lite' },
  { label: 'Calibração', value: 'Full-auto com compensação de fluxo' },
  { label: 'Foco de Uso', value: 'Setup rápido para produção leve' },
];

const TECH_SPECS = [
  { name: 'Configuração', value: 'A1 Combo com AMS Lite' },
  { name: 'Volume útil', value: '256 x 256 x 256 mm' },
  { name: 'Nivelamento', value: 'Automático' },
  { name: 'Compensação de fluxo', value: 'Automática ativa' },
  { name: 'Público-alvo', value: 'Prototipagem rápida e lotes curtos' },
  { name: 'Ecossistema', value: 'Bambu Studio, Handy, wiki e OTA' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (página oficial A1)',
    description: 'Página oficial com especificações técnicas e detalhes do combo.',
    href: 'https://us.store.bambulab.com/products/a1',
  },
  {
    title: 'Manual / Wiki A1',
    description: 'Documentação oficial de uso, introdução e procedimentos do A1.',
    href: 'https://wiki.bambulab.com/en/a1/manual/intro-a1',
  },
  {
    title: 'Firmware e suporte A1',
    description: 'Página oficial de firmware, changelog e downloads da linha A1.',
    href: 'https://bambulab.com/es-mx/support/firmware-download/a1',
  },
];

export default function ProductBambuA1ComboPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-a1">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>Bambu Lab A1 Combo</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/bambu-lab-a1-ams-lite-combo.webp" alt="Bambu Lab A1 Combo com AMS Lite" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Linha comercial leve 2026</span>
            <h1>Bambu Lab A1 Combo (AMS Lite)</h1>
            <p>
              Impressora pensada para operação simples com resultado consistente, incluindo fluxo multicolor no
              combo com AMS Lite para acelerar apresentação e validação de produto.
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
              <li>Combo oficial com AMS Lite</li>
              <li>Setup rápido para equipes iniciando célula 3D</li>
              <li>Documentação e suporte oficial da Bambu Lab</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Estrutura de mercado para decisão rápida: capacidade, estabilidade de processo e valor operacional.</p>
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
            <p>Base técnica para homologação interna e comparação com outras impressoras da mesma faixa.</p>
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
            <h2>Downloads oficiais</h2>
            <p>Links oficiais para ficha técnica, manual e firmware do A1 Combo.</p>
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
