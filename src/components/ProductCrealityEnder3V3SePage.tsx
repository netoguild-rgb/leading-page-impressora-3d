const PRODUCT_NAME = 'Creality Ender-3 V3 SE - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Volume de Impressão', value: '220 x 220 x 250 mm' },
  { label: 'Velocidade Máxima', value: '250 mm/s' },
  { label: 'Velocidade Típica', value: '180 mm/s' },
  { label: 'Nivelamento', value: 'CR Touch + Z-offset auto' },
];

const TECH_SPECS = [
  { name: 'Modelo', value: 'Creality Ender-3 V3 SE' },
  { name: 'Volume útil', value: '220 x 220 x 250 mm' },
  { name: 'Velocidade de impressão', value: 'Até 250 mm/s (típica 180 mm/s)' },
  { name: 'Nivelamento', value: 'CR Touch automático' },
  { name: 'Ajuste de Z-offset', value: 'Automático' },
  { name: 'Foco de uso', value: 'Prototipagem, peças utilitárias e produção leve' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (página oficial do produto)',
    description: 'Página oficial da Ender-3 V3 SE com parâmetros e especificações.',
    href: 'https://www.creality.com/products/creality-ender-3-v3-se',
  },
  {
    title: 'Manual do Usuário (coleção oficial)',
    description: 'Coleção oficial de manuais da Ender-3 V3 SE em vários idiomas.',
    href: 'https://wiki.creality.com/en/ender-series/ender-3-v3-se/user-manual-multiple-language-collection',
  },
  {
    title: 'Central de Download (firmware, software e manual)',
    description: 'Página oficial de download da Ender-3 V3 SE com firmware, software e manual.',
    href: 'https://www.creality.com/download/creality-ender-3-v3-se',
  },
];

export default function ProductCrealityEnder3V3SePage() {
  return (
    <section className="product section-flow section-reveal" id="produto-ender-3-v3-se">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>Creality Ender-3 V3 SE</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/creality-ender-3-v3-se.webp" alt="Creality Ender-3 V3 SE" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Linha operacional 2026</span>
            <h1>Creality Ender-3 V3 SE</h1>
            <p>
              Impressora de entrada profissional para equipes que precisam iniciar rápido, com setup simples e
              repetibilidade para protótipos e peças de uso diário.
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
              <li>Nivelamento automático com CR Touch</li>
              <li>Ajuste automático de Z-offset para reduzir setup manual</li>
              <li>Boa opção de entrada para células de impressão 3D</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Estrutura de página de produto orientada à decisão técnica e comercial em poucos segundos.</p>
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
            <p>Resumo técnico para comparativo, aprovação e definição de escopo de aplicação.</p>
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
            <p>Links oficiais para specs e manual técnico da Ender-3 V3 SE.</p>
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
