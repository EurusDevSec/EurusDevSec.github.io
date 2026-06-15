"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/types";

interface NodeData {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  tags: string[];
  phase: string;
  color: "emerald" | "blue" | "amber" | "purple" | "pink";
}

interface InfraPipelineProps {
  currentTags?: string[];
  currentSlug?: string;
  allPosts: PostMeta[];
}

const NODES: NodeData[] = [
  // Phase 1: Code & Automation
  { id: "github", name: "GitHub", description: "Quản lý mã nguồn & Version Control", x: 80, y: 70, tags: ["git", "github"], phase: "Automation", color: "emerald" },
  { id: "gha", name: "GitHub Actions", description: "Tự động hóa CI/CD Pipeline", x: 230, y: 70, tags: ["cicd", "github actions", "pipeline"], phase: "Automation", color: "emerald" },
  { id: "docker", name: "Docker", description: "Đóng gói ứng dụng (Containerization)", x: 380, y: 70, tags: ["docker", "container"], phase: "Automation", color: "emerald" },
  
  // Phase 2: Infrastructure as Code
  { id: "terraform", name: "Terraform", description: "Quản lý hạ tầng bằng mã (IaC)", x: 530, y: 70, tags: ["terraform", "iac"], phase: "IaC", color: "blue" },
  { id: "ansible", name: "Ansible", description: "Quản lý cấu hình & Cài đặt hệ thống", x: 680, y: 70, tags: ["ansible", "provisioning"], phase: "IaC", color: "blue" },

  // Phase 3: Cloud Compute
  { id: "aws_ec2", name: "AWS EC2 & VPC", description: "Hạ tầng máy chủ ảo & Mạng đám mây", x: 180, y: 190, tags: ["aws", "cloud", "ec2"], phase: "Compute", color: "amber" },
  { id: "aws_eks", name: "AWS EKS / ECS", description: "Vận hành & Lập lịch Container", x: 380, y: 190, tags: ["kubernetes", "k8s", "eks", "ecs"], phase: "Compute", color: "amber" },

  // Phase 5: Security (DevSecOps)
  { id: "cloudflare", name: "Cloudflare", description: "Bảo mật CDN, DNS & Bảo vệ Edge", x: 560, y: 190, tags: ["cloudflare", "dns"], phase: "Security", color: "pink" },
  { id: "aws_waf", name: "AWS WAF", description: "Bảo vệ ứng dụng web khỏi tấn công", x: 720, y: 190, tags: ["security", "waf", "csp"], phase: "Security", color: "pink" },

  // Phase 4: Database & Monitoring
  { id: "supabase", name: "Supabase / RDS", description: "Lưu trữ dữ liệu & Cơ sở dữ liệu", x: 280, y: 310, tags: ["supabase", "database", "postgres", "sql"], phase: "Database", color: "purple" },
  { id: "grafana", name: "Grafana & Prometheus", description: "Giám sát tài nguyên & Trực quan số liệu", x: 480, y: 310, tags: ["monitoring", "prometheus", "grafana"], phase: "Monitoring", color: "purple" },
  { id: "cloudwatch", name: "AWS CloudWatch", description: "Thu thập log & Cảnh báo hệ thống", x: 680, y: 310, tags: ["cloudwatch", "logging"], phase: "Monitoring", color: "purple" },
];

const CONNECTIONS = [
  // Automation to IaC
  { from: "github", to: "gha" },
  { from: "gha", to: "docker" },
  { from: "docker", to: "terraform" },
  { from: "terraform", to: "ansible" },
  
  // Docker to EKS
  { from: "docker", to: "aws_eks" },
  
  // Terraform/Ansible to Cloud Host
  { from: "terraform", to: "aws_ec2" },
  { from: "ansible", to: "aws_ec2" },
  { from: "ansible", to: "aws_eks" },

  // Security to Compute
  { from: "cloudflare", to: "aws_waf" },
  { from: "aws_waf", to: "aws_eks" },
  { from: "aws_waf", to: "aws_ec2" },

  // Compute to DB & Monitoring
  { from: "aws_ec2", to: "supabase" },
  { from: "aws_eks", to: "supabase" },
  { from: "aws_ec2", to: "grafana" },
  { from: "aws_eks", to: "grafana" },
  { from: "aws_ec2", to: "cloudwatch" },
  { from: "aws_eks", to: "cloudwatch" },
];

