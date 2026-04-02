const PRODUCT_NAME = 'Flashforge AD5X - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Velocidade Máxima', value: '600 mm/s' },
  { label: 'Volume de Impressão', value: '220 x 220 x 220 mm' },
  { label: 'Multicolor', value: 'IFS com 4 cores' },
  { label: 'Retomada', value: '99% após queda de energia' },
];

const TECH_SPECS = [
  { name: 'Arquitetura', value: 'CoreXY' },
  { name: 'Velocidade máxima oficial', value: '600 mm/s' },
  { name: 'Aceleração oficial', value: '20.000 mm/s2' },
  { name: 'Volume útil', value: '220 x 220 x 220 mm' },
  { name: 'Sistema multicolor', value: 'IFS (4 cores)' },
  { name: 'Nivelamento', value: 'One-click auto-leveling' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (Quick Start + parâmetros oficiais)',
    description: 'Documento oficial em PDF com parâmetros, instalação inicial e operação.',
    href: 'https://wiki.flashforge.com/resource/models/ad5x/files/quick_start_guide/Flashforge_AD5X_Quick_Start_Guide_EN.pdf',
  },
  {
    title: 'Manual do Usuário (PDF)',
    description: 'Guia completo oficial da AD5X para uso, manutenção e operação diária.',
    href: 'https://wiki.flashforge.com/resource/models/ad5x/files/user_guide/Flashforge_AD5X_User_Guide_EN.pdf',
  },
];

export default function ProductFlashforgeAd5xPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-ad5x">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>Flashforge AD5X</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/flashforge-ad5x-multicolor.webp" alt="Flashforge AD5X multicolor" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Produto em destaque 2026</span>
            <h1>Flashforge AD5X</h1>
            <p>
              Impressora 3D de alta velocidade com sistema multicolor para times que precisam unir velocidade,
              qualidade visual e repetibilidade em ambiente comercial.
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
              <li>Suporte comercial no Brasil</li>
              <li>Onboarding técnico inicial</li>
              <li>Aplicação ideal para prototipagem visual e apresentação</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Padrão usado por líderes de mercado: métricas-chave visíveis antes do bloco técnico completo.</p>
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
            <p>Resumo técnico para acelerar comparação e aprovação comercial.</p>
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
            <p>Arquivos para time técnico e comercial baixarem direto da fonte oficial da Flashforge.</p>
          </header>
          <div className="product-download-grid">
            {DOWNLOADS.map((item) => (
              <article className="product-download-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} target="_blank" rel="noreferrer">Download PDF</a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
