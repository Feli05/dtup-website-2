interface WaveSeparator2Props {
  fillColor: string;
  className?: string;
}

export default function WaveSeparator2({ fillColor, className = "" }: WaveSeparator2Props) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-full h-20"
        style={{ fill: fillColor }}
      >
        <path d="M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,48C672,32,768,32,864,48C960,64,1056,96,1152,101.3C1200,107,1200,107,1200,107L1200,160L0,160Z" />
      </svg>
    </div>
  );
} 