export default function InfraPipeline({ currentTags = [], currentSlug = "", allPosts }: InfraPipelineProps) {
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize tags
  const activeTags = currentTags.map(t => t.toLowerCase());

  // Check if a node is active in the current article
  const isNodeActive = (node: NodeData) => {
    return node.tags.some(tag => activeTags.includes(tag.toLowerCase()));
  };

  // Get related posts for a node (excluding the current one)
  const getNodePosts = (node: NodeData) => {
    return allPosts.filter(post => {
      if (post.slug === currentSlug) return false;
      const postTags = (post.tags || []).map(t => t.toLowerCase());
      return node.tags.some(tag => postTags.includes(tag.toLowerCase()));
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const colorClasses = {
    emerald: {
      text: "text-emerald-400",
      border: "stroke-emerald-500",
      fill: "fill-emerald-500/10",
      glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    },
    blue: {
      text: "text-blue-400",
      border: "stroke-blue-500",
      fill: "fill-blue-500/10",
      glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    },
    amber: {
      text: "text-amber-400",
      border: "stroke-amber-500",
      fill: "fill-amber-500/10",
      glow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    },
    purple: {
      text: "text-purple-400",
      border: "stroke-purple-500",
      fill: "fill-purple-500/10",
      glow: "drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]",
    },
    pink: {
      text: "text-pink-400",
      border: "stroke-pink-500",
      fill: "fill-pink-500/10",
      glow: "drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]",
    },
  };

  return (
    <div className="mt-12 rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur-md relative overflow-hidden">
      {/* Background glowing ambient light */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/5 blur-[80px]" />
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/5 blur-[80px]" />

      <h3 className="mb-2 text-lg font-bold text-text-primary flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        Interactive Infra Pipeline Map
      </h3>
      <p className="mb-6 text-xs text-text-muted">
        Rê chuột vào các node hạ tầng để khám phá các bài lab và dự án liên quan. Các node <span className="text-emerald-400 font-semibold">nhấp nháy</span> đại diện cho chủ đề của bài viết này.
      </p>

      {/* ── DESKTOP & TABLET VIEW: SVG GRAPH ── */}
      <div 
        ref={containerRef}
        className="hidden md:block relative border border-border/30 rounded-xl bg-background/50 p-2 select-none"
        onMouseMove={handleMouseMove}
      >
        <svg 
          viewBox="0 0 800 380" 
          className="w-full h-auto"
        >
          {/* Defs for gradients & markers */}
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -20;
                }
              }
              .flow-line {
                stroke-dasharray: 4, 10;
                animation: dash 1s linear infinite;
              }
            `}</style>
          </defs>

          {/* Draw connections */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = NODES.find(n => n.id === conn.from);
            const toNode = NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            // Check if connection is active
            const isActive = isNodeActive(fromNode) && isNodeActive(toNode);
            const isHovered = hoveredNode && (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id);

            // Draw straight or simple curved lines
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            let pathD = `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
            if (Math.abs(dy) > 50 && Math.abs(dx) > 50) {
              // Curve slightly for diagonals
              pathD = `M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2 + 10} ${(fromNode.y + toNode.y) / 2 - 10} ${toNode.x} ${toNode.y}`;
            }

            return (
              <g key={`conn-${idx}`}>
                {/* Background line */}
                <path
                  d={pathD}
                  fill="none"
                  className={cn(
                    "transition-all duration-300",
                    isHovered ? "stroke-emerald-500/40 stroke-[3px]" : "stroke-border/40 stroke-[1.5px]"
                  )}
                />
                {/* Glowing flow animation */}
                {(isActive || isHovered) && (
                  <path
                    d={pathD}
                    fill="none"
                    className="flow-line stroke-emerald-400 stroke-[2px]"
                  />
                )}
              </g>
            );
          })}

          {/* Draw Nodes */}
          {NODES.map((node) => {
            const active = isNodeActive(node);
            const hovered = hoveredNode?.id === node.id;
            const colorClass = colorClasses[node.color];

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Ambient glow for active/hovered node */}
                {(active || hovered) && (
                  <circle
                    r="26"
                    className={cn(
                      "fill-none stroke-none transition-all duration-300",
                      colorClass.glow,
                      active && "animate-pulse"
                    )}
                  />
                )}

                {/* Outer circle */}
                <circle
                  r="20"
                  className={cn(
                    "fill-[#0c111d] stroke-[2px] transition-all duration-300",
                    hovered ? "stroke-emerald-400 scale-110" : colorClass.border,
                    active && "stroke-[3px]"
                  )}
                />

                {/* Inner dot */}
                <circle
                  r="6"
                  className={cn(
                    "transition-all duration-300",
                    active ? "fill-emerald-400" : "fill-text-muted/60 group-hover:fill-emerald-400"
                  )}
                />

                {/* Node label */}
                <text
                  y="36"
                  textAnchor="middle"
                  className={cn(
                    "text-[10px] font-semibold tracking-wide transition-all duration-300 select-none",
                    hovered ? "fill-emerald-400 font-bold" : "fill-text-secondary"
                  )}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Hologram Tooltip */}
        {hoveredNode && (
          <div
            className="absolute z-30 w-72 rounded-xl border border-emerald-500/30 bg-[#0f172ab0] p-4 text-left shadow-2xl backdrop-blur-lg pointer-events-auto transition-all duration-200"
            style={{
              left: `${tooltipPos.x + 20}px`,
              top: `${tooltipPos.y + 10}px`,
              transform: tooltipPos.x > 500 ? "translateX(-110%)" : "none", // Avoid clipping on right edge
            }}
          >
            <div className="flex items-center justify-between mb-1.5 border-b border-white/[0.08] pb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {hoveredNode.phase} / {hoveredNode.name}
              </span>
              <span className={cn(
                "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
                getNodePosts(hoveredNode).length > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-text-muted"
              )}>
                {getNodePosts(hoveredNode).length > 0 ? "Active" : "Coming Soon"}
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              {hoveredNode.description}
            </p>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                Bài viết liên quan:
              </p>
              {getNodePosts(hoveredNode).length > 0 ? (
                <ul className="space-y-1.5">
                  {getNodePosts(hoveredNode).slice(0, 3).map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs text-emerald-400/90 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1 hover:underline"
                      >
                        ✦ {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-text-muted italic">
                  Chưa có bài viết. Đang cập nhật...
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── MOBILE VIEW: COLLAPSIBLE GRID LIST ── */}
      <div className="block md:hidden space-y-4">
        {["Automation", "IaC", "Compute", "Security", "Database", "Monitoring"].map((phase) => {
          const phaseNodes = NODES.filter(n => n.phase === phase);
          const hasActiveInPhase = phaseNodes.some(n => isNodeActive(n));

          return (
            <div 
              key={phase}
              className={cn(
                "rounded-xl border p-4 bg-background/30 transition-all duration-300",
                hasActiveInPhase ? "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" : "border-border/40"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                  {phase === "Automation" && "💻 "}
                  {phase === "IaC" && "🏗️ "}
                  {phase === "Compute" && "☁️ "}
                  {phase === "Security" && "🛡️ "}
                  {phase === "Database" && "🗄️ "}
                  {phase === "Monitoring" && "📊 "}
                  {phase}
                </h4>
                {hasActiveInPhase && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                    Chủ đề hiện tại
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {phaseNodes.map((node) => {
                  const posts = getNodePosts(node);
                  const active = isNodeActive(node);

                  return (
                    <div 
                      key={node.id} 
                      className={cn(
                        "rounded-lg p-2.5 border text-left flex flex-col justify-between",
                        active ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/20 bg-surface/20"
                      )}
                    >
                      <div>
                        <span className={cn(
                          "text-xs font-bold block",
                          active ? "text-emerald-400" : "text-text-primary"
                        )}>
                          {node.name}
                        </span>
                        <span className="text-[10px] text-text-muted line-clamp-2 leading-tight mt-0.5">
                          {node.description}
                        </span>
                      </div>
                      
                      {posts.length > 0 ? (
                        <div className="mt-2.5 pt-2 border-t border-border/20">
                          {posts.slice(0, 1).map(p => (
                            <Link 
                              key={p.slug}
                              href={`/blog/${p.slug}`}
                              className="text-[10px] text-emerald-400 hover:underline font-semibold block truncate"
                            >
                              📚 {p.title}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[9px] text-text-muted italic block mt-2">
                          Updating soon
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
