import React, { useState } from 'react';

const specialtyColors = {
  "IA":             { bg: "#4a8abf", text: "#001229" },
  "Web":            { bg: "#ffcc00", text: "#002147" },
  "Cybersécurité":  { bg: "#003262", text: "#ffeb99" },
  "Data Science":   { bg: "#ffde5c", text: "#002147" },
  "DevOps":         { bg: "#004080", text: "#ffe066" },
  "UX/UI Design":   { bg: "#9b59b6", text: "#fff" },
  "Mobile Dev":     { bg: "#e67e22", text: "#fff" },
};

const colorMap = {
  byzantium: "#4a8abf",
  dogwood_rose: "#4a8abf",
  gold: "#ffcc00",
  space_cadet: "#003262"
};

const AlumniCard = ({ alumni, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const spec = specialtyColors[alumni.specialty] || { bg: "#003262", text: "#ffeb99" };
  const color = colorMap[alumni.color] || "#4a8abf";
  const isGold = color === "#ffcc00";
  const initials = alumni.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const hasPhoto = alumni.photo && !imgError;

  return (
    <div
      onClick={() => onClick(alumni)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300"
      style={{
        background: hovered
          ? 'rgba(0,50,98,0.6)'
          : 'rgba(0,33,71,0.7)',
        border: hovered ? '1px solid rgba(255,204,0,0.5)' : '1px solid rgba(74,138,191,0.2)',
      }}
    >
      {/* Availability dot */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{
          background: alumni.available ? '#4ade80' : 'rgba(255,255,255,0.2)',
        }}
      />

      {/* Avatar / Photo */}
      {hasPhoto ? (
        <div
          className="w-14 h-14 rounded-full mb-4 overflow-hidden"
          style={{ border: `2px solid ${color}66` }}
        >
          <img
            src={alumni.photo}
            alt={alumni.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-lg font-bold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            background: `${color}88`,
            border: `2px solid ${color}66`,
            color: isGold ? '#002147' : '#ffeb99',
          }}
        >
          {initials}
        </div>
      )}

      {/* Name */}
      <div
        className="font-bold text-base mb-0.5"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#ffeb99' }}
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

      {/* Company | Location */}
      <div
        className="text-xs mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(74,138,191,0.7)' }}
      >
        {alumni.company} | {alumni.location}
      </div>

      {/* Specialty badge */}
      <div
        className="inline-flex items-center rounded-full px-3 py-0.5 text-xs uppercase tracking-widest"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: spec.bg + '33',
          border: `1px solid ${spec.bg}55`,
          color: spec.bg,
        }}
      >
        {alumni.specialty}
      </div>
    </div>
  );
};

export default AlumniCard;
