import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface SeededPetal {
  id: number;
  x: number; // percentage
  delay: number; // seconds
  duration: number; // seconds
  size: number; // pixels
  color: string;
  rotation: number;
  horizontalDrift: number;
}

export const FlowerPetals: React.FC = () => {
  const [petals, setPetals] = useState<SeededPetal[]>([]);

  useEffect(() => {
    // Generate seeded random values once on client side to avoid HMR dehydration mismatch
    const colors = [
      "#f43f5e", // Rose pink
      "#fda4af", // Light pink
      "#f59e0b", // Marigold orange/gold
      "#fbbf24", // Yellow Jasmine
      "#fff"      // Pure jasmine white
    ];

    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 95, 
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      size: 10 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      horizontalDrift: -50 + Math.random() * 100
    }));

    setPetals(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" id="petal-container">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            left: `${petal.x}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            backgroundColor: petal.color,
            filter: "blur(0.5px)",
            opacity: 0.7,
            borderRadius: "50% 0% 50% 50%", // Petal shaped
            transform: `rotate(${petal.rotation}deg)`,
            boxShadow: `0 2px 4px rgba(0,0,0,0.05)`
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, petal.horizontalDrift, 0],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
