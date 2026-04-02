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
              <h3>Fabricação<br />de Precisão</h3>
              <p>Tecnologia de extrusão industrial para resultados profissionais.</p>
            </div>
          </div>
        </div>

        {/* Center card — Logitech-style: image on top, text below */}
        <div className="highlight-card highlight-card--center">
          <img
            src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80"
            alt="Impressora 3D"
            style={{ minHeight: 480 }}
          />
          <div className="highlight-overlay">
            <div className="highlight-text-block" style={{ color: '#fff' }}>
              <h3>Imprima<br />com o PRISM</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                Adicione capacidade profissional ao seu estúdio com o
                PRISM 3D — precisão e acabamento de nível industrial.
              </p>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="highlight-card highlight-card--side">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
            alt="Profissional usando impressora 3D"
          />
          <div className="highlight-overlay">
            <div className="highlight-text-block">
              <h3>Qualidade<br />Profissional</h3>
              <p>Mais de 6 materiais suportados, do PLA ao Nylon reforçado.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
