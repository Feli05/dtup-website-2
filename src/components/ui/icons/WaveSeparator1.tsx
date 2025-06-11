interface WaveSeparator1Props {
  fillColor: string;
  className?: string;
}

export default function WaveSeparator1({ fillColor, className = "" }: WaveSeparator1Props) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-full h-20"
        style={{ fill: fillColor }}
      >
        <path d="M0,96L48,85.3C96,75,192,53,288,58.7C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,58.7C1200,53,1200,53,1200,53L1200,160L0,160Z" />
      </svg>
    </div>
  );
} 