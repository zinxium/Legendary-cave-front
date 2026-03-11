import React, { useState } from 'react';

const specialtyColors = {
  "Intelligence Artificielle": { bg: "#a486d5", text: "#1f1233" },
  "Développement Web": { bg: "#ffcc00", text: "#221438" },
  "Cybersécurité": { bg: "#54318c", text: "#ffeb99" },
  "Data Science": { bg: "#ffde5c", text: "#221438" },
  "DevOps": { bg: "#7042bb", text: "#ffe066" },
};

const colorMap = {
  byzantium: "#a486d5",
  dogwood_rose: "#d946a6",
  gold: "#ffcc00",
  space_cadet: "#54318c"
};

const AlumniCard = ({ alumni, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const spec = specialtyColors[alumni.domain] || { bg: "#54318c", text: "#ffeb99" };
  const color = colorMap[alumni.color] || "#a486d5";
  const isGold = color === "#ffcc00";
  const initials = alumni.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div
      onClick={() => onClick(alumni)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(84,49,140,0.6), rgba(34,20,56,0.9))'
          : 'rgba(34,20,56,0.7)',
        border: hovered ? '1px solid rgba(255,204,0,0.5)' : '1px solid rgba(164,134,213,0.2)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 20px 40px rgba(84,49,140,0.4), 0 0 0 1px rgba(255,204,0,0.15)'
          : 'none',
      }}
    >
      {/* Availability dot */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{
          background: alumni.available ? '#4ade80' : 'rgba(255,255,255,0.2)',
        }}
      />

      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-lg font-bold"
        style={{
          fontFamily: "'Playfair Display', serif",
          background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
          border: `2px solid ${color}66`,
          color: isGold ? '#221438' : '#ffeb99',
        }}
      >
        {initials}
      </div>

      {/* Name */}
      <div
        className="font-bold text-base mb-0.5"
        style={{ fontFamily: "'Playfair Display', serif", color: '#ffeb99' }}
      >
        {alumni.name}
      </div>

      {/* Role */}
      <div
        className="text-sm mb-0.5"
        style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,235,153,0.55)' }}
      >
        {alumni.role}
      </div>

      {/* Company · Location */}
      <div
        className="text-xs mb-4"
        style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(164,134,213,0.7)' }}
      >
        {alumni.company} · {alumni.location}
      </div>

      {/* Specialty badge */}
      <div
        className="inline-flex items-center rounded-full px-3 py-0.5 text-xs uppercase tracking-widest"
        style={{
          fontFamily: "'DM Mono', monospace",
          background: spec.bg + '33',
          border: `1px solid ${spec.bg}55`,
          color: spec.bg,
        }}
      >
        {alumni.domain}
      </div>
    </div>
  );
};

export default AlumniCard;