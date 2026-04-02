import { useEffect, useMemo, useRef, useState } from 'react';
import { BLOG_POSTS } from './blogPosts';
import { BLOG_NEWS_ITEMS } from './blogNews';

const POSTS_PER_PAGE = 10;
const BLOG_QUICK_FILTERS = [
  { key: 'noticias', label: 'Notícias' },
  { key: 'mercado', label: 'Mercado' },
  { key: 'materiais', label: 'Materiais' },
  { key: 'tecnologia', label: 'Tecnologia' },
  { key: 'custos', label: 'Custos' },
  { key: 'escala', label: 'Escala' },
] as const;

const INTERNAL_CATEGORY_BY_ID: Record<string, string> = {
  'tema-1': 'mercado',
  'tema-2': 'materiais',
  'tema-3': 'tecnologia',
  'tema-4': 'custos',
  'tema-5': 'escala',
};

type HubPost = {
  key: string;
  title: string;
  excerpt: string;
  image: string;
  updatedAt: string;
  author: string;
  href: string;
  external: boolean;
  sourceLabel?: string;
  type: 'internal' | 'news';
  categories: string[];
};

function Prism3dLogoMark({ className = '' }: { className?: string }) {
  return (
    <span className={`blog-logo-mark ${className}`.trim()} aria-label="Logo prism3d">
      prism<span>3d</span>
    </span>
  );
}

function clampPage(value: number, max: number): number {
  if (!Number.isFinite(value) || value < 1) return 1;
  if (value > max) return max;
  return Math.floor(value);
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function uniqueByKey(posts: HubPost[]): HubPost[] {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post.key)) return false;
    seen.add(post.key);
    return true;
  });
}

