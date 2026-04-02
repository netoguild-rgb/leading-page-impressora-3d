const PRODUCT_NAME = 'Anycubic Kobra S1 Combo - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Velocidade Máxima', value: '600 mm/s' },
  { label: 'Volume de Impressão', value: '250 x 250 x 250 mm' },
  { label: 'Multicolor', value: '4 ou 8 cores no combo' },
  { label: 'Hotend', value: 'Até 320 C' },
];

const TECH_SPECS = [
  { name: 'Modelo', value: 'Anycubic Kobra S1 Combo' },
  { name: 'Arquitetura', value: 'CoreXY totalmente fechada' },
  { name: 'Velocidade máxima', value: 'Até 600 mm/s' },
  { name: 'Volume útil', value: '250 x 250 x 250 mm' },
  { name: 'Hotend', value: 'Até 320 C' },
  { name: 'Filamentos suportados', value: 'PLA, ABS, ASA, PETG, TPU (conforme configuração oficial)' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (página oficial do produto)',
    description: 'Página oficial com especificações, recursos, comparativo e conteúdo da caixa.',
    href: 'https://store.anycubic.com/products/s1c-pla-high-speed-pla-special',
  },
  {
    title: 'Manual do Usuário (portal oficial Anycubic)',
    description: 'Portal oficial de firmware/software com links de user manual por modelo.',
    href: 'https://store.anycubic.com/pages/firmware-software',
  },
  {
    title: 'Guia de uso do slicer (PDF oficial)',
    description: 'Guia oficial Anycubic Slicer para preparação, configuração e fluxo de impressão.',
    href: 'https://cdn.shopify.com/s/files/1/0245/5519/2380/files/Anycubic_Slicer__Usage_instructions.pdf?v=1716348155',
  },
];

export default function ProductAnycubicKobraS1ComboPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-anycubic-kobra-s1-combo">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>Anycubic Kobra S1 Combo</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/anycubic-kobra-s1-combo.webp" alt="Anycubic Kobra S1 Combo" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Performance multicolor 2026</span>
            <h1>Anycubic Kobra S1 Combo</h1>
            <p>
              Solução CoreXY fechada para operação acelerada, com ecossistema combo voltado para impressão multicolor
              e uso comercial em prototipagem e peças funcionais.
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
              <li>Impressão multicolor em combo 4/8 cores</li>
              <li>Arquitetura fechada com foco em estabilidade</li>
              <li>Ecossistema Anycubic para software e suporte</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Padrão de mercado para PDP: velocidade, capacidade e diferenciais visíveis no primeiro bloco.</p>
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
            <p>Resumo técnico para comparativo entre plataformas e decisão comercial de compra.</p>
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
            <p>Links oficiais para ficha técnica, manual e guia operacional da Anycubic.</p>
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
