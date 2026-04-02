import { type FormEvent, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { trackEvent } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

type ContactFormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  name: '',
  company: '',
  phone: '',
  email: '',
  message: '',
};

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.contact-eyebrow', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' })
      .from('.contact-title', { y: 36, opacity: 0, duration: 0.66, ease: 'power3.out' }, '-=0.24')
      .from('.contact-subtitle', { y: 22, opacity: 0, duration: 0.52, ease: 'power3.out' }, '-=0.3')
      .from('.contact-form-shell', { y: 18, opacity: 0, duration: 0.56, ease: 'power3.out' }, '-=0.2');
  }, { scope: sectionRef });

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setFeedback({
        type: 'error',
        message: 'Preencha pelo menos nome e WhatsApp para solicitar o contato.',
      });
      return;
    }

    const subject = 'Solicitação de contato comercial - Bambu Lab P2S | PRISM 3D';
    const body = [
      'Nova solicitação de contato:',
      '',
      `Nome: ${form.name || '-'}`,
      `Empresa: ${form.company || '-'}`,
      `WhatsApp/Telefone: ${form.phone || '-'}`,
      `E-mail: ${form.email || '-'}`,
      '',
      'Necessidade:',
      form.message || '-',
    ].join('\n');

    trackEvent('contact_request_submit', {
      source: 'cta_contact_area',
      name: form.name.trim(),
      company: form.company.trim() || '',
      phone: form.phone.trim(),
      email: form.email.trim() || '',
    });

    window.location.href = `mailto:comercial@prism3d.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFeedback({
      type: 'success',
      message: 'Solicitação preparada. Se o e-mail não abrir automaticamente, envie para comercial@prism3d.com.br.',
    });
    setForm(INITIAL_FORM);
  };

  return (
    <section className="cta section-flow section-reveal" ref={sectionRef} id="cta">
      <div className="cta-inner section-parallax">
        <p className="contact-eyebrow">Solicite contato comercial</p>
        <h2 className="contact-title">
          Fale com um especialista <span className="contact-brand">prism<span>3d</span></span>
        </h2>
        <p className="contact-subtitle">
          Preencha os dados abaixo e nossa equipe entra em contato para orientar configuração, prazo e viabilidade técnica.
        </p>

        <form className="contact-form-shell" onSubmit={handleSubmit}>
          <div className="contact-grid">
            <label className="contact-field">
              <span>Nome *</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                placeholder="Seu nome"
                required
              />
            </label>

            <label className="contact-field">
              <span>Empresa</span>
              <input
                type="text"
                value={form.company}
                onChange={(event) => handleChange('company', event.target.value)}
                placeholder="Nome da empresa"
              />
            </label>

            <label className="contact-field">
              <span>WhatsApp / Telefone *</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </label>

            <label className="contact-field">
              <span>E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="voce@empresa.com"
              />
            </label>
          </div>

          <label className="contact-field contact-field--full">
            <span>Necessidade</span>
            <textarea
              value={form.message}
              onChange={(event) => handleChange('message', event.target.value)}
              placeholder="Descreva o que você precisa (produto, volume, prazo, aplicação)."
            />
          </label>

          <div className="contact-actions">
            <button className="cta-button" type="submit">
              Solicitar contato
            </button>
            <a className="contact-mail-link" href="mailto:comercial@prism3d.com.br">
              comercial@prism3d.com.br
            </a>
          </div>

          {feedback ? (
            <p className={`contact-feedback contact-feedback--${feedback.type}`}>{feedback.message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
