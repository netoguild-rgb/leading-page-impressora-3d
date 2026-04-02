export type BlogNewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  updatedAt: string;
  author: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const BLOG_NEWS_ITEMS: BlogNewsItem[] = [
  {
    slug: 'the-x1-series-is-eol-the-standard-it-set-will-remain-forever',
    title: 'A série X1 chegou ao fim do ciclo, mas o padrão que ela definiu permanece',
    excerpt:
      'A X1 e a X1C não foram apenas impressoras: marcaram um ponto de virada para todo o setor de manufatura aditiva. A análise destaca o impacto no padrão de velocidade, qualidade e experiência de uso que influenciou a próxima geração da marca.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2026/03/X1-hero.jpg',
    updatedAt: '31 de mar. de 2026',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/the-x1-series-is-eol-the-standard-it-set-will-remain-forever/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'bambu-lab-and-meland-open-chinas-first-3d-printing-creativity-center-for-children',
    title: 'Bambu Lab e meland inauguram o primeiro Centro de Criatividade em Impressão 3D para crianças na China',
    excerpt:
      'O projeto Cyber Brick City retorna em novo formato, com oficinas guiadas, narrativa interativa e experiência imersiva para o público infantil. A proposta combina educação maker e contato prático com manufatura aditiva desde cedo.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2026/03/BBLxmeland---hero.jpg',
    updatedAt: '17 de mar. de 2026',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/bambu-lab-and-meland-open-chinas-first-3d-printing-creativity-center-for-children/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'bambu-lab-sponsors-hard-mode-the-mit-hardware-x-ai-hackathon',
    title: 'Bambu Lab patrocina o HARD MODE, hackathon de Hardware x IA no MIT',
    excerpt:
      'IA e hardware se encontram no MIT em uma maratona de 48 horas para criar objetos físicos com inteligência aplicada. O evento destaca prototipagem rápida e iteração em ciclos curtos como vantagem competitiva.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2026/03/HARD-MODE.jpg',
    updatedAt: '6 de mar. de 2026',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/bambu-lab-sponsors-hard-mode-the-mit-hardware-x-ai-hackathon/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'a-farewell-to-p1p',
    title: 'Uma despedida da P1P',
    excerpt:
      'A P1P encerra seu ciclo após consolidar uma base forte de usuários e projetos. Com isso, P1S e P2S assumem protagonismo com foco em produtividade, acabamento e fluxo operacional mais previsível.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2026/02/P1P-hero.jpg',
    updatedAt: '10 de fev. de 2026',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/a-farewell-to-p1p/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'makerworld-launches-creator-copyright-protection-program',
    title: 'MakerWorld lança programa de proteção de direitos autorais para criadores',
    excerpt:
      'A iniciativa combina suporte jurídico e ações coordenadas para remover links infratores e proteger projetos autorais. O objetivo é aumentar a segurança para designers e incentivar publicações com confiança.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2026/02/MW-01.png',
    updatedAt: '4 de fev. de 2026',
    author: 'MakerWorld',
    sourceUrl: 'https://blog.bambulab.com/makerworld-launches-creator-copyright-protection-program/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'lets-make-it-fund-program-for-makers-who-want-to-achieve-the-impossible',
    title: 'Let\'s Make It Fund: programa para makers que querem viabilizar projetos ambiciosos',
    excerpt:
      'A iniciativa prevê até US$ 300 mil para transformar ideias de alto impacto em produtos reais. O programa cobre etapas de validação, produção e chegada ao mercado para projetos com potencial comprovado.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2025/12/Lets-Make-It-Fund.jpg',
    updatedAt: '12 de dez. de 2025',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/lets-make-it-fund-program-for-makers-who-want-to-achieve-the-impossible/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'realme-partners-with-bambu-lab-and-makerworld-on-replaceable-3d-printed-camera-deck-for-the-new-gt-8-pro',
    title: 'realme fecha parceria com Bambu Lab e MakerWorld em módulo de câmera substituível impresso em 3D',
    excerpt:
      'O anúncio europeu reforça a convergência entre tecnologia móvel e fabricação aditiva aplicada ao consumidor final. A colaboração mostra como componentes impressos em 3D podem ampliar personalização e agilidade de produto.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2025/12/realme-BBL--5-.jpg',
    updatedAt: '5 de dez. de 2025',
    author: 'Pawel Slusarczyk',
    sourceUrl:
      'https://blog.bambulab.com/realme-partners-with-bambu-lab-and-makerworld-on-replaceable-3d-printed-camera-deck-for-the-new-gt-8-pro/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'makegood-unveils-low-cost-3d-printed-mobility-chair-for-children-and-releases-files-on-makerworld',
    title: 'MakeGood apresenta cadeira de mobilidade infantil de baixo custo impressa em 3D',
    excerpt:
      'O projeto open source Toddler Mobility Trainer foi publicado na MakerWorld para ampliar o acesso da comunidade. A proposta reduz barreiras de custo e acelera a fabricação local de soluções assistivas.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2025/12/MakeGood-01.jpg',
    updatedAt: '3 de dez. de 2025',
    author: 'Pawel Slusarczyk',
    sourceUrl:
      'https://blog.bambulab.com/makegood-unveils-low-cost-3d-printed-mobility-chair-for-children-and-releases-files-on-makerworld/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'bambu-lab-h2c-where-multi-material-vortek-system-meets-engineering-precision',
    title: 'Bambu Lab H2C: quando o sistema Multi-Material Vortek encontra precisão de engenharia',
    excerpt:
      'Multimaterial sem concessões e criatividade sem limites para aplicações técnicas e visuais. O destaque está na combinação de troca confiável de material com consistência para peças de maior exigência.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2025/11/Bambu-Lab-H2C.jpg',
    updatedAt: '14 de nov. de 2025',
    author: 'Bambu Lab',
    sourceUrl: 'https://blog.bambulab.com/bambu-lab-h2c-where-multi-material-vortek-system-meets-engineering-precision/',
    sourceLabel: 'Bambu Lab Blog',
  },
  {
    slug: 'bambu-lab-supports-british-startup-building-seagrass-harvester-to-restore-vital-underwater-meadows',
    title: 'Bambu Lab apoia startup britânica no desenvolvimento da Seagrass Harvester',
    excerpt:
      'Peças-chave do projeto foram produzidas nas impressoras H2D e P1S para acelerar protótipos e validações em campo. O caso mostra uso prático da impressão 3D em iniciativas de restauração ambiental.',
    image: 'https://blog.bambulab.com/content/images/size/w1200/2025/11/Seagrass-Project-and-Bambu-Lab--11-.jpg',
    updatedAt: '10 de nov. de 2025',
    author: 'Pawel Slusarczyk',
    sourceUrl:
      'https://blog.bambulab.com/bambu-lab-supports-british-startup-building-seagrass-harvester-to-restore-vital-underwater-meadows/',
    sourceLabel: 'Bambu Lab Blog',
  },
];
