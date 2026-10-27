import React from 'react';

export const AicteEmblem: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Cogwheel / Gear Ring */}
        <circle cx="50" cy="50" r="46" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        
        {/* Gear Teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <rect
            key={deg}
            x="46"
            y="1"
            width="8"
            height="6"
            rx="1.5"
            fill="#B45309"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}

        {/* Inner Circle with Navy background */}
        <circle cx="50" cy="50" r="39" fill="#0B1F43" stroke="#F59E0B" strokeWidth="2.5" />
        
        {/* Sun / Rays */}
        <circle cx="50" cy="50" r="33" fill="#0A1832" />
        
        {/* AICTE stylized letters or Torch */}
        {/* Lamp / Diya base */}
        <path d="M32 64 C32 72, 68 72, 68 64 Z" fill="#F59E0B" />
        <ellipse cx="50" cy="64" rx="18" ry="4" fill="#D97706" />
        
        {/* Eternal Flame */}
        <path d="M50 30 C56 40, 62 46, 56 56 C53 61, 47 61, 44 56 C38 46, 44 40, 50 30 Z" fill="#EF4444" />
        <path d="M50 36 C54 44, 57 48, 53 54 C51 57, 49 57, 47 54 C43 48, 46 44, 50 36 Z" fill="#FBBF24" />
        <circle cx="50" cy="46" r="3" fill="#FEF08A" />

        {/* Text banner AICTE */}
        <rect x="25" y="72" width="50" height="12" rx="3" fill="#F59E0B" />
        <text x="50" y="81" textAnchor="middle" fill="#0B1F43" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          AICTE
        </text>
      </svg>
    </div>
  );
};

export const NationalEmblemIndia: React.FC<{ size?: number; className?: string }> = ({ size = 42, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 120" className="w-full h-full text-slate-700" fill="currentColor">
        {/* Three Lions stylized representation */}
        {/* Central Lion */}
        <circle cx="50" cy="32" r="14" fill="#334155" />
        <path d="M42 22 Q50 14 58 22 Q64 32 50 36 Q36 32 42 22 Z" fill="#1E293B" />
        <circle cx="46" cy="28" r="1.5" fill="#FFFFFF" />
        <circle cx="54" cy="28" r="1.5" fill="#FFFFFF" />
        
        {/* Left Lion */}
        <ellipse cx="32" cy="38" rx="10" ry="12" fill="#475569" />
        <circle cx="29" cy="34" r="1.2" fill="#FFFFFF" />

        {/* Right Lion */}
        <ellipse cx="68" cy="38" rx="10" ry="12" fill="#475569" />
        <circle cx="71" cy="34" r="1.2" fill="#FFFFFF" />

        {/* Mane and Chest */}
        <path d="M26 48 Q50 62 74 48 L70 70 Q50 78 30 70 Z" fill="#334155" />

        {/* Abacus / Base Platform */}
        <rect x="20" y="74" width="60" height="8" rx="1.5" fill="#1E293B" />
        {/* Ashoka Chakra in center of abacus */}
        <circle cx="50" cy="78" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.8" />
        <circle cx="50" cy="78" r="0.8" fill="#1E293B" />

        {/* Bull on left, Horse on right */}
        <circle cx="32" cy="78" r="2" fill="#94A3B8" />
        <circle cx="68" cy="78" r="2" fill="#94A3B8" />

        {/* Bell-shaped lotus base */}
        <path d="M24 84 C30 96, 70 96, 76 84 Z" fill="#475569" />
        <rect x="20" y="96" width="60" height="4" rx="1" fill="#1E293B" />
        
        {/* Satyameva Jayate text */}
        <text x="50" y="112" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="bold" fontFamily="serif">
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};
