import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { icon: '\u26A1', value: '1000 mm/s', label: 'Velocidade máxima', key: true },
  { icon: '\u{1F680}', value: '30.000 mm/s\u00B2', label: 'Aceleração máxima', key: true },
  { icon: '\u{1F4E6}', value: '260 x 260 x 260 mm', label: 'Volume de impressão', key: true },
  { icon: '\u{1F321}\uFE0F', value: '350 \u00B0C', label: 'Hotend máximo' },
  { icon: '\u{1F525}', value: '120 \u00B0C', label: 'Mesa aquecida máxima' },
  { icon: '\u{1F9EA}', value: '40 mm\u00B3/s', label: 'Vazão máxima do hotend' },
  { icon: '\u{1F9CA}', value: '60 \u00B0C', label: 'Câmara aquecida máxima' },
  { icon: '\u{1F3A8}', value: 'Até 24 cores', label: 'Expansão com AMS 2 Pro' },
  { icon: '\u{1F5A5}\uFE0F', value: '5"', label: 'Tela touch integrada' },
  { icon: '\u{1F9E0}', value: 'IA ativa', label: 'Detecção de falhas de impressão' },
  { icon: '\u{1F4CF}', value: 'Auto', label: 'Calibração dinâmica de fluxo' },
  { icon: '\u{1F32C}\uFE0F', value: 'Cold-Air', label: 'Refrigeração com ar frio externo' },
  { icon: '\u{1F4A8}', value: 'Venting ativo', label: 'Secagem de filamento no AMS 2 Pro' },
  { icon: '\u2699\uFE0F', value: '20 kHz', label: 'Extrusora DynaSense PMSM' },
];

export default function Specs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.spec-item');
    items.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: i * 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="specs section-flow section-reveal" ref={sectionRef} id="specs">
      <div className="specs-container section-parallax">
        <div className="section-header">
          <h2>Especifica&ccedil;&otilde;es t&eacute;cnicas</h2>
        </div>
        <div className="specs-grid">
          {SPECS.map((s) => (
            <div className={`spec-item${s.key ? ' spec-item--key' : ''}`} key={s.label}>
              <span className="spec-icon">{s.icon}</span>
              <span className="spec-value">{s.value}</span>
              <span className="spec-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
