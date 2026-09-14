'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { Shield, ShieldCheck, Lock, Cpu, Server, Network, Database, Key } from 'lucide-react';

export interface GraphNode {
  id: string;
  label: string;
  type: 'core' | 'edge' | 'security' | 'cloud' | 'compute';
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
  latency: string;
  status: string;
}

export const NODE_DATA: GraphNode[] = [
  { id: 'core', label: 'PRAYXIS CORE', type: 'core', x: 200, y: 180, icon: ShieldCheck, latency: '0.4ms', status: 'ACTIVE' },
  { id: 'node-01', label: 'EDGE MESH', type: 'edge', x: 85, y: 75, icon: Network, latency: '3.1ms', status: 'NOMINAL' },
  { id: 'node-02', label: 'ZERO-TRUST', type: 'security', x: 315, y: 75, icon: Lock, latency: '1.8ms', status: 'ENFORCED' },
  { id: 'node-03', label: 'CLOUD INFRA', type: 'cloud', x: 355, y: 180, icon: Server, latency: '8.2ms', status: 'OPTIMAL' },
  { id: 'node-04', label: 'AI ENGINE', type: 'compute', x: 315, y: 285, icon: Cpu, latency: '4.5ms', status: 'READY' },
  { id: 'node-05', label: 'SECURE VAULT', type: 'security', x: 85, y: 285, icon: Key, latency: '0.9ms', status: 'LOCKED' },
  { id: 'node-06', label: 'DATA MESH', type: 'edge', x: 45, y: 180, icon: Database, latency: '2.4ms', status: 'SYNCED' },
];

const CONNECTIONS = [
  { from: 'core', to: 'node-01' },
  { from: 'core', to: 'node-02' },
  { from: 'core', to: 'node-03' },
  { from: 'core', to: 'node-04' },
  { from: 'core', to: 'node-05' },
  { from: 'core', to: 'node-06' },
  // Perimeter mesh ring
  { from: 'node-01', to: 'node-02' },
  { from: 'node-02', to: 'node-03' },
  { from: 'node-03', to: 'node-04' },
  { from: 'node-04', to: 'node-05' },
  { from: 'node-05', to: 'node-06' },
  { from: 'node-06', to: 'node-01' },
];

