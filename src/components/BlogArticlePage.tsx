import type { CSSProperties } from 'react';
import { getBlogPostBySlug } from './blogPosts';
import { toSitePath } from '../lib/sitePath';

function Prism3dLogoMark({ className = '' }: { className?: string }) {
  return (
    <span className={`blog-logo-mark ${className}`.trim()} aria-label="Logo prism3d">
      prism<span>3d</span>
    </span>
  );
}

function BlogAuthor() {
  return (
    <div className="blog-author">
      <span className="blog-author-by">By Jo&atilde;o Neto</span>
      <span className="blog-author-logo" aria-label="Logo prism3d">
        prism<span>3d</span>
      </span>
    </div>
  );
}

type BlogArticlePageProps = {
  slug: string;
};

export default function BlogArticlePage({ slug }: BlogArticlePageProps) {
  const post = getBlogPostBySlug(slug);
  const heroStyle = {
    '--blog-hero-image': `url("${toSitePath(post?.image ?? '')}")`,
  } as CSSProperties;

  if (!post) {
    return (
      <section className="blog section-flow section-reveal" id="blog">
        <div className="blog-container section-parallax">
          <a className="blog-back-link" href="/blog">
            ← Voltar para os artigos
          </a>
          <article className="blog-post">
            <header className="blog-header blog-header--listing">
              <span className="blog-badge">BLOG PRISM 3D</span>
              <h2>Artigo n&atilde;o encontrado</h2>
              <p>N&atilde;o encontramos esse artigo. Volte para a lista de conte&uacute;dos do blog.</p>
              <a className="blog-cta" href="/blog">Voltar para os artigos</a>
            </header>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="blog section-flow section-reveal" id="blog" data-blog-mode="article" data-active-post={post.id}>
      <div className="blog-container section-parallax">
        <a className="blog-back-link" href="/blog">
          ← Voltar para os artigos
        </a>
        <header className="blog-article-hero" style={heroStyle}>
          <div className="blog-article-hero-content">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="blog-article-meta">
              <span>
                By {post.author} • <Prism3dLogoMark className="blog-logo-mark--inline blog-logo-mark--light" />
              </span>
              <span>{post.updatedAt}</span>
            </div>
          </div>
        </header>
        <article className="blog-post" id="tema-1">
          <header className="blog-header">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h2>Mercado de produtos fabricados com impress&atilde;o 3D no Brasil</h2>
            <BlogAuthor />

            <p>
              Um guia direto para entender o momento do mercado, onde est&atilde;o as melhores oportunidades no Brasil e como
              transformar impress&atilde;o 3D em receita recorrente.
            </p>
          </header>

          <section className="blog-block blog-block--lead">
            <h3>Resumo executivo</h3>
            <p>
              A manufatura aditiva deixou de ser apenas ferramenta de prototipagem e passou a disputar espa&ccedil;o em linhas
              produtivas de maior valor t&eacute;cnico. O crescimento global continua consistente e, no Brasil, os sinais de demanda
              industrial apontam para uma fase de acelera&ccedil;&atilde;o em aplica&ccedil;&otilde;es funcionais.
            </p>
            <ul className="blog-points">
              <li>A ind&uacute;stria global de AM atingiu US$ 20,035 bilh&otilde;es em 2023, com crescimento anual de 11,1%.</li>
              <li>No metal, o volume de sistemas embarcados cresceu 24,4%, puxando aplica&ccedil;&otilde;es industriais.</li>
              <li>No Brasil, proje&ccedil;&otilde;es de mercado apontam expans&atilde;o forte at&eacute; 2030.</li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>O que mudou no mercado global</h3>
            <p>
              O mercado ficou mais seletivo e mais profissional. Antes, a maior parte das opera&ccedil;&otilde;es estava concentrada em
              demonstra&ccedil;&atilde;o de tecnologia e prot&oacute;tipo r&aacute;pido. Hoje, o foco migrou para aplica&ccedil;&atilde;o com desempenho
              validado, rastreabilidade e previsibilidade de entrega.
            </p>
            <p>
              Isso altera o jogo comercial: empresas n&atilde;o compram apenas uma impressora, compram capacidade de resolver
              gargalos de produ&ccedil;&atilde;o, reduzir tempo de desenvolvimento e colocar pe&ccedil;as em uso real com menor risco.
            </p>
          </section>

          <section className="blog-block">
            <h3>Como esse cen&aacute;rio aparece no Brasil</h3>
            <p>
              O Brasil acompanha esse movimento em ritmo crescente. Em uma proje&ccedil;&atilde;o de mercado, o tamanho local passa de
              <strong> US$ 1,185 bilh&atilde;o (2023)</strong> para <strong>US$ 4,439 bilh&otilde;es (2030)</strong>, com CAGR de 20,8%.
              Outra leitura ampla de mercado aponta crescimento de 14,99% ao ano para o setor de impress&atilde;o 3D no horizonte
              2020-2031.
            </p>
            <p>
              Al&eacute;m da demanda, existe infraestrutura em forma&ccedil;&atilde;o: programas nacionais de Ind&uacute;stria 4.0, editais de
              prova de conceito e redes t&eacute;cnicas de valida&ccedil;&atilde;o est&atilde;o reduzindo a barreira de ado&ccedil;&atilde;o para pequenas,
              m&eacute;dias e grandes empresas.
            </p>
          </section>

          <section className="blog-block">
            <h3>Onde est&atilde;o as oportunidades de produto</h3>
            <div className="blog-grid">
              <article className="blog-card">
                <h4>Pe&ccedil;as funcionais sob demanda</h4>
                <p>
                  Itens de reposi&ccedil;&atilde;o, dispositivos de linha, gabaritos e componentes de baixo volume com prazo cr&iacute;tico.
                  Aqui, velocidade e flexibilidade pesam mais que escala massiva.
                </p>
              </article>

              <article className="blog-card">
                <h4>Personaliza&ccedil;&atilde;o premium</h4>
                <p>
                  Produtos com varia&ccedil;&atilde;o geom&eacute;trica, edi&ccedil;&otilde;es limitadas e customiza&ccedil;&atilde;o funcional. A margem tende a
                  ser maior quando a proposta est&aacute; em valor percebido, e n&atilde;o em commodity.
                </p>
              </article>

              <article className="blog-card">
                <h4>Sa&uacute;de e aplica&ccedil;&otilde;es t&eacute;cnicas</h4>
                <p>
                  Setor m&eacute;dico segue resiliente e de alto valor por exigir precis&atilde;o, valida&ccedil;&atilde;o e documenta&ccedil;&atilde;o.
                  Quem domina processo e qualidade constr&oacute;i vantagem competitiva de longo prazo.
                </p>
              </article>

              <article className="blog-card">
                <h4>Aeron&aacute;utica e ind&uacute;stria avan&ccedil;ada</h4>
                <p>
                  Casos no Brasil, como aplica&ccedil;&otilde;es relatadas pela Embraer, mostram ganhos concretos de lead time e redu&ccedil;&atilde;o
                  de desperd&iacute;cio quando AM entra em fluxo industrial estruturado.
                </p>
              </article>
            </div>
          </section>

          <section className="blog-block">
            <h3>Como vender com mais margem</h3>
            <ul className="blog-steps">
              <li>
                <strong>Venda aplica&ccedil;&atilde;o, n&atilde;o hora de m&aacute;quina.</strong> Posicione por resultado entregue, com
                especifica&ccedil;&atilde;o funcional e crit&eacute;rio de aceita&ccedil;&atilde;o.
              </li>
              <li>
                <strong>Padronize materiais e processos.</strong> Menos varia&ccedil;&atilde;o interna reduz retrabalho e melhora previsibilidade
                de custo.
              </li>
              <li>
                <strong>Crie pacotes de servi&ccedil;o.</strong> Desenvolvimento, prot&oacute;tipo validado, lote piloto e reposi&ccedil;&atilde;o t&eacute;cnica
                elevam recorr&ecirc;ncia.
              </li>
              <li>
                <strong>Use prova t&eacute;cnica para converter cliente.</strong> Um piloto com m&eacute;trica de desempenho tende a vender
                melhor do que proposta gen&eacute;rica.
              </li>
            </ul>
          </section>

          <section className="blog-conclusion">
            <h3>Conclus&atilde;o — Mercado 3D no Brasil</h3>
            <p>
              O mercado brasileiro de manufatura aditiva est&aacute; em transi&ccedil;&atilde;o para aplica&ccedil;&otilde;es de maior valor, com
              demanda crescente por pe&ccedil;as finais, reposi&ccedil;&atilde;o sob demanda e personaliza&ccedil;&atilde;o t&eacute;cnica.
            </p>
            <p>
              Para capturar essa oportunidade com margem, o ponto central &eacute; posicionar a oferta por resultado de aplica&ccedil;&atilde;o,
              e n&atilde;o apenas por capacidade de impress&atilde;o.
            </p>
          </section>
        </article>

        <div className="blog-topic-divider" aria-hidden="true" />

        <article className="blog-post" id="tema-2">
          <header className="blog-header blog-header--topic">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h2>Filamentos: tipos, acabamento e como escolher para cada aplica&ccedil;&atilde;o</h2>
            <BlogAuthor />

            <p>
              A escolha do filamento define custo, acabamento, desempenho e taxa de sucesso da impress&atilde;o. Este tema organiza
              os principais materiais, m&eacute;todos de acabamento e o cen&aacute;rio de oferta no Brasil.
            </p>
          </header>

          <section className="blog-block blog-block--lead">
            <h3>Resumo t&eacute;cnico</h3>
            <ul className="blog-points">
              <li>PLA e PETG dominam projetos gerais por facilidade e estabilidade de processo.</li>
              <li>ASA/ABS ganham espa&ccedil;o quando h&aacute; exig&ecirc;ncia de temperatura, impacto e ambiente externo.</li>
              <li>TPU e Nylon ampliam possibilidades funcionais, mas exigem mais controle de secagem e setup.</li>
              <li>Acabamento certo depende do material: lixa, primer, pintura, solvente e controle de umidade.</li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Mapa r&aacute;pido dos filamentos mais usados</h3>
            <div className="blog-grid">
              <article className="blog-card">
                <h4>PLA</h4>
                <p>
                  Mais simples de imprimir, ideal para pe&ccedil;as visuais, prototipagem r&aacute;pida e geometrias detalhadas.
                  Menor resist&ecirc;ncia t&eacute;rmica, mas excelente ponto de partida para opera&ccedil;&atilde;o est&aacute;vel.
                </p>
              </article>

              <article className="blog-card">
                <h4>PETG</h4>
                <p>
                  Equilibra facilidade, tenacidade e resist&ecirc;ncia qu&iacute;mica. Muito usado em pe&ccedil;as funcionais leves e itens de uso
                  pr&aacute;tico no dia a dia industrial.
                </p>
              </article>

              <article className="blog-card">
                <h4>ABS / ASA</h4>
                <p>
                  Materiais t&eacute;cnicos para esfor&ccedil;o mec&acirc;nico e maior temperatura. ASA costuma ser preferido para ambiente externo
                  por resist&ecirc;ncia UV. Pedem c&acirc;mara mais controlada para reduzir warping.
                </p>
              </article>

              <article className="blog-card">
                <h4>TPU</h4>
                <p>
                  Flex&iacute;vel, bom para veda&ccedil;&atilde;o, absor&ccedil;&atilde;o de impacto e pe&ccedil;as que precisam deformar sem quebrar.
                  Requer ajuste fino de alimenta&ccedil;&atilde;o e velocidade.
                </p>
              </article>

              <article className="blog-card">
                <h4>Nylon (PA)</h4>
                <p>
                  Alto desempenho mec&acirc;nico e boa resist&ecirc;ncia t&eacute;rmica, adequado para pe&ccedil;as t&eacute;cnicas.
                  &Eacute; higrosc&oacute;pico e depende fortemente de secagem/armazenamento correto.
                </p>
              </article>

              <article className="blog-card">
                <h4>Compostos (CF, vidro, madeira, metal)</h4>
                <p>
                  Entregam propriedades ou visual espec&iacute;fico. Em geral exigem bico endurecido e processo mais rigoroso de calibra&ccedil;&atilde;o.
                  S&atilde;o ideais para aplica&ccedil;&otilde;es de nicho e acabamento premium.
                </p>
              </article>
            </div>
          </section>

          <section className="blog-block">
            <h3>Acabamento: o que funciona melhor por material</h3>
            <ul className="blog-steps">
              <li>
                <strong>PLA e PETG:</strong> lixamento progressivo, corre&ccedil;&atilde;o com primer e pintura final. Bom para superf&iacute;cie limpa,
                identidade visual e pe&ccedil;as de demonstra&ccedil;&atilde;o.
              </li>
              <li>
                <strong>ABS e ASA:</strong> permitem acabamento por vapor de acetona em casos controlados, com ganho visual e selagem
                superficial. Exige cuidado de seguran&ccedil;a e controle para n&atilde;o perder detalhe.
              </li>
              <li>
                <strong>TPU:</strong> acabamento deve ser leve, priorizando fun&ccedil;&atilde;o sobre cosm&eacute;tica. Geometria e orienta&ccedil;&atilde;o de camada
                impactam mais que p&oacute;s-processo agressivo.
              </li>
              <li>
                <strong>Nylon e compostos:</strong> acabamento t&eacute;cnico com foco funcional (encaixe, atrito, desgaste), e menos foco apenas
                est&eacute;tico.
              </li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Secagem e armazenamento: fator decisivo para qualidade</h3>
            <p>
              Filamentos FFF s&atilde;o, em diferentes n&iacute;veis, higrosc&oacute;picos. Quando acumulam umidade, aparecem fios, porosidade,
              baixa ader&ecirc;ncia entre camadas e perda de acabamento. Materiais como Nylon, TPU e PVA/BVOH tendem a ser
              mais sens&iacute;veis.
            </p>
            <p>
              Opera&ccedil;&atilde;o profissional pede rotina simples: secagem preventiva, bobina em drybox e controle de ambiente.
              Isso reduz descarte, melhora repetibilidade e aumenta a taxa de sucesso em lotes.
            </p>
          </section>

          <section className="blog-block">
            <h3>Recorte Brasil: oferta real de filamentos</h3>
            <p>
              No mercado brasileiro, cat&aacute;logos de fabricantes e varejistas j&aacute; oferecem uma linha ampla de PLA, PETG, ABS, ASA, TPU
              e filamentos de engenharia. Em marcas locais, &eacute; comum encontrar op&ccedil;&otilde;es gerais e especiais (como ASA WP,
              HIPS, Tritan e compostos), o que reduz depend&ecirc;ncia de importa&ccedil;&atilde;o para parte relevante das aplica&ccedil;&otilde;es.
            </p>
            <p>
              Em paralelo, os valores de entrada para materiais populares seguem competitivos no varejo nacional, enquanto
              grades t&eacute;cnicos mant&ecirc;m custo maior por quilo. Na pr&aacute;tica, a melhor decis&atilde;o econ&ocirc;mica &eacute; selecionar
              filamento pelo requisito da pe&ccedil;a, n&atilde;o apenas pelo menor pre&ccedil;o.
            </p>
          </section>

          <section className="blog-conclusion">
            <h3>Conclus&atilde;o — Filamentos e Acabamento</h3>
            <p>
              Escolher filamento &eacute; decis&atilde;o de engenharia e de neg&oacute;cio ao mesmo tempo. Quando material, secagem e acabamento
              s&atilde;o definidos por aplica&ccedil;&atilde;o, a impress&atilde;o 3D ganha previsibilidade de custo, qualidade e prazo.
            </p>
            <p>
              Para opera&ccedil;&atilde;o no Brasil, a combina&ccedil;&atilde;o mais segura &eacute; padronizar 2 ou 3 materiais-base (ex.: PLA, PETG, ASA)
              e abrir materiais t&eacute;cnicos sob crit&eacute;rio de projeto. Esse modelo reduz erro, acelera entrega e protege margem.
            </p>
          </section>
        </article>

        <div className="blog-topic-divider" aria-hidden="true" />

        <article className="blog-post" id="tema-3">
          <header className="blog-header blog-header--topic">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h2>Impressoras 3D: qual tecnologia escolher para cada tipo de produto</h2>
            <BlogAuthor />

            <p>
              Escolher a impressora certa reduz custo por pe&ccedil;a, diminui retrabalho e acelera o time-to-market.
              Este guia traduz tecnologia em aplica&ccedil;&atilde;o pr&aacute;tica: que m&aacute;quina usar para cada fam&iacute;lia de produto.
            </p>
          </header>

          <section className="blog-block blog-block--lead">
            <h3>Resumo executivo</h3>
            <ul className="blog-points">
              <li>
                <strong>FDM/FFF</strong> &eacute; a melhor porta de entrada para prot&oacute;tipos, gabaritos e pe&ccedil;as de reposi&ccedil;&atilde;o em baixo volume.
              </li>
              <li>
                <strong>SLA</strong> lidera quando o produto exige detalhe fino, superf&iacute;cie superior e geometrias de alta precis&atilde;o visual.
              </li>
              <li>
                <strong>SLS/MJF</strong> tende a ser o melhor caminho para lote funcional em pol&iacute;mero com boa produtividade.
              </li>
              <li>
                <strong>Metal AM</strong> entra quando performance mec&acirc;nica e geometrias complexas justificam custo de processo maior.
              </li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Leitura r&aacute;pida: tecnologia x tipo de produto</h3>
            <div className="blog-grid">
              <article className="blog-card">
                <h4>FDM/FFF (filamento)</h4>
                <p>
                  Ideal para pe&ccedil;as funcionais de baixa/m&eacute;dia complexidade, prototipagem de engenharia, jigs e fixtures.
                  Bom custo de entrada e ampla oferta de materiais.
                </p>
              </article>

              <article className="blog-card">
                <h4>SLA (resina)</h4>
                <p>
                  Melhor escolha para produtos visuais, modelos com microdetalhe, moldes mestre, dental e aplica&ccedil;&otilde;es
                  que dependem de acabamento premium.
                </p>
              </article>

              <article className="blog-card">
                <h4>SLS (p&oacute; polim&eacute;rico)</h4>
                <p>
                  Forte para pe&ccedil;as finais em nylon, lotes curtos e geometrias complexas sem suporte.
                  Excelente para funcionalidade e produtividade com pe&ccedil;as aninhadas.
                </p>
              </article>

              <article className="blog-card">
                <h4>MJF (p&oacute; polim&eacute;rico industrial)</h4>
                <p>
                  Muito eficiente para produ&ccedil;&atilde;o em escala de pe&ccedil;as funcionais, lotes repetitivos e manufatura digital.
                  Comum em componentes t&eacute;cnicos, carca&ccedil;as e auxiliares de linha.
                </p>
              </article>

              <article className="blog-card">
                <h4>PolyJet</h4>
                <p>
                  Excelente para prot&oacute;tipo de alto realismo (textura/cor), valida&ccedil;&atilde;o de design e apresenta&ccedil;&atilde;o comercial.
                  Menos indicado para pe&ccedil;a estrutural de uso pesado.
                </p>
              </article>

              <article className="blog-card">
                <h4>Metal AM (LPBF/DMLS)</h4>
                <p>
                  Indicado para componentes de alto valor em aeroespacial, sa&uacute;de, energia e automotivo.
                  Escolha recomendada quando geometrias e desempenho superam limita&ccedil;&otilde;es de usinagem tradicional.
                </p>
              </article>
            </div>
          </section>

          <section className="blog-block">
            <h3>Qual impressora para cada produto na pr&aacute;tica</h3>
            <ul className="blog-steps">
              <li>
                <strong>Produto visual para venda/apresenta&ccedil;&atilde;o:</strong> prefira SLA ou PolyJet para acabamento e fidelidade de detalhe.
              </li>
              <li>
                <strong>Pe&ccedil;a de reposi&ccedil;&atilde;o e manuten&ccedil;&atilde;o:</strong> FDM (PETG/ASA/Nylon) costuma entregar melhor custo-benef&iacute;cio.
              </li>
              <li>
                <strong>Lote curto de pe&ccedil;as funcionais:</strong> SLS/MJF tende a ganhar em produtividade e consist&ecirc;ncia.
              </li>
              <li>
                <strong>Dispositivo de linha (gabarito/fixador):</strong> FDM t&eacute;cnico ou MJF, conforme volume e esfor&ccedil;o mec&acirc;nico.
              </li>
              <li>
                <strong>Pe&ccedil;a flex&iacute;vel (veda&ccedil;&atilde;o/absor&ccedil;&atilde;o):</strong> FDM com TPU para baixa escala; SLS com elast&ocirc;mero para escala maior.
              </li>
              <li>
                <strong>Componente met&aacute;lico de alta exig&ecirc;ncia:</strong> considerar metal AM com valida&ccedil;&atilde;o de processo e p&oacute;s-processo.
              </li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Crit&eacute;rios de decis&atilde;o que evitam erro de compra</h3>
            <p>
              A melhor compra n&atilde;o &eacute; a impressora "mais completa", e sim a que resolve o mix de produto com maior frequ&ecirc;ncia.
              Para decidir, use cinco filtros: material dominante, volume mensal, toler&acirc;ncia/acabamento exigidos, tempo de entrega
              e custo de p&oacute;s-processo.
            </p>
            <p>
              Em opera&ccedil;&atilde;o real, muitas empresas obt&ecirc;m melhor resultado com combina&ccedil;&atilde;o de tecnologias:
              FDM para engenharia r&aacute;pida + SLA para detalhamento + servi&ccedil;o externo SLS/MJF/metal para produ&ccedil;&atilde;o espec&iacute;fica.
            </p>
          </section>

          <section className="blog-block">
            <h3>Recorte Brasil: maturidade e oferta por aplica&ccedil;&atilde;o</h3>
            <p>
              O ecossistema brasileiro vem aumentando capacidade t&eacute;cnica e acesso a tecnologias industriais. O SENAI CIMATEC
              destaca opera&ccedil;&atilde;o com HP Multi Jet Fusion (5210/580) em bureau aplicado a setores como automotivo, minera&ccedil;&atilde;o,
              papel e celulose, defesa, agroneg&oacute;cio, petr&oacute;leo e g&aacute;s, sa&uacute;de e aeroespacial.
            </p>
            <p>
              Em paralelo, a ABIMAQ refor&ccedil;a demanda por aplica&ccedil;&otilde;es industriais com capacita&ccedil;&atilde;o voltada a requisitos
              mec&acirc;nicos, qu&iacute;micos e t&eacute;rmicos. Na pr&aacute;tica, isso mostra que o mercado local est&aacute; migrando de uso pontual
              para uso produtivo orientado por aplica&ccedil;&atilde;o.
            </p>
          </section>

          <section className="blog-conclusion">
            <h3>Conclus&atilde;o — Escolha da Impressora Certa</h3>
            <p>
              Tecnologia de impress&atilde;o 3D deve ser escolhida pela natureza do produto e pelo objetivo de neg&oacute;cio.
              Se a meta &eacute; velocidade com baixo investimento inicial, FDM lidera. Se a meta &eacute; acabamento e precis&atilde;o visual,
              SLA/PolyJet tendem a ser melhores. Para escala funcional, SLS/MJF geralmente ganham. Em metal, o foco &eacute; aplica&ccedil;&atilde;o
              de alto valor.
            </p>
            <p>
              O caminho mais seguro para 2026 &eacute; montar uma matriz de decis&atilde;o por produto, com teste de piloto e m&eacute;trica clara
              de custo por pe&ccedil;a, lead time e taxa de retrabalho.
            </p>
          </section>
        </article>

        <div className="blog-topic-divider" aria-hidden="true" />

        <article className="blog-post" id="tema-4">
          <header className="blog-header blog-header--topic">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h2>Custos reais da impress&atilde;o 3D no Brasil: pre&ccedil;o por pe&ccedil;a, margem e payback</h2>
            <BlogAuthor />

            <p>
              A maioria das opera&ccedil;&otilde;es erra no mesmo ponto: calcula apenas material e ignora tempo de m&aacute;quina, falha, energia,
              p&oacute;s-processo e custo comercial. Este tema mostra uma metodologia objetiva para precificar com lucro real.
            </p>
          </header>

          <section className="blog-block blog-block--lead">
            <h3>Resumo executivo</h3>
            <ul className="blog-points">
              <li>Material raramente &eacute; o maior componente do custo final; tempo e processo costumam pesar mais.</li>
              <li>Precifica&ccedil;&atilde;o profissional separa custo t&eacute;cnico, custo operacional e custo comercial.</li>
              <li>Payback deve ser medido por ganho de margem + economia de lead time + redu&ccedil;&atilde;o de retrabalho.</li>
              <li>No Brasil, energia, tributos e volatilidade de insumos exigem revis&atilde;o peri&oacute;dica de tabela de pre&ccedil;os.</li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Estrutura de custo por pe&ccedil;a (modelo profissional)</h3>
            <p>
              Use uma estrutura em oito blocos para n&atilde;o subestimar custo. A f&oacute;rmula base:
              <strong> Custo total = Material + Energia + M&aacute;quina/hora + M&atilde;o de obra + P&oacute;s-processo + Qualidade/Falha + Embalagem/Log&iacute;stica + Comercial/Administrativo.</strong>
            </p>
            <ul className="blog-steps">
              <li>
                <strong>Material:</strong> massa consumida (pe&ccedil;a + suporte + perda) x custo por kg.
              </li>
              <li>
                <strong>Energia:</strong> pot&ecirc;ncia m&eacute;dia (kW) x horas de ciclo x tarifa local (R$/kWh).
              </li>
              <li>
                <strong>M&aacute;quina/hora:</strong> deprecia&ccedil;&atilde;o + manuten&ccedil;&atilde;o + pe&ccedil;as de desgaste divididas pelas horas produtivas.
              </li>
              <li>
                <strong>M&atilde;o de obra:</strong> prepara&ccedil;&atilde;o, setup, retirada, inspe&ccedil;&atilde;o e acabamento.
              </li>
              <li>
                <strong>Falha e refugo:</strong> aplique fator de risco por material/processo (ex.: 5% a 20%).
              </li>
              <li>
                <strong>Overhead comercial:</strong> vendas, financeiro, marketing, impostos e inadimpl&ecirc;ncia.
              </li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Precifica&ccedil;&atilde;o: de custo para margem</h3>
            <p>
              Depois do custo total, o pre&ccedil;o deve cobrir risco e crescimento da opera&ccedil;&atilde;o. Modelo pr&aacute;tico:
              <strong> Pre&ccedil;o de venda = Custo total / (1 - margem alvo).</strong>
            </p>
            <p>
              Exemplo: se custo por pe&ccedil;a = R$ 120 e margem alvo = 35%, o pre&ccedil;o m&iacute;nimo sustent&aacute;vel &eacute; R$ 184,62.
              Sem essa conta, a empresa pode faturar e mesmo assim perder caixa.
            </p>
          </section>

          <section className="blog-block">
            <h3>Payback: como calcular sem ilusão</h3>
            <p>
              Avalie investimento com ganho mensal real, n&atilde;o com "capacidade te&oacute;rica". Use:
              <strong> Payback (meses) = Investimento total / Ganho mensal l&iacute;quido.</strong>
            </p>
            <p>
              O ganho mensal l&iacute;quido deve considerar: margem incremental em novos pedidos, economia de terceiriza&ccedil;&atilde;o,
              redu&ccedil;&atilde;o de lead time e menor perda por refugo. Essa vis&atilde;o costuma ser mais fiel do que olhar apenas volume impresso.
            </p>
          </section>

          <section className="blog-block">
            <h3>Recorte Brasil: fatores que mais impactam custo</h3>
            <div className="blog-grid">
              <article className="blog-card">
                <h4>Energia e tarifa hor&aacute;ria</h4>
                <p>
                  A ANEEL projeta press&atilde;o tarif&aacute;ria em 2026 e amplia discuss&atilde;o de tarifa hor&aacute;ria para alto consumo.
                  Operar impress&otilde;es longas fora de ponta pode melhorar custo unit&aacute;rio em parte dos cen&aacute;rios.
                </p>
              </article>
              <article className="blog-card">
                <h4>Capital de giro e caixa</h4>
                <p>
                  No Brasil, prazo de recebimento e custo financeiro pesam no pre&ccedil;o final. As diretrizes do Sebrae sobre fluxo de
                  caixa e capital de giro s&atilde;o essenciais para evitar crescimento com descasamento de caixa.
                </p>
              </article>
              <article className="blog-card">
                <h4>Mix de materiais</h4>
                <p>
                  Materiais populares (PLA/PETG) costumam ter oferta ampla nacional, enquanto grades t&eacute;cnicos podem variar
                  mais de pre&ccedil;o. Revisar tabela por material trimestralmente evita margem comprimida.
                </p>
              </article>
              <article className="blog-card">
                <h4>P&oacute;s-processo como gargalo</h4>
                <p>
                  Muitas opera&ccedil;&otilde;es subestimam acabamento, inspe&ccedil;&atilde;o e embalagem. Em pe&ccedil;as premium, essa etapa pode
                  ser o maior custo do ciclo.
                </p>
              </article>
            </div>
          </section>

          <section className="blog-conclusion">
            <h3>Conclus&atilde;o — Custos, Margem e Payback</h3>
            <p>
              Lucro em impress&atilde;o 3D vem de m&eacute;todo, n&atilde;o de tentativa. Quem calcula custo completo, revisa pre&ccedil;o por evid&ecirc;ncia
              e mede payback com disciplina consegue escalar com previsibilidade.
            </p>
            <p>
              O pr&oacute;ximo passo recomendado &eacute; padronizar uma planilha &uacute;nica de custo por fam&iacute;lia de pe&ccedil;a (visual, funcional e
              t&eacute;cnica) e revisar o markup por canal de venda.
            </p>
          </section>
        </article>

        <div className="blog-topic-divider" aria-hidden="true" />

        <article className="blog-post" id="tema-5">
          <header className="blog-header blog-header--topic">
            <span className="blog-badge">BLOG PRISM 3D</span>
            <h2>Qualidade e escala: como sair do prot&oacute;tipo para produ&ccedil;&atilde;o com consist&ecirc;ncia</h2>
            <BlogAuthor />

            <p>
              O maior desafio n&atilde;o &eacute; imprimir uma pe&ccedil;a boa. &Eacute; imprimir cem pe&ccedil;as boas, com mesmo prazo, mesmo encaixe
              e mesma performance. Este tema traz um framework pr&aacute;tico de qualidade para escalar com seguran&ccedil;a.
            </p>
          </header>

          <section className="blog-block blog-block--lead">
            <h3>Resumo executivo</h3>
            <ul className="blog-points">
              <li>Escala exige processo documentado, n&atilde;o apenas bom operador.</li>
              <li>Controle de mat&eacute;ria-prima (umidade/lote) &eacute; t&atilde;o cr&iacute;tico quanto setup da impressora.</li>
              <li>Inspe&ccedil;&atilde;o por amostragem e rastreabilidade evitam retrabalho em lote.</li>
              <li>Refer&ecirc;ncias ISO/ASTM 52900 e 52920 ajudam a estruturar rotina de qualifica&ccedil;&atilde;o industrial.</li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Do prot&oacute;tipo &agrave; produ&ccedil;&atilde;o: o que precisa mudar</h3>
            <p>
              No prot&oacute;tipo, o objetivo &eacute; aprender r&aacute;pido. Na produ&ccedil;&atilde;o, o objetivo &eacute; repetir com controle.
              Isso exige padr&atilde;o de trabalho: arquivo mestre versionado, setup bloqueado por aplica&ccedil;&atilde;o, checklist de in&iacute;cio de turno
              e crit&eacute;rios claros de aceite/rejei&ccedil;&atilde;o.
            </p>
            <p>
              Sem esse pacote, a empresa depende de tentativa e erro a cada novo lote, aumentando variabilidade de medida,
              acabamento e prazo.
            </p>
          </section>

          <section className="blog-block">
            <h3>Controle de processo que realmente impacta qualidade</h3>
            <ul className="blog-steps">
              <li>
                <strong>Entrada de material:</strong> registrar lote, data de abertura, condi&ccedil;&atilde;o de secagem e armazenamento.
              </li>
              <li>
                <strong>Setup controlado:</strong> bico, altura de camada, per&iacute;metros, temperatura e velocidade por c&oacute;digo de pe&ccedil;a.
              </li>
              <li>
                <strong>First layer validada:</strong> toda deriva inicial amplifica defeito no resto do lote.
              </li>
              <li>
                <strong>Inspe&ccedil;&atilde;o intermedi&aacute;ria:</strong> pontos cr&iacute;ticos dimensionais e visuais durante o ciclo, e n&atilde;o apenas no fim.
              </li>
              <li>
                <strong>P&oacute;s-processo padronizado:</strong> mesmo fluxo de limpeza, acabamento e embalagem para evitar varia&ccedil;&atilde;o final.
              </li>
            </ul>
          </section>

          <section className="blog-block">
            <h3>Indicadores-chave para escalar sem perder padr&atilde;o</h3>
            <div className="blog-grid">
              <article className="blog-card">
                <h4>FPY (First Pass Yield)</h4>
                <p>
                  Percentual de pe&ccedil;as aprovadas na primeira passagem. &Eacute; o indicador mais direto de maturidade de processo.
                </p>
              </article>
              <article className="blog-card">
                <h4>Taxa de refugo</h4>
                <p>
                  Mede perda real por defeito e serve de gatilho para corre&ccedil;&atilde;o de setup, material ou p&oacute;s-processo.
                </p>
              </article>
              <article className="blog-card">
                <h4>Lead time por lote</h4>
                <p>
                  Monitora previsibilidade operacional e sustenta SLA comercial com o cliente.
                </p>
              </article>
              <article className="blog-card">
                <h4>Custo da n&atilde;o qualidade</h4>
                <p>
                  Soma retrabalho, devolu&ccedil;&atilde;o, nova impress&atilde;o e atrasos. Sem esse indicador, margem some silenciosamente.
                </p>
              </article>
            </div>
          </section>

          <section className="blog-block">
            <h3>Recorte Brasil: como profissionalizar a opera&ccedil;&atilde;o</h3>
            <p>
              O ecossistema nacional tem avan&ccedil;ado em qualifica&ccedil;&atilde;o industrial de AM, com iniciativas como o centro CTMA
              (CERTI + CTI Renato Archer) para confiabilidade de pe&ccedil;as cr&iacute;ticas e bureaus industriais como o SENAI CIMATEC em
              opera&ccedil;&atilde;o de escala com MJF.
            </p>
            <p>
              Para pequenas e m&eacute;dias opera&ccedil;&otilde;es, isso refor&ccedil;a um caminho pr&aacute;tico: padronizar processo interno e terceirizar
              etapas de maior complexidade at&eacute; que volume justifique internaliza&ccedil;&atilde;o.
            </p>
          </section>

          <section className="blog-conclusion">
            <h3>Conclus&atilde;o — Qualidade e Escala</h3>
            <p>
              Escalar impress&atilde;o 3D com qualidade depende de disciplina operacional, rastreabilidade e decis&otilde;es guiadas por dados.
              Quando processo e controle evoluem juntos, a empresa sai da l&oacute;gica de "impress&atilde;o artesanal" e entra em modelo
              industrial previs&iacute;vel.
            </p>
            <p>
              A prioridade para 2026 &eacute; implantar um plano de controle simples, mas rigoroso: padr&atilde;o de material, padr&atilde;o de setup,
              padr&atilde;o de inspe&ccedil;&atilde;o e padr&atilde;o de entrega.
            </p>
            <a className="blog-cta" href="/">
              Voltar para a Landing
            </a>
          </section>
        </article>
      </div>
    </section>
  );
}


