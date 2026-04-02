type UnderDevelopmentPageProps = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
};

export default function UnderDevelopmentPage({
  badge,
  title,
  description,
  highlights,
}: UnderDevelopmentPageProps) {
  return (
    <section className="legal section-flow section-reveal">
      <div className="legal-container">
        <header className="legal-header">
          <span className="legal-badge">{badge}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section className="legal-section">
          <h2>Página em desenvolvimento</h2>
          <p>
            Esta área está sendo estruturada para publicação completa com portfólio, metodologia e condições comerciais.
          </p>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="legal-section">
          <h2>Atendimento imediato</h2>
          <p>
            Enquanto finalizamos esta página, fale com nosso time comercial:
            {' '}
            <a href="mailto:comercial@prism3d.com.br">comercial@prism3d.com.br</a>
          </p>
        </section>
      </div>
    </section>
  );
}
