const PRODUCT_NAME = 'EXYZprint PRO';

const TOP_HIGHLIGHTS = [
  { label: 'Classe de Uso', value: 'Prototipagem e baixo volume' },
  { label: 'Fluxo', value: 'Operação contínua em lotes curtos' },
  { label: 'Compatibilidade', value: 'Materiais técnicos (perfil por aplicação)' },
  { label: 'Foco', value: 'Consistência e acabamento' },
];

const TECH_SPECS = [
  { name: 'Nome comercial', value: 'EXYZprint PRO' },
  { name: 'Referência técnica', value: 'Família da Vinci 1.0 Pro' },
  { name: 'Aplicação principal', value: 'Prototipagem funcional e visual' },
  { name: 'Operação', value: 'Células de baixa escala e repetibilidade' },
  { name: 'Materiais', value: 'Perfis técnicos conforme setup de processo' },
  { name: 'Observação', value: 'Parâmetros finais dependem de firmware e configuração de nozzle/material' },
];

const DOWNLOADS = [
  {
    title: 'Ficha Técnica (download interno)',
    description: 'Arquivo interno com resumo técnico-comercial do EXYZprint PRO.',
    href: '/docs/exyzprint-pro-ficha-tecnica.txt',
    download: true,
  },
  {
    title: 'Manual Operacional (download interno)',
    description: 'Guia operacional resumido para setup, rotina e manutenção preventiva.',
    href: '/docs/exyzprint-pro-manual-operacional.txt',
    download: true,
  },
  {
    title: 'Manual completo (referencia externa)',
    description: 'Manual técnico da família da Vinci 1.0 Pro para consulta detalhada.',
    href: 'https://www.manualslib.com/manual/1111042/Xyz-Printing-Da-Vinci-1-0-Pro.html',
    download: false,
  },
];

export default function ProductExyzprintProPage() {
  return (
    <section className="product section-flow section-reveal" id="produto-exyzprint-pro">
      <div className="product-container section-parallax">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/catalogo">Catálogo</a>
          <span>/</span>
          <strong>EXYZprint PRO</strong>
        </nav>

        <header className="product-hero">
          <div className="product-hero-media">
            <img src="/ezy.webp" alt="EXYZprint PRO" loading="eager" />
          </div>

          <div className="product-hero-content">
            <span className="product-badge">Linha prototipagem 2026</span>
            <h1>EXYZprint PRO</h1>
            <p>
              Plataforma para prototipagem e produção de baixo volume com foco em consistência de processo e
              acabamento, no mesmo padrão de navegação dos demais produtos do catálogo.
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
              <li>Padrão operacional para lotes curtos</li>
              <li>Boa aderência para validação de design e engenharia</li>
              <li>Documentos técnicos de apoio já disponíveis para download</li>
            </ul>
          </div>
        </header>

        <section className="product-section" id="produto-detalhes">
          <header className="product-section-header">
            <h2>Destaques acima da dobra</h2>
            <p>Mesma estrutura de decisão adotada nas demais páginas de produto do catálogo.</p>
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
            <p>Resumo para comparação interna e consolidação de proposta comercial.</p>
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
            <h2>Downloads</h2>
            <p>Ficha técnica e manual no mesmo padrão das outras páginas de produto.</p>
          </header>
          <div className="product-download-grid">
            {DOWNLOADS.map((item) => (
              <article className="product-download-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a
                  href={item.href}
                  target={item.download ? undefined : '_blank'}
                  rel={item.download ? undefined : 'noreferrer'}
                  download={item.download || undefined}
                >
                  {item.download ? 'Download' : 'Abrir recurso'}
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
