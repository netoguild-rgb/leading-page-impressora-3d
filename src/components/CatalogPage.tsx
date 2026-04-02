import { useCallback, useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { toSitePath } from '../lib/sitePath';

type CatalogItem = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  image?: string;
  productHref?: string;
};

const CATALOG_ITEMS: CatalogItem[] = [
  {
    title: 'Flashforge AD5X - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Impressora 3D CoreXY com impressão multicolor em 4 cores para prototipagem visual e peças de apresentação.',
    highlights: [
      'Impressão multicolor com módulo IFS (4 cores)',
      'Velocidade máxima de 600 mm/s e aceleração de 20.000 mm/s²',
      'Retomada após queda de energia com alta taxa de sucesso',
    ],
    image: '/flashforge-ad5x-multicolor.webp',
    productHref: '/catalogo/produtos/flashforge-ad5x',
  },
  {
    title: 'Bambu Lab P2S + AMS 2 Pro - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Plataforma de impressão 3D de alta velocidade com fluxo multicolor para operação profissional.',
    highlights: [
      'Até 24 cores com AMS 2 Pro',
      'Volume de impressão de 260 x 260 x 260 mm',
      'Velocidade máxima de 1000 mm/s com aceleração de até 30.000 mm/s²',
    ],
    image: '/bambu-lab-h2s-ams2pro-cinza.webp',
    productHref: '/catalogo/produtos/bambu-lab-h2s-ams-combo',
  },
  {
    title: 'Bambu Lab A1 Combo (AMS Lite) - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Impressora de entrada avançada com calibração automática e sistema multicolor no combo com AMS Lite.',
    highlights: [
      'Combo inclui AMS Lite para impressão multicolor',
      'Volume de impressão de 256 x 256 x 256 mm',
      'Calibração full-auto com compensação ativa de fluxo',
    ],
    image: '/bambu-lab-a1-ams-lite-combo.webp',
    productHref: '/catalogo/produtos/bambu-lab-a1-combo-ams-lite',
  },
  {
    title: 'Creality Ender-3 V3 SE - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Modelo FDM para operação rápida no dia a dia com foco em simplicidade de uso e setup curto.',
    highlights: [
      'Volume de impressão de 220 x 220 x 250 mm',
      'Velocidade máxima de 250 mm/s (típica de 180 mm/s)',
      'Auto leveling com CR Touch e ajuste automático de Z-offset',
    ],
    image: '/creality-ender-3-v3-se.webp',
    productHref: '/catalogo/produtos/creality-ender-3-v3-se',
  },
  {
    title: 'CreatBot D1000 HS - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Plataforma industrial de grande formato para peças de grande porte e produção contínua.',
    highlights: [
      'Volume de impressão de 1050 x 1050 x 1050 mm',
      'Velocidade estável de até 300 mm/s e fluxo de até 90 mm³/s',
      'Sistema industrial com extrusoras de alta temperatura para materiais de engenharia',
    ],
    image: '/creatbot-d1000-hs.webp',
    productHref: '/catalogo/produtos/creatbot-d1000-hs',
  },
  {
    title: 'Anycubic Kobra S1 Combo - Versão Catálogo 2026',
    category: 'Impressoras',
    description: 'Impressora CoreXY fechada para operação acelerada com suporte a impressão multicolor em combo.',
    highlights: [
      'Impressão em 4 ou 8 cores no combo',
      'Volume de impressão de 250 x 250 x 250 mm',
      'Velocidade máxima de 600 mm/s com aceleração de até 20.000 mm/s²',
    ],
    image: '/anycubic-kobra-s1-combo.webp',
    productHref: '/catalogo/produtos/anycubic-kobra-s1-combo',
  },
  {
    title: 'EXYZprint PRO',
    category: 'Impressoras',
    description: 'Plataforma para prototipagem e produção de baixo volume com foco em consistência e acabamento.',
    highlights: [
      'Operação contínua para lotes curtos',
      'Compatível com materiais técnicos',
      'Fluxo otimizado para aplicação industrial',
    ],
    image: '/ezy.webp',
    productHref: '/catalogo/produtos/exyzprint-pro',
  },
  {
    title: 'Linha Engrenagens Funcionais',
    category: 'Peças Mecânicas',
    description: 'Conjunto de peças para testes de encaixe, atrito e torque em ambiente real.',
    highlights: ['Geometria funcional', 'Foco em repetibilidade', 'Validação para protótipo funcional'],
  },
  {
    title: 'Aplicações Visuais Premium',
    category: 'Design',
    description: 'Modelos para demonstração comercial, protótipos estéticos e comunicação de produto.',
    highlights: ['Detalhe fino', 'Padrão visual elevado', 'Ideal para pitch e showroom'],
  },
  {
    title: 'Filamentos Técnicos',
    category: 'Materiais',
    description: 'Portfólio com PLA, PETG, ASA, TPU e grades para aplicações de maior exigência.',
    highlights: ['Material por aplicação', 'Melhor relação custo x desempenho', 'Suporte para padronização de processo'],
  },
];

