import { useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';

type MidiaVideo = {
  brand: string;
  title: string;
  url: string;
};

const MIDIA_VIDEOS: MidiaVideo[] = [
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 01', url: 'https://www.youtube.com/shorts/szuWZm312Fo' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 02', url: 'https://www.youtube.com/shorts/7AZ8QwfWYFI' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 03', url: 'https://www.youtube.com/shorts/azmf2KIyI_Y' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 04', url: 'https://www.youtube.com/shorts/7FfuVTRjFqI' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 05', url: 'https://www.youtube.com/shorts/vF3elzb7im4' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 06', url: 'https://www.youtube.com/shorts/kj3QS5y3dzQ' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 07', url: 'https://www.youtube.com/shorts/8Gyf_C31wFE' },
  { brand: 'Bambu Lab', title: 'Bambu Lab Short 08', url: 'https://www.youtube.com/shorts/8PBI7pquarI' },
  { brand: 'Creality', title: 'Creality Short 01', url: 'https://www.youtube.com/shorts/b6jU8tehLgc' },
  { brand: 'Creality', title: 'Creality Short 02', url: 'https://www.youtube.com/shorts/441KT57utAA' },
  { brand: 'Creality', title: 'Creality Short 03', url: 'https://www.youtube.com/shorts/g7IaQRgK3cI' },
  { brand: 'Creality', title: 'Creality Short 04', url: 'https://www.youtube.com/shorts/mhUBEhBPNtI' },
  { brand: 'Creality', title: 'Creality Short 05', url: 'https://www.youtube.com/shorts/HYNZlWwkgho' },
  { brand: 'Creality', title: 'Creality Short 06', url: 'https://www.youtube.com/shorts/fjp4iZ87e84' },
  { brand: 'Creality', title: 'Creality Short 07', url: 'https://www.youtube.com/shorts/bvdUJyQfMNI' },
  { brand: 'Creality', title: 'Creality Short 08', url: 'https://www.youtube.com/shorts/yk_h1eP9de0' },
  { brand: 'Anycubic', title: 'Anycubic Short 01', url: 'https://www.youtube.com/shorts/PTVa0fugLX4' },
  { brand: 'Anycubic', title: 'Anycubic Short 02', url: 'https://www.youtube.com/shorts/1p5OfgOp0SY' },
  { brand: 'Anycubic', title: 'Anycubic Short 03', url: 'https://www.youtube.com/shorts/lm9psj9ZZTE' },
  { brand: 'Anycubic', title: 'Anycubic Short 04', url: 'https://www.youtube.com/shorts/VDpMd_i3Yxc' },
  { brand: 'Anycubic', title: 'Anycubic Short 05', url: 'https://www.youtube.com/shorts/sW-p69GHutw' },
  { brand: 'Anycubic', title: 'Anycubic Short 06', url: 'https://www.youtube.com/shorts/jDxCceZFKMU' },
  { brand: 'Anycubic', title: 'Anycubic Short 07', url: 'https://www.youtube.com/shorts/8KUbVi7SrcI' },
  { brand: 'Anycubic', title: 'Anycubic Short 08', url: 'https://www.youtube.com/shorts/9c9QEmyjmBA' },
  { brand: 'FlashForge', title: 'FlashForge Short 01', url: 'https://www.youtube.com/shorts/Em86m-iCIE0' },
  { brand: 'FlashForge', title: 'FlashForge Short 02', url: 'https://www.youtube.com/shorts/06IH6n_8Q0E' },
  { brand: 'FlashForge', title: 'FlashForge Short 03', url: 'https://www.youtube.com/shorts/vLeFNZh-u6s' },
  { brand: 'FlashForge', title: 'FlashForge Short 04', url: 'https://www.youtube.com/shorts/BpeUB0BGQ8Q' },
  { brand: 'FlashForge', title: 'FlashForge Short 05', url: 'https://www.youtube.com/shorts/tf5RIZFy6UE' },
  { brand: 'FlashForge', title: 'FlashForge Short 06', url: 'https://www.youtube.com/shorts/f_9FTNrB0bI' },
  { brand: 'FlashForge', title: 'FlashForge Short 07', url: 'https://www.youtube.com/shorts/J01D0Vvo_kQ' },
  { brand: 'FlashForge', title: 'FlashForge Short 08', url: 'https://www.youtube.com/shorts/RgsYBBgoVeQ' },
  { brand: 'CreatBot', title: 'CreatBot Short 01', url: 'https://www.youtube.com/shorts/NjX4UAXtTAw' },
  { brand: 'CreatBot', title: 'CreatBot Short 02', url: 'https://www.youtube.com/shorts/9tF5EM4mlE0' },
];

function getYouTubeVideoId(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '').trim();
    }

    if (parsed.pathname.startsWith('/shorts/')) {
      return parsed.pathname.split('/shorts/')[1]?.split('/')[0] ?? '';
    }

    return parsed.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

export default function MidiasPage() {
  const brands = useMemo(() => ['Todos', ...new Set(MIDIA_VIDEOS.map((item) => item.brand))], []);
  const [activeBrand, setActiveBrand] = useState<string>('Todos');

  const videos = useMemo(
    () => (activeBrand === 'Todos' ? MIDIA_VIDEOS : MIDIA_VIDEOS.filter((item) => item.brand === activeBrand)),
    [activeBrand]
  );

  return (
    <section className="media-hub section-flow section-reveal" id="midias">
      <div className="media-hub-container">
        <header className="media-hub-header">
          <span className="catalog-badge">MÍDIAS PRISM 3D</span>
          <h1>Shorts por marca para acelerar apresentação comercial.</h1>
          <p>Filtre por marca e assista aos vídeos curtos direto na página.</p>
        </header>

        <div className="media-brand-filters" role="tablist" aria-label="Filtro de marcas">
          {brands.map((brand) => {
            const isActive = brand === activeBrand;
            return (
              <button
                key={brand}
                type="button"
                className={`catalog-filter-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveBrand(brand);
                  trackEvent('media_filter_click', {
                    brand,
                  });
                }}
                role="tab"
                aria-selected={isActive}
              >
                {brand}
              </button>
            );
          })}
        </div>

        <div className="media-grid">
          {videos.map((video) => {
            const videoId = getYouTubeVideoId(video.url);
            const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

            return (
              <article className="media-card" key={video.url}>
                <div className="media-frame-wrap">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <span className="media-card-brand">{video.brand}</span>
                <h2>{video.title}</h2>
                <a
                  className="catalog-card-cta"
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('media_video_open', {
                      brand: video.brand,
                      title: video.title,
                      destination: video.url,
                    });
                  }}
                >
                  Ver no YouTube
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
