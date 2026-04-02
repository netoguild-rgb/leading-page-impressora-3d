import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { trackEvent } from '../lib/analytics';
import { toSitePath } from '../lib/sitePath';

gsap.registerPlugin(ScrollTrigger);

const COSTS = [
  { id: 'speed', icon: '\u26A1', label: 'Velocidade', subValue: 'M\u00E1x. nominal', maxNum: 1000, decimals: 0, unit: ' mm/s', prefix: '' },
  { id: 'acceleration', icon: '\u{1F680}', label: 'Acelera\u00E7\u00E3o', subValue: null, maxNum: 30000, decimals: 0, unit: ' mm/s\u00B2', prefix: '' },
  { id: 'chamber', icon: '\u{1F321}\uFE0F', label: 'C\u00E2mara', subValue: null, maxNum: 60, decimals: 0, unit: ' \u00B0C', prefix: '' },
  { id: 'flow', icon: '\u{1F9EA}', label: 'Vaz\u00E3o', subValue: null, maxNum: 40, decimals: 0, unit: ' mm\u00B3/s', prefix: '' },
];

/*  Scroll timeline breakdown (0 -> 1 overall progress):
 *  0.00 - 0.55  -> video scrub (frame 0 -> last frame)
 *  0.55 - 0.70  -> video fades out, raw robot fades in
 *  0.70 - 0.85  -> raw robot fades out, colored robot fades in
 *  0.85 - 1.00  -> colored robot stays (final state)
 */
