type FooterLink = {
  href: string;
  label: string;
};

const NAV_LINKS: FooterLink[] = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/blog', label: 'Blog' },
  { href: '/#cta', label: 'Contato' },
];

const RESOURCE_LINKS: FooterLink[] = [
  { href: '/catalogo#catalogo-produtos', label: 'Produtos' },
  { href: '/catalogo/produtos/flashforge-ad5x', label: 'Página de produto' },
  { href: '/blog/mercado-produtos-fabricados-com-impressao-3d-no-brasil', label: 'Guia de mercado' },
  { href: '/#specs', label: 'Especificações' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <section className="site-footer-block site-footer-brand" aria-label="Marca">
          <a className="site-footer-logo" href="/" aria-label="PRISM 3D Home">
            prism<span>3d</span>
          </a>
          <p>
            Soluções profissionais em impressão 3D para prototipagem, produção e operação comercial.
          </p>
        </section>

        <nav className="site-footer-block site-footer-nav" aria-label="Navegação principal">
          <h3>Navegação</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer-block site-footer-nav" aria-label="Recursos">
          <h3>Recursos</h3>
          <ul>
            {RESOURCE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer-block site-footer-contact" aria-label="Contato comercial">
          <h3>Contato comercial</h3>
          <a href="mailto:comercial@prism3d.com.br">comercial@prism3d.com.br</a>
          <a href="tel:+558133334455">+55 (81) 3333-4455</a>
          <address>
            Avenida Cais do Apolo, 455
            <br />
            Bairro do Recife, Recife - PE
            <br />
            CEP 50030-220, Brasil
          </address>
        </section>
      </div>

      <div className="site-footer-bottom">
        <p>&copy; {year} PRISM 3D. Todos os direitos reservados.</p>
        <nav aria-label="Links legais" className="site-footer-legal">
          <a href="/privacidade-lgpd">Privacidade e LGPD</a>
          <a href="/termos-comerciais">Termos comerciais</a>
        </nav>
      </div>
    </footer>
  );
}
