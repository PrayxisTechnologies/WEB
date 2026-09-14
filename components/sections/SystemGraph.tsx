'use client';

import React from 'react';

interface SystemGraphProps {
  progress: number; // 0.00 to 1.00
  activeHoverNode: string | null;
  onHoverNode: (nodeId: string | null) => void;
}

export const SystemGraph: React.FC<SystemGraphProps> = ({
  progress,
  activeHoverNode,
  onHoverNode,
}) => {
  // Continuous stage progress interpolation (0.0 to 1.0 each)
  const stage1 = Math.min(1, Math.max(0, progress / 0.15)); // 0.00 -> 0.15
  const stage2 = Math.min(1, Math.max(0, (progress - 0.15) / 0.20)); // 0.15 -> 0.35
  const stage3 = Math.min(1, Math.max(0, (progress - 0.35) / 0.20)); // 0.35 -> 0.55
  const stage4 = Math.min(1, Math.max(0, (progress - 0.55) / 0.20)); // 0.55 -> 0.75
  const stage5 = Math.min(1, Math.max(0, (progress - 0.75) / 0.25)); // 0.75 -> 1.00

  // 8 Architecture Nodes
  const nodes = [
    { id: 'web', label: 'WEB', category: 'INTERFACE', cx: 160, cy: 150, stageReq: 2 },
    { id: 'api', label: 'API', category: 'GATEWAY', cx: 300, cy: 170, stageReq: 2 },
    { id: 'app', label: 'APP', category: 'COMPUTE', cx: 220, cy: 300, stageReq: 2 },
    { id: 'data', label: 'DATA', category: 'STORAGE', cx: 380, cy: 330, stageReq: 2 },

    { id: 'cloud', label: 'CLOUD', category: 'DEVOPS', cx: 640, cy: 150, stageReq: 3 },
    { id: 'security', label: 'SECURITY', category: 'DEFENSE', cx: 500, cy: 170, stageReq: 3 },
    { id: 'ai', label: 'AI', category: 'AUTOMATION', cx: 580, cy: 300, stageReq: 3 },
    { id: 'infra', label: 'INFRA', category: 'HARDWARE', cx: 500, cy: 330, stageReq: 3 },
  ];

  // Connections connecting Core (400, 240) to nodes
  const connections = [
    { from: 'core', to: 'api', x1: 400, y1: 240, x2: 300, y2: 170, length: 122, stageReq: 2 },
    { from: 'core', to: 'web', x1: 400, y1: 240, x2: 160, y2: 150, length: 256, stageReq: 2 },
    { from: 'core', to: 'app', x1: 400, y1: 240, x2: 220, y2: 300, length: 189, stageReq: 2 },
    { from: 'core', to: 'data', x1: 400, y1: 240, x2: 380, y2: 330, length: 92, stageReq: 2 },
    { from: 'api', to: 'web', x1: 300, y1: 170, x2: 160, y2: 150, length: 141, stageReq: 2 },

    { from: 'core', to: 'security', x1: 400, y1: 240, x2: 500, y2: 170, length: 122, stageReq: 3 },
    { from: 'core', to: 'cloud', x1: 400, y1: 240, x2: 640, y2: 150, length: 256, stageReq: 3 },
    { from: 'core', to: 'ai', x1: 400, y1: 240, x2: 580, y2: 300, length: 189, stageReq: 3 },
    { from: 'core', to: 'infra', x1: 400, y1: 240, x2: 500, y2: 330, length: 134, stageReq: 3 },
    { from: 'security', to: 'cloud', x1: 500, y1: 170, x2: 640, y2: 150, length: 141, stageReq: 3 },
  ];

  // Dynamic Core Radius & Scale based on stage
  const coreRadius = 24 + stage2 * 10 + stage3 * 10 + stage5 * 10;

  // Security perimeter circumference
  const perimeterCircumference = 2 * Math.PI * 280; // ~1759px
  const perimeterOffset = perimeterCircumference * (1 - stage4);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <svg
        className="w-full h-full max-w-4xl max-h-[520px] overflow-visible"
        viewBox="0 0 800 480"
        fill="none"
      >
        {/* Background Spatial Grid & Radial Guides */}
        <g opacity={0.12 + stage1 * 0.08}>
          <circle cx="400" cy="240" r="320" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="3 6" />
          <circle cx="400" cy="240" r="220" stroke="#00F0FF" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="4 8" />
          <circle cx="400" cy="240" r="140" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="2 4" />
          <line x1="400" y1="20" x2="400" y2="460" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="40" y1="240" x2="760" y2="240" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" />
        </g>

        {/* STAGE 04: Progressive Security Perimeter Ring */}
        {stage4 > 0 && (
          <g opacity={stage4}>
            <circle
              cx="400"
              cy="240"
              r="280"
              stroke="#00F0FF"
              strokeWidth="1.5"
              strokeDasharray={perimeterCircumference}
              strokeDashoffset={perimeterOffset}
              strokeOpacity={0.6 + stage5 * 0.3}
            />

            {/* Security Perimeter Badges */}
            <g opacity={stage4}>
              <rect x="360" y="30" width="80" height="20" rx="10" fill="#050607" stroke="#00F0FF" strokeWidth="1" />
              <text x="400" y="43" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">AUTH</text>

              <rect x="670" y="230" width="90" height="20" rx="10" fill="#050607" stroke="#00F0FF" strokeWidth="1" />
              <text x="715" y="243" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">MONITORING</text>

              <rect x="360" y="430" width="80" height="20" rx="10" fill="#050607" stroke="#00F0FF" strokeWidth="1" />
              <text x="400" y="443" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">ENCRYPTION</text>

              <rect x="40" y="230" width="80" height="20" rx="10" fill="#050607" stroke="#00F0FF" strokeWidth="1" />
              <text x="80" y="243" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">SECURITY</text>
            </g>
          </g>
        )}

        {/* SVG Connection Paths with Progressive Stroke Drawing */}
        {connections.map((conn, idx) => {
          const isVisible = (conn.stageReq === 2 && stage2 > 0) || (conn.stageReq === 3 && stage3 > 0);
          if (!isVisible) return null;

          const stageProgress = conn.stageReq === 2 ? stage2 : stage3;
          const strokeOffset = conn.length * (1 - stageProgress);
          const isHovered = activeHoverNode === conn.from || activeHoverNode === conn.to;

          return (
            <g key={`conn-${idx}`}>
              <line
                x1={conn.x1}
                y1={conn.y1}
                x2={conn.x2}
                y2={conn.y2}
                stroke={isHovered ? '#00F0FF' : '#FFFFFF'}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isHovered ? 0.9 : 0.25 * stageProgress}
                strokeDasharray={conn.length}
                strokeDashoffset={strokeOffset}
              />

              {/* STAGE 03+: Moving Data Pulses */}
              {stage3 > 0.2 && stageProgress > 0.8 && (
                <circle r="3" fill="#00F0FF" opacity={stageProgress}>
                  <animateMotion
                    path={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
                    dur={`${2 + (idx % 3)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Central Geometric PRAYXIS CORE (Evolving across stages) */}
        <g transform="translate(400, 240)" className="cursor-pointer">
          <circle
            r={coreRadius}
            fill="#050607"
            stroke="#00F0FF"
            strokeWidth={1.5 + stage5 * 0.5}
            strokeOpacity={0.6 + stage5 * 0.4}
          />
          {stage2 > 0 && (
            <circle r={coreRadius * 0.75} stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity={0.4 * stage2} />
          )}
          {stage3 > 0 && (
            <circle r={coreRadius * 0.5} stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" strokeOpacity={0.3 * stage3} />
          )}

          <rect
            x={-14 - stage5 * 4}
            y={-14 - stage5 * 4}
            width={28 + stage5 * 8}
            height={28 + stage5 * 8}
            rx={6 + stage5 * 2}
            fill="#00F0FF"
            fillOpacity={0.1 + stage5 * 0.1}
            stroke="#00F0FF"
            strokeWidth="1.5"
          />

          <circle r={4 + stage5 * 2} fill="#00F0FF" className="animate-pulse" />

          {/* Central Label */}
          <text
            y={coreRadius + 22}
            textAnchor="middle"
            fill="#F4F4F6"
            fontSize={stage5 > 0.5 ? '13' : '10'}
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.15em"
          >
            {stage5 > 0.5 ? 'PRAYXIS' : 'CORE'}
          </text>

          {stage5 > 0.5 && (
            <text y={coreRadius + 35} textAnchor="middle" fill="#00F0FF" fontSize="8" fontFamily="monospace" letterSpacing="0.1em">
              SYSTEM ARCHITECTURE
            </text>
          )}
        </g>

        {/* Peripheral System Nodes */}
        {nodes.map((node) => {
          const isVisible = (node.stageReq === 2 && stage2 > 0) || (node.stageReq === 3 && stage3 > 0);
          if (!isVisible) return null;

          const stageProgress = node.stageReq === 2 ? stage2 : stage3;
          const nodeScale = 0.3 + 0.7 * stageProgress;
          const isHovered = activeHoverNode === node.id;

          return (
            <g
              key={node.id}
              transform={`translate(${node.cx}, ${node.cy}) scale(${nodeScale})`}
              opacity={stageProgress}
              onMouseEnter={() => onHoverNode(node.id)}
              onMouseLeave={() => onHoverNode(null)}
              className="cursor-pointer group transition-all duration-300"
            >
              {/* Outer Node Circle */}
              <circle
                r={isHovered ? 24 : 20}
                fill="#050607"
                stroke={isHovered ? '#00F0FF' : '#FFFFFF'}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isHovered ? 1 : 0.4 * stageProgress}
              />
              <circle r="3.5" fill={isHovered ? '#00F0FF' : '#F4F4F6'} />

              {/* Node Label */}
              <text
                y="35"
                textAnchor="middle"
                fill={isHovered ? '#00F0FF' : '#F4F4F6'}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.05em"
              >
                {node.label}
              </text>

              {/* Micro Hover Tooltip */}
              {isHovered && (
                <g transform="translate(0, -32)">
                  <rect x="-40" y="-12" width="80" height="18" rx="4" fill="#050607" stroke="#00F0FF" strokeWidth="1" />
                  <text y="0" textAnchor="middle" fill="#00F0FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    {node.category} // ACTIVE
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