const PHASE_VIDEO_END   = 0.55;
const PHASE_RAW_START   = 0.55;
const PHASE_RAW_END     = 0.70;
const PHASE_COLOR_START = 0.70;
const PHASE_COLOR_END   = 0.85;
const SCRUB_FPS         = 24;
const FALLBACK_VIDEO_SECONDS = 8;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const rawImgRef  = useRef<HTMLImageElement>(null);
  const colorImgRef = useRef<HTMLImageElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const lastScrubFrameRef = useRef<number>(-1);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const seekRafIdRef = useRef<number | null>(null);
  const lastCostValuesRef = useRef<string[]>([]);

  const fmt = useCallback((val: number, decimals: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  }, []);

  const handleReserveClick = useCallback(() => {
    trackEvent('cta_click', {
      area: 'hero',
      cta: 'solicitar_proposta',
      destination: '/catalogo/produtos/bambu-lab-h2s-ams-combo',
    });
    window.location.href = toSitePath('/catalogo/produtos/bambu-lab-h2s-ams-combo?origem=hero');
  }, []);

  const handleViewSpecsClick = useCallback(() => {
    trackEvent('cta_click', {
      area: 'hero',
      cta: 'ver_especificacoes',
      destination: '#specs',
    });
    window.location.href = '#specs';
  }, []);

  const updateCosts = useCallback((progress: number) => {
    // costs reach max at the end of the video phase
    const costProgress = Math.min(progress / PHASE_VIDEO_END, 1);
    COSTS.forEach((c, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      const val = c.maxNum * costProgress;
      const nextValue = `${c.prefix}${fmt(val, c.decimals)}${c.unit}`;
      if (lastCostValuesRef.current[i] === nextValue) return;
      el.textContent = nextValue;
      lastCostValuesRef.current[i] = nextValue;
    });
  }, [fmt]);

  const updateVisuals = useCallback((progress: number, videoDuration: number) => {
    const video    = videoRef.current;
    const rawImg   = rawImgRef.current;
    const colorImg = colorImgRef.current;
    if (!video || !rawImg || !colorImg) return;

    // Video scrub
    if (Number.isFinite(videoDuration) && videoDuration > 0) {
      const videoProgress = Math.min(progress / PHASE_VIDEO_END, 1);
      const targetTime = videoProgress * videoDuration;
      const targetFrame = Math.round(targetTime * SCRUB_FPS);
      if (targetFrame !== lastScrubFrameRef.current) {
        pendingSeekTimeRef.current = Math.min(videoDuration, targetFrame / SCRUB_FPS);
        lastScrubFrameRef.current = targetFrame;
      }
    } else {
      pendingSeekTimeRef.current = null;
    }

    // Video opacity: fully visible until fade starts
    if (progress <= PHASE_VIDEO_END) {
      video.style.opacity = '1';
    } else {
      const fadeOut = (progress - PHASE_RAW_START) / (PHASE_RAW_END - PHASE_RAW_START);
      video.style.opacity = String(lerp(1, 0, fadeOut));
    }

    // Raw robot: fade in then fade out
    if (progress < PHASE_RAW_START) {
      rawImg.style.opacity = '0';
    } else if (progress <= PHASE_RAW_END) {
      const fadeIn = (progress - PHASE_RAW_START) / (PHASE_RAW_END - PHASE_RAW_START);
      rawImg.style.opacity = String(lerp(0, 1, fadeIn));
    } else if (progress <= PHASE_COLOR_END) {
      const fadeOut = (progress - PHASE_COLOR_START) / (PHASE_COLOR_END - PHASE_COLOR_START);
      rawImg.style.opacity = String(lerp(1, 0, fadeOut));
    } else {
      rawImg.style.opacity = '0';
    }

    // Colored robot: fade in and stay
    if (progress < PHASE_COLOR_START) {
      colorImg.style.opacity = '0';
    } else if (progress <= PHASE_COLOR_END) {
      const fadeIn = (progress - PHASE_COLOR_START) / (PHASE_COLOR_END - PHASE_COLOR_START);
      colorImg.style.opacity = String(lerp(0, 1, fadeIn));
    } else {
      colorImg.style.opacity = '1';
    }
  }, []);

  const resetHeroState = useCallback(() => {
    const video = videoRef.current;
    const rawImg = rawImgRef.current;
    const colorImg = colorImgRef.current;

    if (video) {
      video.style.opacity = '1';
      try {
        video.pause();
      } catch {
        // no-op
      }
      if (video.readyState >= 1) {
        try {
          video.currentTime = 0;
        } catch {
          // no-op
        }
      }
    }

    if (rawImg) rawImg.style.opacity = '0';
    if (colorImg) colorImg.style.opacity = '0';

    lastScrubFrameRef.current = -1;
    pendingSeekTimeRef.current = 0;
    lastCostValuesRef.current = [];
    updateCosts(0);
  }, [updateCosts]);

  // Entrance animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-media-bg', { x: 28, opacity: 0, scale: 0.985, duration: 0.9 }, 0)
        .from('.hero-badge',    { y: 16, opacity: 0, duration: 0.5 })
        .from('.hero h1',       { y: 32, opacity: 0, duration: 0.65 }, '-=0.2')
        .from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.55 }, '-=0.3')
        .from('.hero-actions',  { y: 16, opacity: 0, duration: 0.5  }, '-=0.2')
        .from('.cost-card',     { x: -20, opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.2');
    },
    { scope: heroRef }
  );

  // Scroll-driven timeline
  useEffect(() => {
    const video = videoRef.current;
    const hero  = heroRef.current;
    if (!video || !hero) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let st: ScrollTrigger | null = null;
    resetHeroState();
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
    const onSeeked = () => {
      flushPendingSeek();
      if (pendingSeekTimeRef.current != null) scheduleSeek();
    };

    let usingFallbackDuration = false;
    const initScrollScrub = () => {
      const rawDuration = video.duration;
      const hasRealDuration = Number.isFinite(rawDuration) && rawDuration > 0;
      const effectiveDuration = hasRealDuration ? rawDuration : FALLBACK_VIDEO_SECONDS;
      usingFallbackDuration = !hasRealDuration;
      try {
        video.currentTime = 0;
      } catch {
        // no-op
      }
      lastScrubFrameRef.current = -1;
      pendingSeekTimeRef.current = 0;
      lastCostValuesRef.current = [];

      // Total scroll distance: video portion + extra for image transitions
      const totalScrollPx = isMobile
        ? Math.max(effectiveDuration * 240 + 980, 1700)
        : effectiveDuration * 500 + 2500;

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: () => `+=${totalScrollPx}`,
        pin: true,
        anticipatePin: isMobile ? 0 : 1,
        onUpdate: (self) => {
          updateVisuals(self.progress, hasRealDuration ? effectiveDuration : 0);
          updateCosts(self.progress);
          if (hasRealDuration) scheduleSeek();
        },
      });
      scrollTriggerRef.current = st;
      return true;
    };

    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (initScrollScrub() || attempts >= 100) clearInterval(poll);
    }, 100);

    const onMeta = () => {
      clearInterval(poll);
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      if (!st || usingFallbackDuration) initScrollScrub();
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
      if (scrollTriggerRef.current === st) {
        scrollTriggerRef.current = null;
      }
    };
  }, [resetHeroState, updateCosts, updateVisuals]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      window.scrollTo(0, 0);
      resetHeroState();
      window.setTimeout(() => {
        scrollTriggerRef.current?.refresh();
        ScrollTrigger.refresh();
      }, 60);
    };

    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [resetHeroState]);

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Media layer: video + two robot images stacked */}
      <div className="hero-media-bg">
        <video
          ref={videoRef}
          className="hero-media"
          src={toSitePath('/Steampunk_Robot_D_Printing_Animation_scrub.mp4')}
          muted
          playsInline
          preload="metadata"
        />
        <img
          ref={rawImgRef}
          className="hero-media hero-img-layer"
          src={toSitePath('/robot-raw.webp')}
          alt="Robô impresso sem pintura"
          style={{ opacity: 0 }}
        />
        <img
          ref={colorImgRef}
          className="hero-media hero-img-layer"
          src={toSitePath('/robot-colored.webp')}
          alt="Robô impresso pintado"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Text content */}
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-brand-block">
            <div className="hero-logo" aria-label="prism3d">prism<span>3d</span></div>
            <span className="hero-badge">Bambu Lab P2S + AMS 2 Pro</span>
          </div>
          <h1>Desempenho multicolor para produ&ccedil;&atilde;o profissional.</h1>
          <p className="hero-subtitle">
            A Bambu Lab P2S com AMS 2 Pro entrega at&eacute; 1000 mm/s, acelera&ccedil;&atilde;o de 30.000 mm/s&sup2; e fluxo multicolor para ciclos curtos com qualidade repet&iacute;vel.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" type="button" onClick={handleReserveClick}>Solicitar proposta</button>
            <button className="hero-btn-secondary" type="button" onClick={handleViewSpecsClick}>Ver Especificações</button>
          </div>
        </div>
      </div>

      {/* Cost cards */}
      <div className="hero-costs">
        <div className="cost-card">
          <span className="cost-icon">{COSTS[0].icon}</span>
          <div className="cost-info">
            <span className="cost-label">Velocidade</span>
            <span className="cost-value" ref={(el) => { numRefs.current[0] = el; }}>0 mm/s</span>
            <span className="cost-sub">Máx. nominal</span>
          </div>
        </div>
        <div className="cost-card">
          <span className="cost-icon">{COSTS[1].icon}</span>
          <div className="cost-info">
            <span className="cost-label">Aceleração</span>
            <span className="cost-value" ref={(el) => { numRefs.current[1] = el; }}>0 mm/s²</span>
          </div>
        </div>
        <div className="cost-card">
          <span className="cost-icon">{COSTS[2].icon}</span>
          <div className="cost-info">
            <span className="cost-label">Câmara</span>
            <span className="cost-value" ref={(el) => { numRefs.current[2] = el; }}>0 °C</span>
          </div>
        </div>
        <div className="cost-card cost-card--total">
          <span className="cost-icon">{COSTS[3].icon}</span>
          <div className="cost-info">
            <span className="cost-label">Vazão</span>
            <span className="cost-value" ref={(el) => { numRefs.current[3] = el; }}>0 mm³/s</span>
          </div>
        </div>
      </div>
    </section>
  );
}
