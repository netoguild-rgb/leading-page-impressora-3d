import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.highlight-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="highlights" ref={sectionRef}>
      <div className="highlights-track">

        {/* Left card — image with dark overlay text */}
        <div className="highlight-card highlight-card--side">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 420, display: 'block' }}
            src="/video-fabricacao.mp4"
          />
          <div className="highlight-overlay">
            <div className="highlight-text-block">
              <span className="highlight-badge">PRODUÇÃO</span>
              <h3>Fabricação<br />de Precisão</h3>
              <p>Tecnologia de extrusão industrial para resultados profissionais.</p>
            </div>
          </div>
        </div>

        {/* Center card */}
        <div className="highlight-card highlight-card--center">
          <img
            src="/P2S-2.png"
            alt="Bambu Lab P2S com AMS 2 Pro"
            style={{ minHeight: 480 }}
          />
          <div className="highlight-overlay highlight-overlay--center">
            <div className="highlight-text-block highlight-text-block--light">
              <span className="highlight-badge">BAMBU LAB P2S</span>
              <h3>Imprima<br />com o PRISM</h3>
              <p>Capacidade multicolor profissional com velocidade de até 1000 mm/s.</p>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="highlight-card highlight-card--side">
          <img
            src="/robot-colored.webp"
            alt="Peça impressa em 3D pintada"
          />
          <div className="highlight-overlay">
            <div className="highlight-text-block">
              <span className="highlight-badge">RESULTADO FINAL</span>
              <h3>Qualidade<br />Profissional</h3>
              <p>Do PLA ao Nylon reforçado — 6+ materiais para cada aplicação.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
