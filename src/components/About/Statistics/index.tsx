"use client";

import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animate } from "framer-motion";
import { STATISTICS } from "./constants";
import type { StatisticsData } from "./types";

/**
 * Animates a number from 95%→100% of its final value when the element scrolls into view.
 */
function AnimatedNumber({
  value,
  duration = 0.5,
}: {
  value: number;
  duration?: number;
}) {
  const el = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView && el.current) {
      const start = value * 0.95;
      const controls = animate(start, value, {
        duration,
        ease: "easeOut",
        onUpdate(n) {
          if (el.current) {
            el.current.textContent = Math.round(n).toLocaleString("en-US");
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  return (
    <span
      ref={(node) => {
        el.current = node as HTMLSpanElement;
        ref(node);
      }}
    >
      {Math.round(value * 0.95).toLocaleString("en-US")}
    </span>
  );
}

export default function Statistics() {
  const stats: StatisticsData = STATISTICS;

  return (
    <section id="statistics" className="relative min-h-screen about-section">
      <div className="container mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center py-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-white mb-8 sm:mb-16 text-center">
          Estadísticas
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-16 sm:mb-0">
          {/* Members Card */}
          <div className="border border-white rounded-lg p-4 sm:p-8 aspect-square flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <h3 className="text-5xl sm:text-7xl md:text-8xl font-bold font-markazi text-white mb-2 sm:mb-4">
                <AnimatedNumber value={stats.totalMembers} />+
              </h3>
              <p className="text-lg sm:text-xl text-white font-playfair">
                Miembros en total
              </p>
            </div>
          </div>

          {/* Demographics Card */}
          <div className="border border-white rounded-lg p-4 sm:p-8 aspect-square flex flex-col justify-center hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between mb-8 sm:mb-12">
              <div className="text-center">
                <div className="text-3xl sm:text-5xl md:text-6xl font-bold font-markazi text-white mb-2 sm:mb-4">
                  <AnimatedNumber value={stats.demographics.women} />%
                </div>
                <div className="text-base sm:text-lg text-white font-playfair">
                  Mujeres
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl md:text-6xl font-bold font-markazi text-white mb-2 sm:mb-4">
                  <AnimatedNumber value={stats.demographics.men} />%
                </div>
                <div className="text-base sm:text-lg text-white font-playfair">
                  Hombres
                </div>
              </div>
            </div>
            <div className="text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4 font-playfair">
                    Edades:
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-base sm:text-lg font-playfair">
                    <li>
                      18 - 34:{" "}
                      <span className="font-markazi">
                        <AnimatedNumber value={stats.ageGroups.young} />
                      </span>
                      %
                    </li>
                    <li>
                      35 - 54:{" "}
                      <span className="font-markazi">
                        <AnimatedNumber value={stats.ageGroups.middle} />
                      </span>
                      %
                    </li>
                    <li>
                      55 - 65+:{" "}
                      <span className="font-markazi">
                        <AnimatedNumber value={stats.ageGroups.older} />
                      </span>
                      %
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4 font-playfair">
                    Principales países:
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-base sm:text-lg font-playfair">
                    {stats.countries.map((country, idx) => (
                      <li key={idx}>
                        {country.rank}. {country.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="border border-white rounded-lg p-4 sm:p-8 aspect-square flex flex-col justify-center hover:scale-105 transition-transform duration-300">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-markazi text-white mb-2 sm:mb-3">
                  +<AnimatedNumber value={stats.engagement.publications} />
                </h3>
                <p className="text-base sm:text-xl text-white font-playfair">
                  Publicaciones aprobadas al mes
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 font-playfair">
                  Gracias a los filtros, se mantiene un ambiente positivo y controlado.
                </p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-markazi text-white mb-2 sm:mb-3">
                  +<AnimatedNumber value={stats.engagement.comments} />
                </h3>
                <p className="text-base sm:text-xl text-white font-playfair">
                  Comentarios al mes
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 font-playfair">
                  Una comunidad altamente participativa que es consciente de las
                  reglas del grupo.
                </p>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="border border-white rounded-lg p-4 sm:p-8 aspect-square flex flex-col justify-center hover:scale-105 transition-transform duration-300">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-markazi text-white mb-2 sm:mb-3">
                  +<AnimatedNumber value={stats.activity.activeMembers} />
                </h3>
                <p className="text-base sm:text-xl text-white font-playfair">
                  Miembros activos al mes
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 font-playfair">
                  Cantidad de miembros que ven, publican e interactúan con el
                  contenido.
                </p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-markazi text-white mb-2 sm:mb-3">
                  +<AnimatedNumber value={stats.activity.reactions} />
                </h3>
                <p className="text-base sm:text-xl text-white font-playfair">
                  Reacciones al mes
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 font-playfair">
                  En donde se incluyen reacciones tanto a publicaciones como a
                  comentarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}