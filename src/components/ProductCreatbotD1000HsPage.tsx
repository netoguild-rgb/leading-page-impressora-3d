const PRODUCT_NAME = 'CreatBot D1000 HS - Versão Catálogo 2026';

const TOP_HIGHLIGHTS = [
  { label: 'Volume de Impressão', value: '1050 x 1050 x 1050 mm' },
  { label: 'Velocidade Estável', value: 'Até 300 mm/s' },
  { label: 'Flow Rate', value: 'Até 90 mm3/s' },
  { label: 'Câmara Aquecida', value: 'Até 80 C' },
];

const TECH_SPECS = [
  { name: 'Plataforma', value: 'CreatBot D1000 Pro HS (linha D1000 HS)' },
  { name: 'Volume útil', value: '1050 x 1050 x 1050 mm' },
  { name: 'Velocidade estável', value: 'Até 300 mm/s' },
  { name: 'Flow rate máximo', value: 'Até 90 mm3/s' },
  { name: 'Hotend', value: 'Até 420 C' },
  { name: 'Aquecimento de câmara', value: 'Até 80 C' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (produto oficial)',
    description: 'Página oficial do D1000 Pro HS com especificações e recursos técnicos.',
    href: 'https://www.creatbot.com/en/d1000-hs/',
  },
  {
    title: 'Manual do Usuário (seção Downloads)',
    description: 'A própria página oficial possui bloco de Downloads com acesso ao User Manual.',
    href: 'https://www.creatbot.com/en/d1000-hs/#downloads',
  },
  {
    title: 'Central de Downloads CreatBot',
    description: 'Central oficial para software, manuais e recursos de impressoras CreatBot.',
    href: 'https://www.creatbot.com/en/download/',
  },
];

export default function ProductCreatbotD1000HsPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-creatbot-d1000-hs">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>CreatBot D1000 HS</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/creatbot-d1000-hs.webp" alt="CreatBot D1000 HS industrial" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Industrial grande formato 2026</span>
            <h1>CreatBot D1000 HS</h1>
            <p>
              Plataforma industrial para peças de grande porte, protótipos funcionais e lotes técnicos que exigem
              alto volume útil, estabilidade de processo e materiais de engenharia.
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
              <li>Linha de 1 metro cúbico para prototipagem de grande escala</li>
              <li>Arquitetura focada em repetibilidade industrial</li>
              <li>Adequada para ferramentas, moldes, fixtures e peças finais</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Padrão de mercado para produto industrial: capacidade, desempenho e ambiente térmico em evidência.</p>
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
            <p>Resumo para avaliação de engenharia, dimensionamento de célula e tomada de decisão comercial.</p>
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
            <p>Links oficiais para specs, manual e central de arquivos da CreatBot.</p>
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
