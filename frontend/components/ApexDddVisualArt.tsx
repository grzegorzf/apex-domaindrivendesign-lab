'use client'

import React from 'react'

interface ApexDddVisualArtProps {
  className?: string
  style?: React.CSSProperties
  showBadge?: boolean
  interactive?: boolean
}

/**
 * Apex Domain-Driven Design Lab — Exact Signature Visual Art
 * Pixel-precise vector recreation of the official Apex DDD artwork.
 * Features:
 * - Smooth inverted rounded triangular boundary with dual-tone gradient neon stroke and volumetric halo
 * - Central Aggregate Root box with interlocking Lime & Violet chevrons and center white dot
 * - Inbound horizontal dashed purple line: COMMAND (MUTATION)
 * - Outbound solid bright lime line: EVENT STREAM (OUTBOX)
 * - Two child entity pill cards below the root
 * - Background orbits, satellite nodes, and HUD telemetry caption
 */
export default function ApexDddVisualArt({
  className = '',
  style = {},
  showBadge = true,
  interactive = true,
}: ApexDddVisualArtProps) {
  return (
    <div
      className={`apex-card-art ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '22rem',
        background: '#0c0d10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 'inherit',
        ...style,
      }}
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 45%, rgba(139, 92, 246, 0.18) 0%, rgba(199, 255, 94, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Left Educational Lab Badge */}
      {showBadge && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 10,
          }}
        >
          <span className="lab-badge">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#c7ff5e',
                boxShadow: '0 0 8px #c7ff5e',
                display: 'inline-block',
              }}
            />
            EDUCATIONAL LAB
          </span>
        </div>
      )}

      {/* High-Precision SVG Diagram */}
      <svg
        viewBox="0 0 540 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '520px',
          maxHeight: '420px',
          filter: 'drop-shadow(0 14px 35px rgba(0, 0, 0, 0.75))',
          transform: interactive ? 'scale(1)' : undefined,
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          {/* Violet to Lime Stroke Gradient for Triangular Boundary */}
          <linearGradient id="boundaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9061f9" />
            <stop offset="35%" stopColor="#8b5cf6" />
            <stop offset="70%" stopColor="#a7f348" />
            <stop offset="100%" stopColor="#c7ff5e" />
          </linearGradient>

          {/* Central Box Gradient Stroke */}
          <linearGradient id="boxStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c7ff5e" />
          </linearGradient>

          {/* Volumetric Soft Halo Filters */}
          <filter id="violetBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
          </filter>
          <filter id="limeBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
          </filter>
          <filter id="neonAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ─── Faint Background Orbital Ellipses ─── */}
        <ellipse
          cx="270"
          cy="195"
          rx="210"
          ry="115"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <ellipse
          cx="270"
          cy="195"
          rx="185"
          ry="90"
          transform="rotate(-16 270 195)"
          stroke="rgba(139, 92, 246, 0.16)"
          strokeWidth="1"
        />
        <ellipse
          cx="270"
          cy="195"
          rx="175"
          ry="85"
          transform="rotate(18 270 195)"
          stroke="rgba(199, 255, 94, 0.14)"
          strokeWidth="1"
        />

        {/* ─── Volumetric Glow Halos for the Boundary ─── */}
        <path
          d="M 170 120 C 230 115, 310 115, 370 120 C 435 125, 450 170, 395 240 C 350 295, 305 345, 270 355 C 235 345, 190 295, 145 240 C 90 170, 105 125, 170 120 Z"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="18"
          opacity="0.3"
          filter="url(#violetBlur)"
        />
        <path
          d="M 270 355 C 245 350, 205 305, 175 260 L 365 260 C 335 305, 295 350, 270 355 Z"
          fill="none"
          stroke="#c7ff5e"
          strokeWidth="16"
          opacity="0.25"
          filter="url(#limeBlur)"
        />

        {/* ─── Primary Inverted Rounded Triangular Boundary (Reference Image) ─── */}
        <path
          d="M 175 120 C 235 116, 305 116, 365 120 C 425 124, 440 165, 390 235 C 348 292, 300 345, 270 352 C 240 345, 192 292, 150 235 C 100 165, 115 124, 175 120 Z"
          fill="rgba(16, 15, 22, 0.82)"
          stroke="url(#boundaryGradient)"
          strokeWidth="2.8"
          filter="url(#neonAura)"
        />

        {/* Dynamic Curved Accent Dashed Tracks */}
        {/* Lower-left green dashed sweep curving into root */}
        <path
          d="M 125 245 C 160 215, 200 205, 235 200"
          fill="none"
          stroke="rgba(199, 255, 94, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="4 4"
        />
        {/* Right violet dashed sweep curving out of root */}
        <path
          d="M 325 240 C 370 260, 420 255, 455 230"
          fill="none"
          stroke="rgba(139, 92, 246, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="4 4"
        />

        {/* ─── Central Aggregate Root Box ─── */}
        <g transform="translate(215, 140)">
          {/* Main Container */}
          <rect
            x="0"
            y="0"
            width="110"
            height="110"
            rx="24"
            fill="#14131a"
            stroke="url(#boxStroke)"
            strokeWidth="2"
          />

          {/* Inner Inset Rim */}
          <rect
            x="10"
            y="10"
            width="90"
            height="90"
            rx="18"
            fill="#181721"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Interlocking Chevrons Emblem (Reference Image) */}
          <g transform="translate(55, 55)">
            {/* Top-Left Chevron (Electric Lime) */}
            <path
              d="M -14 6 L -14 -10 C -14 -14, -12 -16, -8 -16 L 8 -16"
              fill="none"
              stroke="#c7ff5e"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Bottom-Right Chevron (Cyber Violet) */}
            <path
              d="M 14 -6 L 14 10 C 14 14, 12 16, 8 16 L -8 16"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Core Lock Dot */}
            <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          </g>
        </g>

        {/* ─── Child Entity Cards (Bottom Left & Bottom Right) ─── */}
        {/* Left Child Entity (Violet accent) */}
        <g transform="translate(170, 275)">
          <rect
            x="0"
            y="0"
            width="48"
            height="34"
            rx="8"
            fill="#16151e"
            stroke="#2f2b38"
            strokeWidth="1.2"
          />
          <line x1="9" y1="13" x2="39" y2="13" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <line x1="9" y1="21" x2="28" y2="21" stroke="#484452" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Dash connector from central box to left child */}
        <line x1="225" y1="250" x2="195" y2="275" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="1.5" strokeDasharray="2 3" />

        {/* Right Child Entity (Lime accent) */}
        <g transform="translate(322, 275)">
          <rect
            x="0"
            y="0"
            width="48"
            height="34"
            rx="8"
            fill="#16151e"
            stroke="#2f2b38"
            strokeWidth="1.2"
          />
          <line x1="9" y1="13" x2="39" y2="13" stroke="#c7ff5e" strokeWidth="3" strokeLinecap="round" />
          <line x1="9" y1="21" x2="31" y2="21" stroke="#484452" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Dash connector from central box to right child */}
        <line x1="315" y1="250" x2="345" y2="275" stroke="rgba(199, 255, 94, 0.6)" strokeWidth="1.5" strokeDasharray="2 3" />

        {/* ─── Inbound Command Vector (Left Side) ─── */}
        {/* Inbound Purple Origin Node */}
        <circle cx="85" cy="190" r="5" fill="#8b5cf6" />
        {/* Dashed Inbound Line */}
        <line
          x1="92"
          y1="190"
          x2="214"
          y2="190"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        {/* Arrowhead into Box */}
        <polygon points="210,186 218,190 210,194" fill="#8b5cf6" />
        {/* Command Monospace Text */}
        <text
          x="100"
          y="178"
          fontFamily="ui-monospace, monospace"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.1em"
          fill="#a78bfa"
        >
          COMMAND (MUTATION)
        </text>

        {/* ─── Outbound Event Stream Vector (Right Side) ─── */}
        {/* Solid Lime Line from Box */}
        <line
          x1="326"
          y1="190"
          x2="480"
          y2="190"
          stroke="#c7ff5e"
          strokeWidth="2.5"
        />
        {/* Arrowhead to the Right */}
        <polygon points="476,186 486,190 476,194" fill="#c7ff5e" />
        {/* Outbox Event Stream Monospace Text */}
        <text
          x="340"
          y="178"
          fontFamily="ui-monospace, monospace"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.1em"
          fill="#c7ff5e"
        >
          EVENT STREAM (OUTBOX)
        </text>

        {/* ─── Satellite Nodes (Reference Image) ─── */}
        {/* Top Center Node */}
        <g transform="translate(278, 65)">
          <circle cx="0" cy="0" r="12" fill="#14131c" stroke="#2e2b38" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#c7ff5e" />
        </g>

        {/* Lower Left Node */}
        <g transform="translate(100, 280)">
          <circle cx="0" cy="0" r="15" fill="#14131c" stroke="#2e2b38" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6.5" fill="#c7ff5e" />
        </g>

        {/* Mid Right Node */}
        <g transform="translate(470, 235)">
          <circle cx="0" cy="0" r="13" fill="#14131c" stroke="#2e2b38" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5.5" fill="#8b5cf6" />
        </g>

        {/* ─── Bottom HUD Telemetry Caption ─── */}
        <text
          x="270"
          y="412"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.18em"
          fill="#8c8694"
        >
          AGGREGATE BOUNDARY · INVARIANTS: 100% GUARDED
        </text>
      </svg>
    </div>
  )
}
