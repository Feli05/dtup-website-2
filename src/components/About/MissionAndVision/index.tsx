"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MISSION_VISION } from "./constants";

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const underline = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, originX: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MissionAndVision() {
  // separate in-view hooks so each title underlines when visible
  const [visRef, visInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [misRef, misInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="flex flex-col space-y-16 md:space-y-24 max-w-6xl mx-auto mb-10 md:mb-20">

      {/* VISION */}
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16"
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <div className="w-full md:w-1/2">
          <p className="text-black font-playfair text-base md:text-lg leading-relaxed">
            {MISSION_VISION.vision.description}
          </p>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <div ref={visRef} className="inline-block relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-black">
              {MISSION_VISION.vision.title}
            </h2>
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
              variants={underline}
              initial="hidden"
              animate={visInView ? "visible" : "hidden"}
            />
          </div>
        </div>
      </motion.div>

      {/* MISSION */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <div className="w-full md:w-1/2 text-center">
          <div ref={misRef} className="inline-block relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-black">
              {MISSION_VISION.mission.title}
            </h2>
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
              variants={underline}
              initial="hidden"
              animate={misInView ? "visible" : "hidden"}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-black font-playfair text-base md:text-lg leading-relaxed">
            {MISSION_VISION.mission.description}
          </p>
        </div>
      </motion.div>
    </div>
  );  
}