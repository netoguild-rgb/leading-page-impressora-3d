import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type CreativeSlide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
};

const CREATIVE_SLIDES: CreativeSlide[] = [
  {
    id: 'p2s-platform',
    badge: 'BAMBU LAB P2S + AMS 2 PRO',
    title: 'Plataforma multicolor para produção profissional.',
    description:
      'Setup completo para protótipos funcionais, peças finais e lotes curtos com troca automática de filamentos.',
    image: '/P2S-2.png',
  },
  {
    id: 'p2s-extrusion',
    badge: 'EXTRUSÃO DE ALTA VAZÃO',
    title: 'Fluxo otimizado para reduzir tempo por peça.',
    description:
      'Com vazão de até 40 mm³/s e controle fino de alimentação, a P2S acelera ciclos sem sacrificar acabamento.',
    image: '/P2S-1.png',
  },
  {
    id: 'p2s-hotend',
    badge: 'CABEÇOTE DE IMPRESSÃO',
    title: 'Estabilidade mecânica em altas acelerações.',
    description:
      'Arquitetura projetada para trajetórias rápidas e repetibilidade dimensional em geometrias técnicas.',
    image: '/P2S-3.png',
  },
  {
    id: 'p2s-ams-drive',
    badge: 'AMS 2 PRO',
    title: 'Mecanismo ativo para troca de material confiável.',
    description:
      'Sistema de alimentação contínuo para execução de trabalhos multicolor com previsibilidade.',
    image: '/P2S-4.png',
  },
  {
    id: 'p2s-ams-front',
    badge: 'GESTÃO DE FILAMENTOS',
    title: 'Base pronta para expansão multicolor.',
    description:
      'O conjunto AMS 2 Pro oferece operação organizada e suporte a estratégias de material por aplicação.',
    image: '/P2S-5.png',
  },
  {
    id: 'p2s-interface',
    badge: 'OPERAÇÃO ASSISTIDA',
    title: 'Interface lateral para ajuste rápido em produção.',
    description:
      'Controle local e integração com ecossistema Bambu para monitorar jobs, filas e status da operação.',
    image: '/P2S-6.png',
  },
];

const PRELOAD_SLIDES_COUNT = 2;

export default function CreativeApplications() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const lastChangeAtRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];
    CREATIVE_SLIDES.slice(0, PRELOAD_SLIDES_COUNT).forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      preloaded.push(img);
    });

    return () => {
      preloaded.forEach((img) => {
        img.src = '';
      });
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number | null = null;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxIndex = CREATIVE_SLIDES.length - 1;
    const forwardThreshold = isMobile ? 0.58 : 0.64;
    const backwardThreshold = isMobile ? 0.58 : 0.64;
    const minStepIntervalMs = isMobile ? 300 : 260;

    const updateByScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = Math.max(section.offsetHeight - viewport, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const currentIndex = activeIndexRef.current;
      const rawStep = progress * maxIndex;
      let nextIndex = currentIndex;
      const now = performance.now();

      if (rawStep > currentIndex + forwardThreshold) {
        nextIndex = Math.min(maxIndex, currentIndex + 1);
      } else if (rawStep < currentIndex - backwardThreshold) {
        nextIndex = Math.max(0, currentIndex - 1);
      }

      if (nextIndex !== currentIndex && now - lastChangeAtRef.current < minStepIntervalMs) return;

      if (nextIndex === currentIndex) return;
      activeIndexRef.current = nextIndex;
      lastChangeAtRef.current = now;
      setActiveIndex(nextIndex);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateByScroll();
      });
    };

    updateByScroll();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const sectionStyle = { '--creative-steps': CREATIVE_SLIDES.length - 1 } as CSSProperties;
  const isSecondSlideActive = CREATIVE_SLIDES[activeIndex]?.id === 'p2s-extrusion';

  return (
    <section className="creative-section section-flow" ref={sectionRef} id="aplicacoes" style={sectionStyle}>
      <div className="creative-sticky">
        <div className="creative-inner">
          <div className="creative-copy-stage">
            {CREATIVE_SLIDES.map((slide, index) => (
              <div
                className={`creative-copy ${index === activeIndex ? 'is-active' : ''}`}
                key={slide.id}
                aria-hidden={index !== activeIndex}
              >
                <div className="creative-brand" aria-hidden="true">prism<span>3d</span></div>
                <span className="creative-badge">{slide.badge}</span>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            ))}
          </div>

          <div className={`creative-media-stage ${isSecondSlideActive ? 'is-second-active' : ''}`}>
            {CREATIVE_SLIDES.map((slide, index) => (
              <img
                key={slide.id}
                className={`creative-media creative-media--${slide.id} ${index === activeIndex ? 'is-active' : ''}`}
                src={slide.image}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
