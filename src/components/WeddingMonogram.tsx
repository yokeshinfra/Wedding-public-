import React from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../config/wedding";

interface Props {
  className?: string;
  animate?: boolean;
}

export const WeddingMonogram: React.FC<Props> = ({ className = "w-32 h-32", animate = false }) => {
  const SvgContent = (
    <svg 
      className={`select-none ${className}`} 
      viewBox="0 0 400 400" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Premium Metallic Gold Gradient */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="25%" stopColor="#fcf6ba" />
          <stop offset="50%" stopColor="#b38728" />
          <stop offset="75%" stopColor="#fbf5b7" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>

        <linearGradient id="gold-gradient-dark" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#aa771c" />
          <stop offset="50%" stopColor="#fcf6ba" />
          <stop offset="100%" stopColor="#8a5a19" />
        </linearGradient>

        {/* 3D Emboss and Bevel Filter */}
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" result="shadow" />
          <feComponentTransfer in="SourceAlpha" result="alpha">
            <feFuncA type="linear" slope="0.7"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feOffset dx="-2" dy="-2" result="offsetBlur"/>
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="arithmetic" k2="1" k3="-1" result="shadowDiff"/>
          <feFlood floodColor="#4a2e00" floodOpacity="0.6"/>
          <feComposite in2="shadowDiff" operator="in" />
          <feComposite in2="SourceGraphic" operator="over" result="bevel"/>
          <feMerge>
            <feMergeNode in="shadow"/>
            <feMergeNode in="bevel"/>
          </feMerge>
        </filter>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#glow)">
        {/* Outer Temple Architecture Motif Rings */}
        <circle cx="200" cy="200" r="185" fill="none" stroke="url(#gold-gradient-dark)" strokeWidth="3" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="192" fill="none" stroke="url(#gold-gradient)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="175" fill="none" stroke="url(#gold-gradient-dark)" strokeWidth="1" />
        
        {/* Tamil Traditional Engravings / Petals (represented by diamonds around the border) */}
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 200 200)`}>
            <path d="M 200, 15 L 205, 25 L 200, 35 L 195, 25 Z" fill="url(#gold-gradient)" />
            <circle cx="200" cy="8" r="2" fill="url(#gold-gradient-dark)" />
          </g>
        ))}

        {/* Elegant Heart Outline Surrounding Initials */}
        <path 
           d="M 200, 330 C 200, 330 60, 210 60, 130 C 60, 60 140, 40 185, 90 C 195, 105 200, 120 200, 120 C 200, 120 205, 105 215, 90 C 260, 40 340, 60 340, 130 C 340, 210 200, 330 200, 330 Z" 
           fill="none" 
           stroke="url(#gold-gradient)" 
           strokeWidth="6"
           filter="url(#emboss)"
        />

        {/* Intertwined Inner Decorative Line */}
        <path 
           d="M 200, 310 C 200, 310 80, 205 80, 135 C 80, 80 140, 60 175, 100 C 185, 110 200, 140 200, 140 C 200, 140 215, 110 225, 100 C 260, 60 320, 80 320, 135 C 320, 205 200, 310 200, 310 Z" 
           fill="none" 
           stroke="url(#gold-gradient-dark)" 
           strokeWidth="2"
           strokeDasharray="5 5"
        />

        {/* Small Heart Between Initials */}
        <path 
           d="M 200, 195 C 200, 195 185, 180 185, 168 C 185, 158 195, 153 200, 160 C 205, 153 215, 158 215, 168 C 215, 180 200, 195 200, 195 Z" 
           fill="url(#gold-gradient)" 
           filter="url(#emboss)"
        />

        {/* Letter Y */}
        <text 
          x="140" 
          y="235" 
          fontFamily="Cinzel, serif" 
          fontSize="110" 
          fontWeight="900" 
          fill="url(#gold-gradient)" 
          filter="url(#emboss)" 
          textAnchor="middle"
          letterSpacing="-2"
        >
          {weddingConfig.couple.groom.initial}
        </text>

        {/* Letter P */}
        <text 
          x="260" 
          y="235" 
          fontFamily="Cinzel, serif" 
          fontSize="110" 
          fontWeight="900" 
          fill="url(#gold-gradient)" 
          filter="url(#emboss)" 
          textAnchor="middle"
          letterSpacing="-2"
        >
          {weddingConfig.couple.bride.initial}
        </text>

        {/* Connecting flourishes (Temple artisan style) */}
        <path d="M 170, 250 Q 200, 280 230, 250" fill="none" stroke="url(#gold-gradient)" strokeWidth="3" filter="url(#emboss)" />
        <circle cx="200" cy="265" r="4" fill="url(#gold-gradient-dark)" />
      </g>
    </svg>
  );

  if (animate) {
    return (
      <motion.div 
        animate={{ filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        {SvgContent}
      </motion.div>
    );
  }

  return SvgContent;
};
