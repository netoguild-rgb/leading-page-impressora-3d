import { useState } from 'react';

type FeatureItem = {
  id: string;
  resource: string;
  headline: string;
  description: string;
  action: string;
  details: string[];
};

const FEATURES: FeatureItem[] = [
  {
    id: 'ams-2-pro',
    resource: 'AMS 2 Pro',
    headline: 'Multicolor de Produ\u00E7\u00E3o',
    description: 'Troca autom\u00E1tica de filamento com foco em continuidade operacional.',
    action: 'Ver fluxo multicolor',
    details: [
      'At\u00E9 24 cores com m\u00F3dulos AMS 2 Pro para composi\u00E7\u00F5es visuais e c\u00F3digos por material.',
      'Secagem ativa e ventila\u00E7\u00E3o de filamento para reduzir varia\u00E7\u00E3o em ciclos longos.',
      'Fluxo de troca automatizado para lotes curtos com menos interven\u00E7\u00E3o manual.',
    ],
  },
  {
    id: 'high-speed',
    resource: 'Cinem\u00E1tica',
    headline: '1000 mm/s + 30.000 mm/s\u00B2',
    description: 'Movimento de alta velocidade para reduzir lead time por pe\u00E7a.',
    action: 'Ver desempenho din\u00E2mico',
    details: [
      'Velocidade m\u00E1xima de 1000 mm/s para deslocamentos e trajet\u00F3rias de produ\u00E7\u00E3o.',
      'Acelera\u00E7\u00E3o de at\u00E9 30.000 mm/s\u00B2 para ganhos reais em geometrias com muitos segmentos.',
      'Arquitetura focada em repetibilidade mesmo sob ciclos mais agressivos.',
    ],
  },
  {
    id: 'thermal-control',
    resource: 'Gest\u00E3o T\u00E9rmica',
    headline: '350\u00B0C + 120\u00B0C + 60\u00B0C',
    description: 'Conjunto t\u00E9rmico para materiais de engenharia e pe\u00E7as funcionais.',
    action: 'Ver envelope t\u00E9rmico',
    details: [
      'Hotend at\u00E9 350 \u00B0C para ampliar compatibilidade com filamentos t\u00E9cnicos.',
      'Mesa aquecida at\u00E9 120 \u00B0C para melhor ader\u00EAncia e menor risco de empenamento.',
      'C\u00E2mara aquecida at\u00E9 60 \u00B0C para maior estabilidade de processo.',
    ],
  },
  {
    id: 'ecosystem',
    resource: 'Ecossistema Bambu',
    headline: 'Studio, App e OTA',
    description: 'Gest\u00E3o de filas, monitoramento e atualiza\u00E7\u00F5es com fluxo integrado.',
    action: 'Ver recursos de opera\u00E7\u00E3o',
    details: [
      'Integra\u00E7\u00E3o com Bambu Studio para prepara\u00E7\u00E3o, fila e envio de jobs.',
      'Acompanhamento por aplicativo para status, progresso e controle remoto da impress\u00E3o.',
      'Atualiza\u00E7\u00F5es OTA e wiki oficial para manter padroniza\u00E7\u00E3o operacional.',
    ],
  },
];

export default function Features() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="features section-flow section-reveal" id="features">
      <div className="features-container section-parallax">
        <div className="features-header">
          <h2>Tecnologia da Plataforma P2S</h2>
          <p>Clique em cada recurso para abrir o detalhe t&eacute;cnico da opera&ccedil;&atilde;o.</p>
        </div>

        <div className="features-list">
          {FEATURES.map((feature) => {
            const isActive = feature.id === activeId;
            const detailId = `feature-detail-${feature.id}`;

            return (
              <article className={`feature-item ${isActive ? 'is-active' : ''}`} key={feature.id}>
                <div className="feature-item-head">
                  <h3 className="feature-resource">{feature.resource}</h3>
                  <p className="feature-copy">
                    <strong>{feature.headline}:</strong> {feature.description}
                  </p>
                  <button
                    className="features-action-btn"
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={detailId}
                    onClick={() => {
                      setActiveId((prev) => (prev === feature.id ? null : feature.id));
                    }}
                  >
                    {isActive ? 'Recolher detalhes' : feature.action}
                  </button>
                </div>

                <div
                  id={detailId}
                  className={`feature-detail ${isActive ? 'is-open' : ''}`}
                  aria-hidden={!isActive}
                >
                  <ul>
                    {feature.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
