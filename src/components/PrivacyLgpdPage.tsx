export default function PrivacyLgpdPage() {
  return (
    <section className="legal section-flow section-reveal" id="privacidade-lgpd">
      <div className="legal-container">
        <header className="legal-header">
          <span className="legal-badge">POLÍTICA DE PRIVACIDADE</span>
          <h1>Privacidade e LGPD</h1>
          <p>
            Este documento resume como a PRISM 3D trata dados pessoais em canais digitais e contato
            comercial. Última revisão em 31/03/2026.
          </p>
        </header>

        <section className="legal-section">
          <h2>1. Quais dados coletamos</h2>
          <p>Coletamos apenas dados necessários para atendimento comercial e técnico.</p>
          <ul>
            <li>Nome, empresa, telefone e e-mail enviados pelo formulário.</li>
            <li>Informações de necessidade técnica (produto, volume, prazo e aplicação).</li>
            <li>Dados básicos de navegação para analytics e melhoria de performance do site.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Como usamos os dados</h2>
          <ul>
            <li>Responder solicitações de contato e orçamentos.</li>
            <li>Orientar especificações técnicas de produtos e downloads.</li>
            <li>Gerar indicadores de uso para evolução de conteúdo e experiência.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Base legal e armazenamento</h2>
          <ul>
            <li>Tratamento com base em consentimento e legítimo interesse comercial.</li>
            <li>Retenção pelo período mínimo necessário para atendimento e auditoria.</li>
            <li>Acesso restrito por perfis autorizados da equipe comercial e técnica.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Compartilhamento e segurança</h2>
          <ul>
            <li>Não vendemos dados pessoais para terceiros.</li>
            <li>Uso de provedores de infraestrutura apenas para operação do site e e-mail.</li>
            <li>Aplicação de controles de segurança proporcionais ao tipo de dado tratado.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Direitos do titular</h2>
          <p>
            Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade ou
            exclusão dos seus dados.
          </p>
          <p>
            Canal de privacidade: <a href="mailto:comercial@prism3d.com.br">comercial@prism3d.com.br</a>
          </p>
        </section>

        <p className="legal-note">
          Nota: este é um conteúdo institucional inicial. Recomendamos validação jurídica final
          para publicação oficial.
        </p>
      </div>
    </section>
  );
}