export default function CatalogPage() {
  const categories = useMemo(() => ['Todos', ...new Set(CATALOG_ITEMS.map((item) => item.category))], []);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const openProductFromCard = useCallback((item: CatalogItem, source: 'card_click' | 'card_keyboard') => {
    if (!item.productHref) return;
    trackEvent('catalog_product_click', {
      source,
      product: item.title,
      category: item.category,
      destination: item.productHref,
    });
    window.location.href = toSitePath(item.productHref);
  }, []);

  const visibleItems = useMemo(
    () => (activeCategory === 'Todos'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section className="catalog section-flow" id="catalogo">
      <div className="catalog-container">
        <header className="catalog-header">
          <span className="catalog-badge">CATÁLOGO PRISM 3D</span>
          <h1>Produtos e soluções para transformar projeto em produção.</h1>
          <p>
            Catálogo comercial sem preço público. Selecione por categoria e solicite orçamento para cada item.
          </p>
        </header>

        <div className="catalog-filters" role="tablist" aria-label="Filtro de categorias">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                className={`catalog-filter-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  trackEvent('catalog_filter_click', {
                    category,
                  });
                }}
                role="tab"
                aria-selected={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="catalog-grid" id="catalogo-produtos">
          {visibleItems.map((item) => (
            <article
              className={`catalog-card ${item.productHref ? 'catalog-card--clickable' : ''}`}
              key={item.title}
              role={item.productHref ? 'link' : undefined}
              tabIndex={item.productHref ? 0 : undefined}
              onClick={item.productHref ? () => openProductFromCard(item, 'card_click') : undefined}
              onKeyDown={item.productHref
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProductFromCard(item, 'card_keyboard');
                    }
                  }
                : undefined}
            >
              {item.image ? (
                <div className="catalog-card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              ) : null}
              <span className="catalog-card-badge">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="catalog-card-footer">
                <a
                  className="catalog-card-cta"
                  href={item.productHref ?? `/?orcamento=${encodeURIComponent(item.title)}#hero`}
                  onClick={(event) => {
                    if (item.productHref) {
                      event.stopPropagation();
                      trackEvent('catalog_product_click', {
                        source: 'card_link',
                        product: item.title,
                        category: item.category,
                        destination: item.productHref,
                      });
                      return;
                    }

                    trackEvent('catalog_quote_click', {
                      source: 'card_link',
                      product: item.title,
                      category: item.category,
                      destination: '/#hero',
                    });
                  }}
                >
                  {item.productHref ? 'Ver produto' : 'Solicitar orçamento'}
                </a>
              </div>
            </article>
          ))}
        </div>

        <footer className="catalog-footer">
          <a
            className="catalog-cta catalog-cta--primary"
            href="/#hero"
            onClick={() => {
              trackEvent('catalog_footer_cta_click', {
                cta: 'falar_comercial',
                destination: '/#hero',
              });
            }}
          >
            Falar com comercial
          </a>
          <a
            className="catalog-cta catalog-cta--secondary"
            href="/blog"
            onClick={() => {
              trackEvent('catalog_footer_cta_click', {
                cta: 'ver_blog_tecnico',
                destination: '/blog',
              });
            }}
          >
            Ver Blog Técnico
          </a>
        </footer>
      </div>
    </section>
  );
}
