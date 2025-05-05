"use client";

import { useEffect } from "react";

type SectionBg = { id: string; color: string };

/**
 * Observe each section by ID, and whenever it crosses the threshold,
 * update document.body.style.backgroundColor accordingly.
 */
export default function useSectionBackground(sections: SectionBg[]) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cfg = sections.find((s) => s.id === entry.target.id);
            if (cfg) document.body.style.backgroundColor = cfg.color;
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      obs.disconnect();
      document.body.style.backgroundColor = "";
    };
  }, [sections]);
}
