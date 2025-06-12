import { memo } from "react";
import { MISSION_VISION } from "./constants";

const MissionAndVision = memo(function MissionAndVision() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 max-w-6xl mx-auto mb-10 md:mb-20">

      {/* VISION */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2">
          <p className="text-black font-playfair text-base md:text-lg leading-relaxed">
            {MISSION_VISION.vision.description}
          </p>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-black">
            {MISSION_VISION.vision.title}
          </h2>
        </div>
      </div>

      {/* MISSION */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-black">
            {MISSION_VISION.mission.title}
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-black font-playfair text-base md:text-lg leading-relaxed">
            {MISSION_VISION.mission.description}
          </p>
        </div>
      </div>
    </div>
  );  
});

export default MissionAndVision;