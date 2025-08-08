import React, { useEffect, useMemo, useState } from "react";

interface HeartConfettiProps {
  burstId: number;
}

const HEARTS = Array.from({ length: 18 });

export const HeartConfetti: React.FC<HeartConfettiProps> = ({ burstId }) => {
  const [seeds, setSeeds] = useState<number[]>([]);

  useEffect(() => {
    // generate new random seeds every burst
    setSeeds(HEARTS.map(() => Math.random()));
  }, [burstId]);

  const items = useMemo(
    () =>
      seeds.map((seed, i) => {
        const left = Math.floor(seed * 100);
        const delay = (seed * 300) % 300; // ms
        const size = 18 + Math.floor(seed * 18);
        const hue = 330 + Math.floor(seed * 20);
        return (
          <span
            key={`${burstId}-${i}`}
            className="pointer-events-none absolute select-none animate-float-up"
            style={{
              left: `${left}%`,
              bottom: 0,
              animationDelay: `${delay}ms`,
              filter: "drop-shadow(0 4px 8px hsl(var(--love-glow)/0.4))",
              color: `hsl(${hue} 80% 66%)`,
              fontSize: `${size}px`,
            }}
            aria-hidden="true"
          >
            ❤
          </span>
        );
      }),
    [seeds, burstId]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-visible"
      aria-hidden="true"
    >
      {items}
    </div>
  );
};

export default HeartConfetti;
