import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SCRUB_FPS = 24;
const PHASE_VIDEO_END = 0.86;
const PHASE_FINAL_START = 0.86;
const PHASE_FINAL_END = 0.98;
const MEDIA_BASE_Y = 24;
const MEDIA_SCROLL_RANGE = -48;

const GEAR_POINTS = [
  'Aceleração de até 30.000 mm/s² com controle de movimento para manter precisão em altas velocidades.',
  'Hotend de alta vazão (até 40 mm³/s) para reduzir tempo de ciclo em protótipos e lotes curtos.',
  'Conjunto térmico completo: hotend até 350 °C, mesa até 120 °C e câmara aquecida até 60 °C.',
];

export default function GearMastery() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finalImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const lastScrubFrameRef = useRef<number>(-1);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const seekRafIdRef = useRef<number | null>(null);

  const lerp = (from: number, to: number, t: number) =>
    from + (to - from) * Math.max(0, Math.min(1, t));

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.gear-media-bg', { x: 24, opacity: 0, scale: 0.99, duration: 0.85 }, 0);
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const finalImg = finalImgRef.current;
    if (!section || !video || !finalImg) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let st: ScrollTrigger | null = null;

    const flushPendingSeek = () => {
      if (video.seeking) return;
      const targetTime = pendingSeekTimeRef.current;
      if (targetTime == null) return;
      pendingSeekTimeRef.current = null;
      if (Math.abs(video.currentTime - targetTime) > 1 / (SCRUB_FPS * 2)) {
        video.currentTime = targetTime;
      }
    };

    const scheduleSeek = () => {
      if (seekRafIdRef.current !== null) return;
      seekRafIdRef.current = requestAnimationFrame(() => {
        seekRafIdRef.current = null;
        flushPendingSeek();
        if (pendingSeekTimeRef.current != null) scheduleSeek();
      });
    };

    const updateMotion = (progress: number) => {
      const mediaEl = mediaRef.current;
      if (mediaEl) {
        const y = Math.round(MEDIA_BASE_Y + progress * MEDIA_SCROLL_RANGE);
        mediaEl.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const updateVisuals = (progress: number) => {
      const fadeProgress = (progress - PHASE_FINAL_START) / (PHASE_FINAL_END - PHASE_FINAL_START);

      if (progress <= PHASE_FINAL_START) {
        video.style.opacity = '1';
        finalImg.style.opacity = '0';
        return;
      }

      if (progress <= PHASE_FINAL_END) {
        video.style.opacity = String(lerp(1, 0, fadeProgress));
        finalImg.style.opacity = String(lerp(0, 1, fadeProgress));
        return;
      }

      video.style.opacity = '0';
      finalImg.style.opacity = '1';
    };

    const initScrollScrub = () => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur) || dur === 0) return false;
      video.currentTime = 0;
      lastScrubFrameRef.current = -1;
      pendingSeekTimeRef.current = 0;

      const totalScrollPx = isMobile
        ? Math.max(dur * 210 + 860, 1450)
        : dur * 450 + 1600;

      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScrollPx}`,
        pin: true,
        anticipatePin: isMobile ? 0 : 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const videoProgress = Math.min(progress / PHASE_VIDEO_END, 1);
          const targetTime = videoProgress * dur;
          const targetFrame = Math.round(targetTime * SCRUB_FPS);

          if (targetFrame !== lastScrubFrameRef.current) {
            pendingSeekTimeRef.current = Math.min(dur, targetFrame / SCRUB_FPS);
            lastScrubFrameRef.current = targetFrame;
          }

          scheduleSeek();
          updateVisuals(progress);
          updateMotion(progress);
        },
      });

      return true;
    };

    let attempts = 0;
    const poll = setInterval(() => {
      attempts += 1;
      if (initScrollScrub() || attempts >= 100) clearInterval(poll);
    }, 100);

    const onMeta = () => {
      clearInterval(poll);
      if (!st) initScrollScrub();
    };

    const onSeeked = () => {
      flushPendingSeek();
      if (pendingSeekTimeRef.current != null) scheduleSeek();
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);

    return () => {
      clearInterval(poll);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      if (seekRafIdRef.current !== null) {
        cancelAnimationFrame(seekRafIdRef.current);
        seekRafIdRef.current = null;
      }
      if (st) st.kill();
    };
  }, []);

  return (
    <section className="gear-section section-flow" ref={sectionRef} id="engrenagens">
      <div className="gear-media-bg" ref={mediaRef}>
        <video
          ref={videoRef}
          className="gear-media"
          src="/maquina-scrub-max-fluid.mp4"
          muted
          playsInline
          preload="metadata"
        />
        <img
          ref={finalImgRef}
          className="gear-media gear-final-layer"
          src="/final%20maquina.webp"
          alt="Peça final da máquina após a montagem"
          style={{ opacity: 0 }}
        />
      </div>

      <div className="gear-inner">
        <div className="gear-content" ref={textRef}>
          <span className="gear-badge">ARQUITETURA P2S DE ALTA PERFORMANCE</span>
          <h2>Precisão dinâmica para peças técnicas em alta velocidade.</h2>
          <p className="gear-subtitle">
            A Bambu Lab P2S integra cinemática CoreXY, controle térmico avançado e extrusão de alto fluxo para operar com consistência em aplicações profissionais.
          </p>
          <ul className="gear-points">
            {GEAR_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

