export type BlogPostMeta = {
  id: 'tema-1' | 'tema-2' | 'tema-3' | 'tema-4' | 'tema-5';
  slug: string;
  title: string;
  excerpt: string;
  highlights?: string[];
  image: string;
  updatedAt: string;
  author: string;
};

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    id: 'tema-1',
    slug: 'mercado-produtos-fabricados-com-impressao-3d-no-brasil',
    title: 'Mercado de produtos fabricados com impressão 3D no Brasil',
    excerpt:
      'Entenda o momento do mercado, onde estão as oportunidades e como transformar impressão 3D em receita recorrente. O artigo mostra segmentos que já compram peças impressas e os critérios que mais pesam na decisão comercial.',
    highlights: [
      'Resumo com números de crescimento global e sinais de demanda industrial no Brasil.',
      'Mapa de oportunidades: peças funcionais, personalização premium e aplicações técnicas.',
      'Estratégias comerciais para vender por aplicação e aumentar margem com recorrência.',
      'Critérios objetivos para posicionar a oferta e acelerar conversão comercial.',
    ],
    image: '/Mercado%20de%20produtos%20fabricados%20com%20impress%C3%A3o%203D%20no%20Brasil.png',
    updatedAt: 'Atualizado em 28 de março de 2026',
    author: 'João Neto',
  },
  {
    id: 'tema-2',
    slug: 'filamentos-tipos-acabamento-e-como-escolher-para-cada-aplicacao',
    title: 'Filamentos: tipos, acabamento e como escolher para cada aplicação',
    excerpt:
      'Material certo, acabamento correto e rotina de secagem para elevar qualidade, previsibilidade e margem. O conteúdo compara decisões por aplicação e mostra como evitar retrabalho por escolha inadequada de filamento.',
    image: '/blog-filamentos-acabamento-aplicacao.png',
    updatedAt: 'Atualizado em 28 de março de 2026',
    author: 'João Neto',
  },
  {
    id: 'tema-3',
    slug: 'impressoras-3d-qual-tecnologia-escolher-para-cada-tipo-de-produto',
    title: 'Impressoras 3D: qual tecnologia escolher para cada tipo de produto',
    excerpt:
      'Guia prático para conectar tecnologia de impressão, tipo de peça e objetivo comercial. Você entende quando priorizar velocidade, acabamento, tolerância dimensional e custo total por peça.',
    image: '/blog-impressoras-tecnologia-produto.png',
    updatedAt: 'Atualizado em 28 de março de 2026',
    author: 'João Neto',
  },
  {
    id: 'tema-4',
    slug: 'custos-reais-da-impressao-3d-no-brasil-preco-por-peca-margem-e-payback',
    title: 'Custos reais da impressão 3D no Brasil: preço por peça, margem e payback',
    excerpt:
      'Modelo objetivo para calcular custo completo, precificar com lucro e medir retorno sem distorção. O artigo detalha insumos, tempo de máquina, perdas e parâmetros para fechar proposta com segurança.',
    image: '/blog-custos-reais-impressao-3d-payback.png',
    updatedAt: 'Atualizado em 28 de março de 2026',
    author: 'João Neto',
  },
  {
    id: 'tema-5',
    slug: 'qualidade-e-escala-como-sair-do-prototipo-para-producao-com-consistencia',
    title: 'Qualidade e escala: como sair do protótipo para produção com consistência',
    excerpt:
      'Framework de operação para escalar com controle de processo, rastreabilidade e estabilidade de entrega. Inclui práticas de padronização, checkpoints de qualidade e governança para crescimento sustentável.',
    image: '/blog-qualidade-escala-consistencia.png',
    updatedAt: 'Atualizado em 28 de março de 2026',
    author: 'João Neto',
  },
];

export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostById(id: BlogPostMeta['id']): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}