function getLinkAttributes(post: HubPost): { target?: string; rel?: string } {
  if (!post.external) return {};
  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

export default function BlogSection() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const internalPosts: HubPost[] = useMemo(
    () => BLOG_POSTS.map((post) => ({
      key: `internal-${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      updatedAt: post.updatedAt,
      author: post.author,
      href: `/blog/${post.slug}`,
      external: false,
      type: 'internal',
      categories: [INTERNAL_CATEGORY_BY_ID[post.id] ?? 'mercado'],
    })),
    []
  );

  const newsPosts: HubPost[] = useMemo(
    () => BLOG_NEWS_ITEMS.map((item) => ({
      key: `news-${item.slug}`,
      title: item.title,
      excerpt: item.excerpt,
      image: item.image,
      updatedAt: item.updatedAt,
      author: item.author,
      href: item.sourceUrl,
      external: true,
      sourceLabel: item.sourceLabel,
      type: 'news',
      categories: ['noticias'],
    })),
    []
  );

  const activeQuickFilterData = useMemo(
    () => BLOG_QUICK_FILTERS.find((filter) => filter.key === activeQuickFilter) ?? null,
    [activeQuickFilter]
  );

  const basePosts = useMemo(() => {
    if (!activeQuickFilterData) return internalPosts;
    if (activeQuickFilterData.key === 'noticias') return newsPosts;
    return internalPosts.filter((post) => post.categories.includes(activeQuickFilterData.key));
  }, [activeQuickFilterData, internalPosts, newsPosts]);

  const normalizedQuery = normalizeText(searchQuery.trim());
  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return basePosts;
    return basePosts.filter((post) => normalizeText(`${post.title} ${post.excerpt} ${post.author}`).includes(normalizedQuery));
  }, [normalizedQuery, basePosts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const searchParams = new URLSearchParams(window.location.search);
  const requestedPageRaw = searchParams.get('page');
  const requestedPage = Number(requestedPageRaw ?? '1');
  const currentPage = clampPage(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const pageHref = (page: number) => (page <= 1 ? '/blog' : `/blog?page=${page}`);
  const hasInvalidPageParam = requestedPageRaw !== null
    && (
      !Number.isFinite(requestedPage)
      || requestedPage < 1
      || Math.floor(requestedPage) !== requestedPage
      || requestedPage !== currentPage
    );

  const { heroPost, stackPosts, asidePosts, morePosts } = useMemo(() => {
    const fallbackPosts = filteredPosts.length ? filteredPosts : pagePosts;
    const hero = pagePosts[0] ?? fallbackPosts[0];

    if (!hero) {
      return { heroPost: null, stackPosts: [], asidePosts: [], morePosts: [] };
    }

    const stackCandidates = uniqueByKey([
      ...pagePosts.slice(1),
      ...filteredPosts.filter((post) => post.key !== hero.key),
    ]);
    const stack = stackCandidates.slice(0, 2);
    const used = new Set([hero.key, ...stack.map((post) => post.key)]);
    const aside = uniqueByKey([
      ...pagePosts.filter((post) => !used.has(post.key)),
      ...filteredPosts.filter((post) => !used.has(post.key)),
      ...internalPosts.filter((post) => !used.has(post.key)),
      ...newsPosts.filter((post) => !used.has(post.key)),
    ]).slice(0, 3);
    const usedWithAside = new Set([...used, ...aside.map((post) => post.key)]);
    const more = pagePosts.filter((post) => !usedWithAside.has(post.key));

    return {
      heroPost: hero,
      stackPosts: stack,
      asidePosts: aside,
      morePosts: more,
    };
  }, [filteredPosts, pagePosts, internalPosts, newsPosts]);

  useEffect(() => {
    if (!hasInvalidPageParam) return;
    const nextHref = pageHref(currentPage);
    const currentHref = `${window.location.pathname}${window.location.search}`;
    if (currentHref === nextHref) return;
    window.history.replaceState({}, '', nextHref);
  }, [currentPage, hasInvalidPageParam]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <section className="blog section-flow section-reveal" id="blog">
      <div className="blog-container section-parallax blog-hub">
        <header className="blog-hub-top">
          <div className={`blog-hub-search-wrap ${searchOpen ? 'is-open' : ''}`}>
            <button
              className={`blog-hub-search ${searchOpen ? 'is-active' : ''}`}
              type="button"
              aria-label="Pesquisar artigos"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              ⌕
            </button>
            <input
              ref={searchInputRef}
              className={`blog-hub-search-input ${searchOpen ? 'is-visible' : ''}`}
              type="search"
              value={searchQuery}
              placeholder="Pesquisar artigos..."
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  if (searchQuery.trim()) {
                    setSearchQuery('');
                  } else {
                    setSearchOpen(false);
                  }
                }
              }}
            />
            {searchOpen && searchQuery.trim() ? (
              <button
                className="blog-hub-search-clear"
                type="button"
                aria-label="Limpar pesquisa"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
              >
                ×
              </button>
            ) : null}
          </div>
          <h2 className="blog-hub-title">
            <span>Blog</span>
            <Prism3dLogoMark />
          </h2>
          <a className="blog-hub-subscribe" href="/#cta">Solicitar contato</a>
        </header>

        <nav className="blog-hub-nav" aria-label="Filtros de busca rápida do blog">
          {BLOG_QUICK_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`blog-hub-nav-item ${activeQuickFilter === filter.key ? 'is-active' : ''}`}
              aria-pressed={activeQuickFilter === filter.key}
              onClick={() => {
                setActiveQuickFilter((prev) => (prev === filter.key ? null : filter.key));
                window.history.replaceState({}, '', '/blog');
              }}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <p className="blog-hub-results" aria-live="polite">
          {normalizedQuery
            ? `${filteredPosts.length} resultado(s) para "${searchQuery.trim()}"`
            : activeQuickFilterData
              ? `${filteredPosts.length} artigo(s) em ${activeQuickFilterData.label}`
              : `${internalPosts.length} artigos publicados`}
        </p>

        {heroPost ? (
          <>
            <div className={`blog-hub-grid ${stackPosts.length ? '' : 'is-single'}`.trim()} id="blog-list">
              <article className="blog-hub-featured">
                <a className="blog-hub-featured-link" href={heroPost.href} {...getLinkAttributes(heroPost)}>
                  <div className="blog-hub-featured-media">
                    <img src={heroPost.image} alt={heroPost.title} loading="eager" decoding="async" />
                  </div>
                  <div className="blog-hub-featured-content">
                    <h3>{heroPost.title}</h3>
                    <p>{heroPost.excerpt}</p>
                    <div className="blog-hub-meta">
                      <span>
                        By {heroPost.author} • <Prism3dLogoMark className="blog-logo-mark--inline" />
                      </span>
                      <span>{heroPost.updatedAt}</span>
                      {heroPost.sourceLabel ? <span>Fonte: {heroPost.sourceLabel}</span> : null}
                    </div>
                    <span className="blog-list-cta">{heroPost.external ? 'Ler na fonte' : 'Ler artigo'}</span>
                  </div>
                </a>
              </article>

              {stackPosts.length ? (
                <div className="blog-hub-stack">
                  {stackPosts.map((post) => (
                    <article className="blog-hub-card" key={post.key}>
                      <a className="blog-hub-card-link" href={post.href} {...getLinkAttributes(post)}>
                        <div className="blog-hub-card-media">
                          <img src={post.image} alt={post.title} loading="lazy" decoding="async" />
                        </div>
                        <div className="blog-hub-card-content">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <div className="blog-hub-meta">
                            <span>By {post.author}</span>
                            <span>{post.updatedAt}</span>
                            {post.sourceLabel ? <span>Fonte: {post.sourceLabel}</span> : null}
                          </div>
                          <span className="blog-list-cta">{post.external ? 'Ler na fonte' : 'Ler artigo'}</span>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              ) : null}

              <aside className="blog-hub-aside" aria-label="Artigos em destaque">
                <p className="blog-hub-aside-title">Destaques</p>
                <ul className="blog-hub-aside-list">
                  {asidePosts.map((post) => (
                    <li key={post.key}>
                      <a className="blog-hub-aside-item" href={post.href} {...getLinkAttributes(post)}>
                        <div className="blog-hub-aside-copy">
                          <h4>{post.title}</h4>
                          <p>By {post.author} • {post.updatedAt}</p>
                          {post.sourceLabel ? <p>Fonte: {post.sourceLabel}</p> : null}
                        </div>
                        <img
                          className="blog-hub-aside-thumb"
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            {morePosts.length ? (
              <section className="blog-hub-more" aria-label="Mais artigos">
                {morePosts.map((post) => (
                  <article className="blog-hub-card" key={post.key}>
                    <a className="blog-hub-card-link" href={post.href} {...getLinkAttributes(post)}>
                      <div className="blog-hub-card-media">
                        <img src={post.image} alt={post.title} loading="lazy" decoding="async" />
                      </div>
                      <div className="blog-hub-card-content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="blog-hub-meta">
                          <span>By {post.author}</span>
                          <span>{post.updatedAt}</span>
                          {post.sourceLabel ? <span>Fonte: {post.sourceLabel}</span> : null}
                        </div>
                        <span className="blog-list-cta">{post.external ? 'Ler na fonte' : 'Ler artigo'}</span>
                      </div>
                    </a>
                  </article>
                ))}
              </section>
            ) : null}
          </>
        ) : (
          <div className="blog-hub-empty" id="blog-list">
            <h3>Nenhum artigo encontrado</h3>
            <p>Tente outro termo de pesquisa para localizar conteúdos relacionados.</p>
            <button
              type="button"
              className="blog-hub-empty-btn"
              onClick={() => {
                setSearchQuery('');
                setSearchOpen(true);
              }}
            >
              Limpar pesquisa
            </button>
          </div>
        )}

        {totalPages > 1 ? (
          <nav className="blog-pagination" aria-label="Paginação dos artigos">
            <span className="blog-page-summary">Página {currentPage} de {totalPages}</span>
            <a
              className={`blog-page-btn ${currentPage <= 1 ? 'is-disabled' : ''}`}
              href={pageHref(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage <= 1}
              rel="prev"
            >
              Anterior
            </a>

            <div className="blog-page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <a
                  key={page}
                  className={`blog-page-number ${page === currentPage ? 'is-active' : ''}`}
                  href={pageHref(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                  aria-label={`Ir para página ${page}`}
                >
                  {page}
                </a>
              ))}
            </div>

            <a
              className={`blog-page-btn ${currentPage >= totalPages ? 'is-disabled' : ''}`}
              href={pageHref(Math.min(totalPages, currentPage + 1))}
              aria-disabled={currentPage >= totalPages}
              rel="next"
            >
              Próxima
            </a>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
