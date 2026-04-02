import { Suspense, lazy, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Hero from './components/Hero';
import GearMastery from './components/GearMastery';
import CreativeApplications from './components/CreativeApplications';
import Features from './components/Features';
import Specs from './components/Specs';
import CallToAction from './components/CallToAction';
import SiteFooter from './components/SiteFooter';
import NavbarSalesAgent from './components/NavbarSalesAgent';
import { trackEvent } from './lib/analytics';
import { getBlogPostBySlug } from './components/blogPosts';
import { getBasePath, stripBasePath, toSitePath } from './lib/sitePath';

gsap.registerPlugin(ScrollTrigger);

type MobileNavLink = {
  href: string;
  label: string;
};

type PageMeta = {
  title: string;
  description: string;
};

type ProductSeoData = {
  name: string;
  description: string;
  imagePath: string;
  brand: string;
  sku: string;
};

const SITE_NAME = 'PRISM 3D';
const DEFAULT_IMAGE_PATH = '/robot-colored.webp';
const loadBlogSection = () => import('./components/BlogSection');
const loadBlogArticlePage = () => import('./components/BlogArticlePage');
const loadCatalogPage = () => import('./components/CatalogPage');
const loadProductFlashforgeAd5xPage = () => import('./components/ProductFlashforgeAd5xPage');
const loadProductBambuH2sPage = () => import('./components/ProductBambuH2sPage');
const loadProductBambuA1ComboPage = () => import('./components/ProductBambuA1ComboPage');
const loadProductCrealityEnder3V3SePage = () => import('./components/ProductCrealityEnder3V3SePage');
const loadProductCreatbotD1000HsPage = () => import('./components/ProductCreatbotD1000HsPage');
const loadProductAnycubicKobraS1ComboPage = () => import('./components/ProductAnycubicKobraS1ComboPage');
const loadProductExyzprintProPage = () => import('./components/ProductExyzprintProPage');
const loadPrivacyLgpdPage = () => import('./components/PrivacyLgpdPage');
const loadTermsCommercialPage = () => import('./components/TermsCommercialPage');
const loadUnderDevelopmentPage = () => import('./components/UnderDevelopmentPage');
const loadServicesPage = () => import('./components/ServicesPage');
const loadConsultoriaPage = () => import('./components/ConsultoriaPage');
const loadMidiasPage = () => import('./components/MidiasPage');
const BlogSection = lazy(loadBlogSection);
const BlogArticlePage = lazy(loadBlogArticlePage);
const CatalogPage = lazy(loadCatalogPage);
const ProductFlashforgeAd5xPage = lazy(loadProductFlashforgeAd5xPage);
const ProductBambuH2sPage = lazy(loadProductBambuH2sPage);
const ProductBambuA1ComboPage = lazy(loadProductBambuA1ComboPage);
const ProductCrealityEnder3V3SePage = lazy(loadProductCrealityEnder3V3SePage);
const ProductCreatbotD1000HsPage = lazy(loadProductCreatbotD1000HsPage);
const ProductAnycubicKobraS1ComboPage = lazy(loadProductAnycubicKobraS1ComboPage);
const ProductExyzprintProPage = lazy(loadProductExyzprintProPage);
const PrivacyLgpdPage = lazy(loadPrivacyLgpdPage);
const TermsCommercialPage = lazy(loadTermsCommercialPage);
const UnderDevelopmentPage = lazy(loadUnderDevelopmentPage);
const ServicesPage = lazy(loadServicesPage);
const ConsultoriaPage = lazy(loadConsultoriaPage);
const MidiasPage = lazy(loadMidiasPage);

const DEFAULT_META: PageMeta = {
  title: 'PRISM 3D | Bambu Lab P2S + AMS 2 Pro',
  description: 'Landing page da Bambu Lab P2S com AMS 2 Pro, especificações oficiais e contato comercial.',
};

const PRODUCT_SEO_MAP: Record<string, ProductSeoData> = {
  '/catalogo/produtos/flashforge-ad5x': {
    name: 'Flashforge AD5X',
    description: 'Impressora 3D CoreXY com operação multicolor para prototipagem visual e aplicação comercial.',
    imagePath: '/flashforge-ad5x-multicolor.webp',
    brand: 'Flashforge',
    sku: 'flashforge-ad5x',
  },
  '/catalogo/produtos/bambu-lab-h2s-ams-combo': {
    name: 'Bambu Lab P2S + AMS 2 Pro',
    description: 'Impressora 3D de alta velocidade com AMS 2 Pro para fluxo multicolor e produção profissional.',
    imagePath: '/bambu-lab-h2s-ams2pro-cinza.webp',
    brand: 'Bambu Lab',
    sku: 'bambu-lab-p2s-ams2pro',
  },
  '/catalogo/produtos/bambu-lab-a1-combo-ams-lite': {
    name: 'Bambu Lab A1 Combo (AMS Lite)',
    description: 'Impressora 3D com calibração automática e fluxo multicolor para uso comercial diário.',
    imagePath: '/bambu-lab-a1-ams-lite-combo.webp',
    brand: 'Bambu Lab',
    sku: 'bambu-lab-a1-combo-ams-lite',
  },
  '/catalogo/produtos/creality-ender-3-v3-se': {
    name: 'Creality Ender-3 V3 SE',
    description: 'Impressora FDM de setup rápido com foco em produtividade e simplicidade operacional.',
    imagePath: '/creality-ender-3-v3-se.webp',
    brand: 'Creality',
    sku: 'creality-ender-3-v3-se',
  },
  '/catalogo/produtos/creatbot-d1000-hs': {
    name: 'CreatBot D1000 HS',
    description: 'Plataforma industrial de grande formato para produção de peças técnicas de grande porte.',
    imagePath: '/creatbot-d1000-hs.webp',
    brand: 'CreatBot',
    sku: 'creatbot-d1000-hs',
  },
  '/catalogo/produtos/anycubic-kobra-s1-combo': {
    name: 'Anycubic Kobra S1 Combo',
    description: 'Impressora CoreXY fechada para operação acelerada com suporte a fluxo multicolor.',
    imagePath: '/anycubic-kobra-s1-combo.webp',
    brand: 'Anycubic',
    sku: 'anycubic-kobra-s1-combo',
  },
  '/catalogo/produtos/exyzprint-pro': {
    name: 'EXYZprint PRO',
    description: 'Plataforma para prototipagem e produção de baixo volume com foco em acabamento e consistência.',
    imagePath: '/ezy.webp',
    brand: 'XYZprinting',
    sku: 'exyzprint-pro',
  },
};

const PRODUCT_META_MAP: Record<string, PageMeta> = {
  '/catalogo/produtos/flashforge-ad5x': {
    title: 'Flashforge AD5X | PRISM 3D',
    description: 'Flashforge AD5X com detalhes técnicos, especificações e downloads oficiais.',
  },
  '/catalogo/produtos/bambu-lab-h2s-ams-combo': {
    title: 'Bambu Lab P2S + AMS 2 Pro | PRISM 3D',
    description: 'Bambu Lab P2S com AMS 2 Pro: specs oficiais, FAQ, showcase e recursos técnicos.',
  },
  '/catalogo/produtos/bambu-lab-a1-combo-ams-lite': {
    title: 'Bambu Lab A1 Combo (AMS Lite) | PRISM 3D',
    description: 'Bambu Lab A1 Combo com AMS Lite, página de produto com ficha e manual.',
  },
  '/catalogo/produtos/creality-ender-3-v3-se': {
    title: 'Creality Ender-3 V3 SE | PRISM 3D',
    description: 'Creality Ender-3 V3 SE com especificações técnicas, manual e downloads.',
  },
  '/catalogo/produtos/creatbot-d1000-hs': {
    title: 'CreatBot D1000 HS | PRISM 3D',
    description: 'CreatBot D1000 HS com foco industrial, specs, manual e centro de downloads.',
  },
  '/catalogo/produtos/anycubic-kobra-s1-combo': {
    title: 'Anycubic Kobra S1 Combo | PRISM 3D',
    description: 'Anycubic Kobra S1 Combo com dados técnicos, manual e guia operacional.',
  },
  '/catalogo/produtos/exyzprint-pro': {
    title: 'EXYZprint PRO | PRISM 3D',
    description: 'EXYZprint PRO para prototipagem e baixo volume com downloads técnicos.',
  },
};

function normalizePath(pathname: string): string {
  return pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

function getBlogArchivePage(search: string): number {
  const pageParam = new URLSearchParams(search).get('page');
  if (!pageParam) return 1;
  const page = Number(pageParam);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function getPageMeta(pathname: string, blogArchivePage: number): PageMeta {
  const cleanPath = normalizePath(pathname);

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = getBlogPostBySlug(slug);
    if (post) {
      return {
        title: `${post.title} | Blog PRISM 3D`,
        description: post.excerpt,
      };
    }
  }

  if (cleanPath === '/blog') {
    if (blogArchivePage > 1) {
      return {
        title: `Blog Técnico - Página ${blogArchivePage} | PRISM 3D`,
        description: `Página ${blogArchivePage} da biblioteca de artigos técnicos PRISM 3D.`,
      };
    }
    return {
      title: 'Blog Técnico | PRISM 3D',
      description: 'Biblioteca de artigos técnicos PRISM 3D com paginação e leitura por tema.',
    };
  }

  if (cleanPath === '/catalogo') {
    return {
      title: 'Catálogo | PRISM 3D',
      description: 'Catálogo de impressoras 3D e soluções com filtro por categoria.',
    };
  }

  if (cleanPath === '/privacidade-lgpd') {
    return {
      title: 'Privacidade e LGPD | PRISM 3D',
      description: 'Política de privacidade e diretrizes de tratamento de dados da PRISM 3D.',
    };
  }

  if (cleanPath === '/termos-comerciais') {
    return {
      title: 'Termos comerciais | PRISM 3D',
      description: 'Termos comerciais para propostas, fornecimento e suporte PRISM 3D.',
    };
  }

  if (cleanPath === '/servicos') {
    return {
      title: 'Serviços | PRISM 3D',
      description: 'Serviços PRISM 3D para prototipagem, lote piloto e produção sob demanda com controle técnico.',
    };
  }

  if (cleanPath === '/cursos') {
    return {
      title: 'Cursos | PRISM 3D',
      description: 'Página de cursos PRISM 3D em desenvolvimento.',
    };
  }

  if (cleanPath === '/midias') {
    return {
      title: 'Mídias | PRISM 3D',
      description: 'Vídeos curtos por marca para apoio comercial e demonstração de impressoras 3D.',
    };
  }

  if (cleanPath === '/consultoria') {
    return {
      title: 'Consultoria | PRISM 3D',
      description: 'Consultoria PRISM 3D para estruturar processo, custo e qualidade em operações de impressão 3D.',
    };
  }

  if (PRODUCT_META_MAP[cleanPath]) {
    return PRODUCT_META_MAP[cleanPath];
  }

  return DEFAULT_META;
}

function getPageImagePath(pathname: string): string {
  const cleanPath = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = getBlogPostBySlug(slug);
    if (post) {
      return post.image;
    }
  }

  if (PRODUCT_SEO_MAP[cleanPath]) {
    return PRODUCT_SEO_MAP[cleanPath].imagePath;
  }

  if (cleanPath === '/catalogo') {
    return '/flashforge-ad5x-multicolor.webp';
  }

  if (cleanPath === '/blog') {
    return '/robot-raw.webp';
  }

  if (cleanPath === '/privacidade-lgpd' || cleanPath === '/termos-comerciais') {
    return '/robot-colored.webp';
  }

  if (cleanPath === '/cursos') {
    return '/robot-colored.webp';
  }

  if (cleanPath === '/midias') {
    return '/robot-colored.webp';
  }

  if (cleanPath === '/servicos' || cleanPath === '/consultoria') {
    return cleanPath === '/consultoria' ? '/consultoria.png' : '/linha-de-producao.png';
  }

  return DEFAULT_IMAGE_PATH;
}

function getStructuredData(
  pathname: string,
  blogArchivePage: number,
  pageMeta: PageMeta,
  siteUrl: string,
  canonicalUrl: string,
  imageUrl: string
) {
  const cleanPath = normalizePath(pathname);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      name: SITE_NAME,
      url: siteUrl,
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageMeta.title,
      description: pageMeta.description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${siteUrl}#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    },
  ];

  const breadcrumbItems: Array<{ name: string; url: string }> = [{ name: 'Home', url: siteUrl }];

  if (cleanPath === '/catalogo') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: 'Catálogo de Impressoras 3D',
      description: pageMeta.description,
      inLanguage: 'pt-BR',
    });
    breadcrumbItems.push({ name: 'Catálogo', url: canonicalUrl });
  } else if (cleanPath === '/blog') {
    const blogName = blogArchivePage > 1
      ? `Blog Técnico PRISM 3D - Página ${blogArchivePage}`
      : 'Blog Técnico PRISM 3D';
    graph.push({
      '@type': 'Blog',
      '@id': `${canonicalUrl}#blog`,
      url: canonicalUrl,
      name: blogName,
      description: pageMeta.description,
      inLanguage: 'pt-BR',
    });
    breadcrumbItems.push({ name: 'Blog', url: canonicalUrl });
    if (blogArchivePage > 1) {
      breadcrumbItems.push({ name: `Página ${blogArchivePage}`, url: canonicalUrl });
    }
  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const post = getBlogPostBySlug(slug);
    if (post) {
      graph.push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#post`,
        headline: post.title,
        description: post.excerpt,
        image: [`${siteUrl}${post.image}`],
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: { '@id': `${siteUrl}#organization` },
        dateModified: '2026-03-28',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
        },
        inLanguage: 'pt-BR',
      });
      breadcrumbItems.push({ name: 'Blog', url: `${siteUrl}/blog` });
      breadcrumbItems.push({ name: post.title, url: canonicalUrl });
    }
  } else if (cleanPath === '/privacidade-lgpd') {
    breadcrumbItems.push({ name: 'Privacidade e LGPD', url: canonicalUrl });
  } else if (cleanPath === '/termos-comerciais') {
    breadcrumbItems.push({ name: 'Termos comerciais', url: canonicalUrl });
  } else if (cleanPath === '/servicos') {
    breadcrumbItems.push({ name: 'Serviços', url: canonicalUrl });
  } else if (cleanPath === '/cursos') {
    breadcrumbItems.push({ name: 'Cursos', url: canonicalUrl });
  } else if (cleanPath === '/midias') {
    breadcrumbItems.push({ name: 'Mídias', url: canonicalUrl });
  } else if (cleanPath === '/consultoria') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: 'Consultoria PRISM 3D',
      description: pageMeta.description,
      serviceType: 'Consultoria em operação de impressão 3D',
      provider: { '@id': `${siteUrl}#organization` },
      areaServed: 'Brasil',
      url: canonicalUrl,
      image: [`${siteUrl}/consultoria.png`],
    });
    breadcrumbItems.push({ name: 'Consultoria', url: canonicalUrl });
  } else if (PRODUCT_SEO_MAP[cleanPath]) {
    const product = PRODUCT_SEO_MAP[cleanPath];
    graph.push({
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: product.name,
      description: product.description,
      sku: product.sku,
      category: 'Impressora 3D',
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      image: [`${siteUrl}${product.imagePath}`],
      url: canonicalUrl,
      isRelatedTo: {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/catalogo#collection`,
      },
    });
    breadcrumbItems.push({ name: 'Catálogo', url: `${siteUrl}/catalogo` });
    breadcrumbItems.push({ name: product.name, url: canonicalUrl });
  }

  if (breadcrumbItems.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function App() {
  const pathname = stripBasePath(window.location.pathname).toLowerCase();
  const search = window.location.search;
  const normalizedPath = useMemo(() => normalizePath(pathname), [pathname]);
  const blogArchivePage = useMemo(() => getBlogArchivePage(search), [search]);
  const pageMeta = useMemo(() => getPageMeta(pathname, blogArchivePage), [pathname, blogArchivePage]);
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
  const siteUrl = (configuredSiteUrl || `${window.location.origin}${getBasePath()}`).replace(/\/$/, '');
  const canonicalUrl = useMemo(
    () => `${siteUrl}${normalizedPath === '/' ? '' : normalizedPath}${normalizedPath === '/blog' && blogArchivePage > 1 ? `?page=${blogArchivePage}` : ''}`,
    [blogArchivePage, normalizedPath, siteUrl]
  );
  const seoImagePath = useMemo(() => getPageImagePath(pathname), [pathname]);
  const seoImageUrl = useMemo(() => `${siteUrl}${seoImagePath}`, [seoImagePath, siteUrl]);
  const structuredData = useMemo(
    () => getStructuredData(pathname, blogArchivePage, pageMeta, siteUrl, canonicalUrl, seoImageUrl),
    [pathname, blogArchivePage, pageMeta, siteUrl, canonicalUrl, seoImageUrl]
  );
  const isBlogIndexPage = pathname === '/blog' || pathname === '/blog/';
  const isBlogArticlePage = pathname.startsWith('/blog/') && !isBlogIndexPage;
  const blogSlug = isBlogArticlePage
    ? pathname.replace('/blog/', '').replace(/\/$/, '')
    : '';
  const isBlogPage = isBlogIndexPage || isBlogArticlePage;
  const isCatalogProductPage = pathname.startsWith('/catalogo/produtos/');
  const isCatalogPage = pathname === '/catalogo' || pathname === '/catalogo/';
  const isServicesPage = pathname === '/servicos' || pathname === '/servicos/';
  const isCoursesPage = pathname === '/cursos' || pathname === '/cursos/';
  const isMidiasPage = pathname === '/midias' || pathname === '/midias/';
  const isConsultoriaPage = pathname === '/consultoria' || pathname === '/consultoria/';
  const isBusinessPage = isServicesPage || isConsultoriaPage || isCoursesPage || isMidiasPage;
  const isPrivacyPage = pathname === '/privacidade-lgpd' || pathname === '/privacidade-lgpd/';
  const isTermsPage = pathname === '/termos-comerciais' || pathname === '/termos-comerciais/';
  const isLegalPage = isPrivacyPage || isTermsPage;
  const isFlashforgeAd5xPage = pathname === '/catalogo/produtos/flashforge-ad5x' || pathname === '/catalogo/produtos/flashforge-ad5x/';
  const isBambuH2sPage = pathname === '/catalogo/produtos/bambu-lab-h2s-ams-combo' || pathname === '/catalogo/produtos/bambu-lab-h2s-ams-combo/';
  const isBambuA1ComboPage = pathname === '/catalogo/produtos/bambu-lab-a1-combo-ams-lite' || pathname === '/catalogo/produtos/bambu-lab-a1-combo-ams-lite/';
  const isCrealityEnder3V3SePage = pathname === '/catalogo/produtos/creality-ender-3-v3-se' || pathname === '/catalogo/produtos/creality-ender-3-v3-se/';
  const isCreatbotD1000HsPage = pathname === '/catalogo/produtos/creatbot-d1000-hs' || pathname === '/catalogo/produtos/creatbot-d1000-hs/';
  const isAnycubicKobraS1ComboPage = pathname === '/catalogo/produtos/anycubic-kobra-s1-combo' || pathname === '/catalogo/produtos/anycubic-kobra-s1-combo/';
  const isExyzprintProPage = pathname === '/catalogo/produtos/exyzprint-pro' || pathname === '/catalogo/produtos/exyzprint-pro/';
  const isStaticNavbarPage = isBlogPage || isCatalogPage || isCatalogProductPage || isLegalPage || isBusinessPage;
  const pageType = isCatalogProductPage
    ? 'product'
    : isCatalogPage
      ? 'catalog'
      : isBlogPage
        ? 'blog'
        : isBusinessPage
          ? 'business'
        : isLegalPage
          ? 'legal'
          : 'landing';
  const [showNavbar, setShowNavbar] = useState(() => isStaticNavbarPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationMenuOpen, setPresentationMenuOpen] = useState(false);
  const [salesAgentActive, setSalesAgentActive] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => window.matchMedia('(max-width: 768px)').matches
  );
  const lastScrollYRef = useRef(0);
  const isScrollingUpRef = useRef(false);
  const isTopHoverRef = useRef(false);
  const showNavbarRef = useRef(false);
  const presentationMenuRef = useRef<HTMLLIElement>(null);

  const landingMobileLinks: MobileNavLink[] = [
    { href: '#hero', label: 'Fabricação' },
    { href: '#engrenagens', label: 'Engrenagens' },
    { href: '#aplicacoes', label: 'Aplicações' },
    { href: '#features', label: 'Tecnologia' },
    { href: '#specs', label: 'Specs' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/consultoria', label: 'Consultoria' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/midias', label: 'Mídias' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/blog', label: 'Blog' },
  ];

  const blogMobileLinks: MobileNavLink[] = isBlogArticlePage
    ? [
        { href: '/blog', label: 'Artigos' },
        { href: '#blog', label: 'Topo do artigo' },
        { href: '/catalogo', label: 'Catálogo' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '#blog-list', label: 'Artigos' },
        { href: '/catalogo', label: 'Catálogo' },
      ];

  const catalogMobileLinks: MobileNavLink[] = [
    { href: '/', label: 'Home' },
    { href: '#catalogo-produtos', label: 'Produtos' },
    { href: '/blog', label: 'Blog' },
  ];

  const catalogProductMobileLinks: MobileNavLink[] = [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '#produto-detalhes', label: 'Detalhes' },
    { href: '#produto-downloads', label: 'Downloads' },
    { href: '/blog', label: 'Blog' },
  ];

  const legalMobileLinks: MobileNavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/blog', label: 'Blog' },
    { href: '/privacidade-lgpd', label: 'Privacidade e LGPD' },
    { href: '/termos-comerciais', label: 'Termos comerciais' },
  ];

  const businessMobileLinks: MobileNavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/consultoria', label: 'Consultoria' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/midias', label: 'Mídias' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/blog', label: 'Blog' },
  ];

  const mobileLinks = isBlogPage
    ? blogMobileLinks
    : isCatalogProductPage
      ? catalogProductMobileLinks
    : isBusinessPage
      ? businessMobileLinks
    : isLegalPage
      ? legalMobileLinks
    : isCatalogPage
      ? catalogMobileLinks
      : landingMobileLinks;

  const openMobileMenu = () => {
    setPresentationMenuOpen(false);
    setMobileMenuOpen(true);
  };
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navigateWithTracking = (target: string, area: string, cta: string) => {
    trackEvent('cta_click', {
      area,
      cta,
      destination: target,
      page_path: normalizedPath,
      page_type: pageType,
    });
    window.location.href = toSitePath(target);
  };

  useEffect(() => {
    const rewriteAnchors = () => {
      const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
      anchors.forEach((anchor) => {
        const rawHref = anchor.getAttribute('href');
        if (!rawHref || rawHref.startsWith('//')) return;
        const nextHref = toSitePath(rawHref);
        if (nextHref !== rawHref) {
          anchor.setAttribute('href', nextHref);
        }
      });
    };

    rewriteAnchors();
    const observer = new MutationObserver(() => {
      rewriteAnchors();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);
  const pageLoadingFallback = (
    <section className="catalog">
      <div className="catalog-container">
        <header className="catalog-header">
          <span className="catalog-badge">CARREGANDO</span>
          <h1>Preparando conteúdo.</h1>
          <p>Estamos carregando esta página para você.</p>
        </header>
      </div>
    </section>
  );

  useEffect(() => {
    if (isBlogPage || isCatalogPage || isCatalogProductPage || isLegalPage || isBusinessPage) return;

    const preloadCatalogRoutes = () => {
      void loadCatalogPage();
      void loadBlogSection();
      void loadBlogArticlePage();
      void loadProductFlashforgeAd5xPage();
      void loadProductBambuH2sPage();
      void loadProductBambuA1ComboPage();
      void loadProductCrealityEnder3V3SePage();
      void loadProductCreatbotD1000HsPage();
      void loadProductAnycubicKobraS1ComboPage();
      void loadProductExyzprintProPage();
      void loadPrivacyLgpdPage();
      void loadTermsCommercialPage();
      void loadUnderDevelopmentPage();
      void loadServicesPage();
      void loadConsultoriaPage();
      void loadMidiasPage();
    };

    let idleId: number | null = null;
    let timeoutId: number | null = null;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(preloadCatalogRoutes, { timeout: 2200 });
    } else {
      timeoutId = window.setTimeout(preloadCatalogRoutes, 1200);
    }

    return () => {
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isBlogPage, isCatalogPage, isCatalogProductPage, isLegalPage, isBusinessPage]);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    if (isStaticNavbarPage) return;

    const hash = window.location.hash.toLowerCase();
    if (hash && hash !== '#hero') return;

    window.scrollTo(0, 0);
  }, [isStaticNavbarPage, pathname]);

  useEffect(() => {
    trackEvent('page_view', {
      page_path: normalizedPath,
      page_title: pageMeta.title,
      page_type: pageType,
    });
  }, [normalizedPath, pageMeta.title, pageType]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      const label = link.textContent?.trim() ?? '';

      if (link.matches('.product-download-card a')) {
        trackEvent('product_download_click', {
          page_path: normalizedPath,
          page_type: pageType,
          destination: href,
          label,
        });
        return;
      }

      if (link.matches('.product-cta--primary')) {
        trackEvent('cta_click', {
          area: 'product_hero',
          cta: 'baixar_ficha_manual',
          page_path: normalizedPath,
          page_type: pageType,
          destination: href,
        });
        return;
      }

      if (link.matches('.product-cta--secondary')) {
        trackEvent('cta_click', {
          area: 'product_hero',
          cta: 'solicitar_orcamento',
          page_path: normalizedPath,
          page_type: pageType,
          destination: href,
        });
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [normalizedPath, pageType]);

  useEffect(() => {
    const upsertMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content: string
    ) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    document.title = pageMeta.title;

    upsertMeta('meta[name="description"]', 'name', 'description', pageMeta.description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', pageMeta.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', pageMeta.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', seoImageUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageMeta.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageMeta.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seoImageUrl);
  }, [canonicalUrl, pageMeta.description, pageMeta.title, seoImageUrl]);

  useEffect(() => {
    let structuredDataTag = document.querySelector<HTMLScriptElement>('script[data-seo="structured-data"]');
    if (!structuredDataTag) {
      structuredDataTag = document.createElement('script');
      structuredDataTag.setAttribute('type', 'application/ld+json');
      structuredDataTag.setAttribute('data-seo', 'structured-data');
      document.head.appendChild(structuredDataTag);
    }
    structuredDataTag.textContent = JSON.stringify(structuredData);
  }, [structuredData]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
      if (!event.matches) setMobileMenuOpen(false);
    };

    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', mobileMenuOpen);

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!presentationMenuOpen) return;

    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (presentationMenuRef.current?.contains(target)) return;
      setPresentationMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPresentationMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [presentationMenuOpen]);

  useEffect(() => {
    if (isStaticNavbarPage) {
      showNavbarRef.current = true;
      return;
    }

    lastScrollYRef.current = window.scrollY || 0;

    const updateNavbarVisibility = () => {
      const currentY = window.scrollY || 0;
      const awayFromTop = currentY > 8;
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection?.offsetHeight ?? window.innerHeight;
      const inMobileHeroZone = currentY <= Math.max(heroHeight - 96, 0);
      const nextVisible = isMobileViewport
        ? (inMobileHeroZone || (isScrollingUpRef.current && awayFromTop))
        : ((isScrollingUpRef.current && awayFromTop) || isTopHoverRef.current || presentationMenuOpen || salesAgentActive);
      if (nextVisible === showNavbarRef.current) return;
      showNavbarRef.current = nextVisible;
      setShowNavbar(nextVisible);
    };

    const onScroll = () => {
      const currentY = window.scrollY || 0;
      isScrollingUpRef.current = currentY < lastScrollYRef.current;
      lastScrollYRef.current = currentY;
      updateNavbarVisibility();
    };

    const onMouseMove = (event: MouseEvent) => {
      const hoverInTopZone = event.clientY <= 72;
      if (hoverInTopZone === isTopHoverRef.current) return;
      isTopHoverRef.current = hoverInTopZone;
      updateNavbarVisibility();
    };

    const onMouseLeave = () => {
      if (!isTopHoverRef.current) return;
      isTopHoverRef.current = false;
      updateNavbarVisibility();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (!isMobileViewport) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseleave', onMouseLeave);
    }
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (!isMobileViewport) {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [isStaticNavbarPage, isMobileViewport, presentationMenuOpen, salesAgentActive]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealTweens: gsap.core.Tween[] = [];
    const parallaxTweens: gsap.core.Tween[] = [];
    const cardTweens: gsap.core.Tween[] = [];
    const delayedPassIds: number[] = [];
    const revealSeen = new WeakSet<HTMLElement>();
    const parallaxSeen = new WeakSet<HTMLElement>();
    const cardSeen = new WeakSet<HTMLElement>();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const revealOffset = isMobile ? 12 : 18;
    const parallaxRange = 8;

    const runAnimationPass = () => {
      const revealSections = gsap.utils.toArray<HTMLElement>('.section-reveal');
      revealSections.forEach((section, index) => {
        if (revealSeen.has(section)) return;
        revealSeen.add(section);

        const tween = gsap.fromTo(
          section,
          {
            autoAlpha: 0,
            y: revealOffset,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            delay: index * 0.015,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: 'top 92%',
              once: true,
            },
          }
        );
        revealTweens.push(tween);
      });

      if (!isMobile) {
        const parallaxTargets = gsap.utils.toArray<HTMLElement>('.section-parallax');
        parallaxTargets.forEach((target) => {
          if (parallaxSeen.has(target)) return;
          parallaxSeen.add(target);

          const tween = gsap.fromTo(
            target,
            { y: -parallaxRange },
            {
              y: parallaxRange,
              ease: 'none',
              scrollTrigger: {
                trigger: target,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.45,
              },
            }
          );
          parallaxTweens.push(tween);
        });
      }

      const cardRevealSelectors = isCatalogPage ? ['.catalog-card'] : [];

      cardRevealSelectors.forEach((selector) => {
        const cards = gsap.utils.toArray<HTMLElement>(selector);
        if (!cards.length) return;

        const triggerElement = (cards[0].parentElement ?? cards[0]) as HTMLElement;
        if (cardSeen.has(triggerElement)) return;
        cardSeen.add(triggerElement);

        const tween = gsap.from(cards, {
          autoAlpha: 0,
          y: isMobile ? 10 : 16,
          duration: 0.56,
          immediateRender: false,
          stagger: isMobile ? 0.05 : 0.07,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top 86%',
            once: true,
          },
        });

        cardTweens.push(tween);
      });

      ScrollTrigger.refresh();
    };

    runAnimationPass();
    delayedPassIds.push(window.setTimeout(runAnimationPass, 140));
    delayedPassIds.push(window.setTimeout(runAnimationPass, 420));

    return () => {
      delayedPassIds.forEach((id) => window.clearTimeout(id));

      revealTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });

      parallaxTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });

      cardTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [isBlogPage, isCatalogPage, isCatalogProductPage, pathname]);

  const mobileMenu = (
    <>
      <button
        type="button"
        className={`navbar-mobile-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
        tabIndex={mobileMenuOpen ? 0 : -1}
      />
      <aside
        id="mobile-nav-panel"
        className={`navbar-mobile-panel ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="navbar-mobile-header">
          <span className="navbar-mobile-title">Navegação</span>
          <button
            type="button"
            className="navbar-mobile-close"
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
          >
            Fechar
          </button>
        </div>

        <nav className="navbar-mobile-links" aria-label="Navegação mobile">
          {mobileLinks.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="navbar-mobile-cta"
          href={isStaticNavbarPage ? '/' : '#specs'}
          onClick={closeMobileMenu}
        >
          {isStaticNavbarPage ? 'Voltar para a página inicial' : 'Comprar'}
        </a>
      </aside>
    </>
  );

  if (isBlogPage) {
    return (
      <>
        
        <nav className="navbar navbar--visible">
          <a className="navbar-logo-link" href="/">
            <div className="navbar-logo">prism<span>3d</span></div>
          </a>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Artigos</a></li>
            <li><a href="/catalogo">Cat&aacute;logo</a></li>
          </ul>
          <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('/', 'blog_navbar', 'voltar'); }}>
            Voltar
          </button>
          <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu"
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {mobileMenu}

        <main id="main-content" className="blog-page">
          <Suspense fallback={pageLoadingFallback}>
            {isBlogArticlePage ? <BlogArticlePage slug={blogSlug} /> : <BlogSection />}
          </Suspense>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (isCatalogPage) {
    return (
      <>
        
        <nav className="navbar navbar--visible">
          <a className="navbar-logo-link" href="/">
            <div className="navbar-logo">prism<span>3d</span></div>
          </a>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="#catalogo-produtos">Produtos</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
          <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('/', 'catalog_navbar', 'voltar'); }}>
            Voltar
          </button>
          <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu"
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {mobileMenu}

        <main id="main-content" className="catalog-page">
          <Suspense fallback={pageLoadingFallback}>
            <CatalogPage />
          </Suspense>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (isCatalogProductPage) {
    return (
      <>
        
        <nav className="navbar navbar--visible">
          <a className="navbar-logo-link" href="/">
            <div className="navbar-logo">prism<span>3d</span></div>
          </a>
          <ul className="navbar-links">
            <li><a href="/catalogo">Cat&aacute;logo</a></li>
            <li><a href="#produto-detalhes">Detalhes</a></li>
            <li><a href="#produto-downloads">Downloads</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
          <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('/catalogo', 'product_navbar', 'voltar'); }}>
            Voltar
          </button>
          <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu"
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {mobileMenu}

        <main id="main-content" className="product-page">
          <Suspense fallback={pageLoadingFallback}>
            {isFlashforgeAd5xPage ? (
              <ProductFlashforgeAd5xPage />
            ) : isBambuH2sPage ? (
              <ProductBambuH2sPage />
            ) : isBambuA1ComboPage ? (
              <ProductBambuA1ComboPage />
            ) : isCrealityEnder3V3SePage ? (
              <ProductCrealityEnder3V3SePage />
            ) : isCreatbotD1000HsPage ? (
              <ProductCreatbotD1000HsPage />
            ) : isAnycubicKobraS1ComboPage ? (
              <ProductAnycubicKobraS1ComboPage />
            ) : isExyzprintProPage ? (
              <ProductExyzprintProPage />
            ) : (
              <section className="catalog section-flow section-reveal">
                <div className="catalog-container">
                  <header className="catalog-header">
                    <span className="catalog-badge">EM CONSTRUÇÃO</span>
                    <h1>Página de produto em preparo.</h1>
                    <p>Volte ao catálogo para selecionar outro item enquanto finalizamos esta página.</p>
                  </header>
                  <footer className="catalog-footer">
                    <a className="catalog-cta catalog-cta--primary" href="/catalogo">Voltar ao Catálogo</a>
                  </footer>
                </div>
              </section>
            )}
          </Suspense>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (isBusinessPage) {
    return (
      <>
        <nav className="navbar navbar--visible">
          <a className="navbar-logo-link" href="/">
            <div className="navbar-logo">prism<span>3d</span></div>
          </a>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/servicos">Serviços</a></li>
            <li><a href="/consultoria">Consultoria</a></li>
            <li><a href="/cursos">Cursos</a></li>
            <li><a href="/midias">Mídias</a></li>
            <li><a href="/catalogo">Catálogo</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
          <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('/', 'business_navbar', 'voltar'); }}>
            Voltar
          </button>
          <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu"
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {mobileMenu}

        <main id="main-content" className={isBusinessPage ? 'consulting-page' : 'legal-page'}>
          <Suspense fallback={pageLoadingFallback}>
            {isServicesPage ? (
              <ServicesPage />
            ) : isCoursesPage ? (
              <UnderDevelopmentPage
                badge="CURSOS PRISM 3D"
                title="Cursos em desenvolvimento"
                description="Estamos estruturando a trilha de cursos técnicos e comerciais para impressão 3D."
                highlights={[
                  'Fundamentos de operação e materiais',
                  'Produção com padrão e controle de qualidade',
                  'Aplicação comercial e precificação técnica',
                ]}
              />
            ) : isMidiasPage ? (
              <MidiasPage />
            ) : (
              <ConsultoriaPage />
            )}
          </Suspense>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (isLegalPage) {
    return (
      <>
        <nav className="navbar navbar--visible">
          <a className="navbar-logo-link" href="/">
            <div className="navbar-logo">prism<span>3d</span></div>
          </a>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/catalogo">Catálogo</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/privacidade-lgpd">Privacidade</a></li>
            <li><a href="/termos-comerciais">Termos</a></li>
          </ul>
          <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('/', 'legal_navbar', 'voltar'); }}>
            Voltar
          </button>
          <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
          <button
            type="button"
            className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={openMobileMenu}
            aria-label="Abrir menu"
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {mobileMenu}

        <main id="main-content" className="legal-page">
          <Suspense fallback={pageLoadingFallback}>
            {isPrivacyPage ? <PrivacyLgpdPage /> : <TermsCommercialPage />}
          </Suspense>
        </main>

        <SiteFooter />
      </>
    );
  }

  return (
    <>
      
      <nav className={`navbar ${(showNavbar || mobileMenuOpen) ? 'navbar--visible' : 'navbar--hidden'}`}>
        <a className="navbar-logo-link" href="#hero" onClick={closeMobileMenu} aria-label="Ir para o inicio">
          <div className="navbar-logo">prism<span>3d</span></div>
        </a>
        <ul className="navbar-links">
          <li
            className={`navbar-dropdown ${presentationMenuOpen ? 'is-open' : ''}`}
            ref={presentationMenuRef}
          >
            <button
              type="button"
              className="navbar-dropdown-toggle"
              aria-haspopup="menu"
              aria-expanded={presentationMenuOpen}
              onClick={() => setPresentationMenuOpen((prev) => !prev)}
            >
              Apresentação
            </button>
            <div className="navbar-dropdown-menu" role="menu" aria-label="Menu de apresentação">
              <a href="#hero" role="menuitem" onClick={() => setPresentationMenuOpen(false)}>Fabrica&ccedil;&atilde;o</a>
              <a href="#engrenagens" role="menuitem" onClick={() => setPresentationMenuOpen(false)}>Engrenagens</a>
              <a href="#aplicacoes" role="menuitem" onClick={() => setPresentationMenuOpen(false)}>Aplica&ccedil;&otilde;es</a>
              <a href="#features" role="menuitem" onClick={() => setPresentationMenuOpen(false)}>Tecnologia</a>
              <a href="#specs" role="menuitem" onClick={() => setPresentationMenuOpen(false)}>Specs</a>
            </div>
          </li>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/consultoria">Consultoria</a></li>
          <li><a href="/cursos">Cursos</a></li>
          <li><a href="/midias">Mídias</a></li>
          <li><a href="/catalogo">Cat&aacute;logo</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
        <button className="navbar-cta" type="button" onClick={() => { navigateWithTracking('#specs', 'landing_navbar', 'comprar'); }}>
          Comprar
        </button>
        <NavbarSalesAgent onActiveChange={setSalesAgentActive} />
        <button
          type="button"
          className={`navbar-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={openMobileMenu}
          aria-label="Abrir menu"
          aria-controls="mobile-nav-panel"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {mobileMenu}

      <main id="main-content" className="landing-page">
        <Hero />
        <GearMastery />
        <CreativeApplications />
        <Features />
        <Specs />
        <CallToAction />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;