interface NetworkGraphProps {
  scrollProgress?: number; // 0 to 1
  onHoverNode?: (node: GraphNode | null) => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  scrollProgress = 0,
  onHoverNode,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const containerRef = useRef<SVGSVGElement>(null);
  const coreGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !coreGroupRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle float animation for core
      gsap.to(coreGroupRef.current, {
        y: '+=4',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
      });
    });

    return () => ctx.revert();
  }, []);

  const coreNode = NODE_DATA[0];

  // Dynamic opacity based on scroll progress stages
  const edgeOpacity = Math.min(1, Math.max(0.2, scrollProgress * 1.5));
  const securityRingOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.4) * 2.5));

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      
      {/* Interactive Network SVG Canvas */}
      <svg
        ref={containerRef}
        className="w-full h-full max-w-[500px] max-h-[360px] text-prayxis-offwhite"
        viewBox="0 0 400 360"
        fill="none"
      >
        <defs>
          {/* Subtle Glow Filter */}
          <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Connection Line Gradient */}
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 1. Concentric Radial Guide Rings */}
        <g opacity="0.35">
          <circle cx="200" cy="180" r="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.4" />
          <circle cx="200" cy="180" r="95" stroke="#00F0FF" strokeWidth="0.8" strokeDasharray="4 4" opacity={0.3 + securityRingOpacity * 0.4} />
          <circle cx="200" cy="180" r="50" stroke="#00F0FF" strokeWidth="1" opacity={0.5} />
        </g>

        {/* 2. Connection Lines & Moving Data Pulses */}
        <g>
          {CONNECTIONS.map(({ from, to }, idx) => {
            const nodeA = NODE_DATA.find((n) => n.id === from);
            const nodeB = NODE_DATA.find((n) => n.id === to);
            if (!nodeA || !nodeB) return null;

            const isHighlighted = hoveredNodeId === from || hoveredNodeId === to;

            return (
              <g key={`${from}-${to}`}>
                {/* Line Path */}
                <line
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  stroke={isHighlighted ? '#00F0FF' : 'url(#line-grad)'}
                  strokeWidth={isHighlighted ? '1.8' : '1'}
                  strokeOpacity={isHighlighted ? '0.9' : edgeOpacity * 0.5}
                  className="transition-all duration-300"
                />

                {/* Moving Data Pulse Circle */}
                <circle r="2" fill="#00F0FF" opacity={isHighlighted ? '0.9' : '0.5'}>
                  <animateMotion
                    path={`M${nodeA.x},${nodeA.y} L${nodeB.x},${nodeB.y}`}
                    dur={`${4 + (idx % 3) * 1.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* 3. Security Shield Ring Layer (Activates at 75% scroll) */}
        {securityRingOpacity > 0.1 && (
          <g opacity={securityRingOpacity} className="transition-opacity duration-500">
            <polygon
              points="200,45 315,110 315,250 200,315 85,250 85,110"
              stroke="#00F0FF"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.4"
            />
          </g>
        )}

        {/* 4. Peripheral Nodes */}
        {NODE_DATA.filter((n) => n.type !== 'core').map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const NodeIcon = node.icon;

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => {
                setHoveredNodeId(node.id);
                if (onHoverNode) onHoverNode(node);
              }}
              onMouseLeave={() => {
                setHoveredNodeId(null);
                if (onHoverNode) onHoverNode(null);
              }}
            >
              {/* Outer Glow Halo on Hover */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="#00F0FF"
                  fillOpacity="0.15"
                  stroke="#00F0FF"
                  strokeWidth="1"
                  filter="url(#core-glow)"
                />
              )}

              {/* Node Solid Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill="#050607"
                stroke={isHovered ? '#00F0FF' : 'rgba(255, 255, 255, 0.25)'}
                strokeWidth={isHovered ? '1.8' : '1'}
                className="transition-all duration-300"
              />

              <circle
                cx={node.x}
                cy={node.y}
                r="3"
                fill={isHovered ? '#00F0FF' : '#F4F4F6'}
                opacity={isHovered ? '1' : '0.8'}
              />

              {/* Node Label Text */}
              <text
                x={node.x}
                y={node.y + (node.y > 180 ? 24 : -18)}
                textAnchor="middle"
                fill={isHovered ? '#00F0FF' : '#8E8E93'}
                fontSize="8"
                fontFamily="var(--font-jetbrains)"
                fontWeight={isHovered ? 'bold' : 'normal'}
                letterSpacing="0.05em"
                className="transition-all duration-300 uppercase pointer-events-none"
              >
                {node.label}
              </text>

              {/* Hover Telemetry Popup Indicator */}
              {isHovered && (
                <g className="pointer-events-none">
                  <rect
                    x={node.x - 40}
                    y={node.y + (node.y > 180 ? -36 : 14)}
                    width="80"
                    height="18"
                    rx="3"
                    fill="#050607"
                    stroke="#00F0FF"
                    strokeWidth="0.8"
                    opacity="0.95"
                  />
                  <text
                    x={node.x}
                    y={node.y + (node.y > 180 ? -24 : 26)}
                    textAnchor="middle"
                    fill="#00F0FF"
                    fontSize="7"
                    fontFamily="var(--font-jetbrains)"
                  >
                    {node.latency} // {node.status}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 5. Central PRAYXIS CORE */}
        <g
          ref={coreGroupRef}
          className="cursor-pointer"
          onMouseEnter={() => {
            setHoveredNodeId('core');
            if (onHoverNode) onHoverNode(coreNode);
          }}
          onMouseLeave={() => {
            setHoveredNodeId(null);
            if (onHoverNode) onHoverNode(null);
          }}
        >
          {/* Outer Pulsing Aura Ring */}
          <circle
            cx="200"
            cy="180"
            r="32"
            fill="#00F0FF"
            fillOpacity="0.06"
            stroke="#00F0FF"
            strokeWidth="1"
            strokeDasharray="3 3"
            filter="url(#core-glow)"
          />

          {/* Solid Core Base */}
          <circle
            cx="200"
            cy="180"
            r="22"
            fill="#050607"
            stroke="#00F0FF"
            strokeWidth="1.8"
            filter="url(#core-glow)"
          />

          {/* Central Security Core Indicator */}
          <circle cx="200" cy="180" r="8" fill="#00F0FF" opacity="0.25" />
          <circle cx="200" cy="180" r="4" fill="#00F0FF" />

          {/* Core Title */}
          <text
            x="200"
            y="224"
            textAnchor="middle"
            fill="#F4F4F6"
            fontSize="9"
            fontFamily="var(--font-jetbrains)"
            fontWeight="bold"
            letterSpacing="0.1em"
            className="uppercase pointer-events-none"
          >
            PRAYXIS CORE
          </text>
          <text
            x="200"
            y="234"
            textAnchor="middle"
            fill="#00F0FF"
            fontSize="7"
            fontFamily="var(--font-jetbrains)"
            letterSpacing="0.08em"
            className="uppercase pointer-events-none"
          >
            VERIFIED ACTIVE
          </text>
        </g>
      </svg>
    </div>
  );
};
