import React, { useState } from 'react';
import { workflows, WorkflowNode } from '../data/workflowData.js';
import { PowertrainType } from '../types/automotive.js';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { Workflow, Zap, Flame, Cpu, ArrowRight } from 'lucide-react';

export const HowSystemsWorkTogetherPage: React.FC = () => {
  const { t, localize } = useLanguage();
  const [activeType, setActiveType] = useState<PowertrainType>('ice');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('engine-block');

  const currentWorkflow = workflows[activeType];
  const selectedNode = currentWorkflow.nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Workflow className="w-4 h-4" />
            <span>Vehicle Systems Synergy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            How Automotive Systems Work Together
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Inspect the complete energy and kinetic transfer chain from chemical or electrical potential to roadway traction across ICE, Hybrid, and Electric platforms.
          </p>
        </div>

        {/* Powertrain Architecture Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ice', 'hybrid', 'ev'] as const).map((type) => {
            const wf = workflows[type];
            const isSelected = activeType === type;
            return (
              <button
                key={type}
                onClick={() => {
                  setActiveType(type);
                  setSelectedNodeId(workflows[type].nodes[1]?.id || null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                {type === 'ice' && <Flame className="w-4 h-4 text-orange-400" />}
                {type === 'hybrid' && <Cpu className="w-4 h-4 text-indigo-400" />}
                {type === 'ev' && <Zap className="w-4 h-4 text-cyan-400" />}
                <span>{localize(wf.title)}</span>
              </button>
            );
          })}
        </div>

        {/* Architecture Description */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
          <p>{localize(currentWorkflow.description)}</p>
        </div>

        {/* Interactive Schematic Flow Canvas */}
        <div className="relative w-full min-h-[440px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 flex flex-col items-center justify-center shadow-2xl">
          <svg viewBox="0 0 920 400" className="w-full h-auto max-w-5xl select-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
              </marker>
            </defs>

            {/* Connecting Edges */}
            {currentWorkflow.edges.map((edge, idx) => {
              const fromNode = currentWorkflow.nodes.find((n) => n.id === edge.from);
              const toNode = currentWorkflow.nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isConnected = selectedNodeId === edge.from || selectedNodeId === edge.to;
              const isRegen = edge.flowType === 'regeneration';

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isRegen ? '#22c55e' : isConnected ? '#38bdf8' : '#334155'}
                    strokeWidth={isConnected ? 4 : 2}
                    strokeDasharray={isRegen ? '6,3' : undefined}
                    markerEnd={isRegen ? 'url(#arrow-green)' : 'url(#arrow)'}
                    className="transition-all duration-300"
                  />
                  {/* Midpoint Label */}
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 8}
                    fill={isRegen ? '#86efac' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="opacity-80"
                  >
                    {localize(edge.label)}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {currentWorkflow.nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const nodeName = localize(node.name);

              let fillColor = '#1e293b';
              let strokeColor = '#475569';

              if (node.category === 'energy') {
                fillColor = '#065f46';
                strokeColor = '#10b981';
              } else if (node.category === 'powertrain') {
                fillColor = '#9a3412';
                strokeColor = '#f97316';
              } else if (node.category === 'drivetrain') {
                fillColor = '#1e3a8a';
                strokeColor = '#3b82f6';
              } else if (node.category === 'chassis') {
                fillColor = '#312e81';
                strokeColor = '#6366f1';
              } else if (node.category === 'control') {
                fillColor = '#0f766e';
                strokeColor = '#14b8a6';
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNodeId(node.id)}
                >
                  <circle
                    r={isSelected ? 36 : 28}
                    fill={fillColor}
                    stroke={isSelected ? '#38bdf8' : strokeColor}
                    strokeWidth={isSelected ? 4 : 2}
                    className="transition-all duration-200 group-hover:scale-110 shadow-lg"
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {nodeName.slice(0, 9)}
                  </text>
                  <text
                    x="0"
                    y={isSelected ? 48 : 40}
                    fill={isSelected ? '#38bdf8' : '#94a3b8'}
                    fontSize="10"
                    fontWeight="semibold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    className="transition-all duration-200"
                  >
                    {nodeName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Details Panel */}
        {selectedNode && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">
                Active Node: {selectedNode.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                Energy Domain: {selectedNode.energyType}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {localize(selectedNode.name)}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {localize(selectedNode.description)}
            </p>

            {/* Connected Interactions list */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono uppercase font-semibold text-slate-400 block mb-2">
                Active Systemic Interactions:
              </span>
              <div className="space-y-1 text-xs">
                {currentWorkflow.edges
                  .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                  .map((e, idx) => {
                    const fromN = currentWorkflow.nodes.find((n) => n.id === e.from);
                    const toN = currentWorkflow.nodes.find((n) => n.id === e.to);
                    return (
                      <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-cyan-500">
                          {localize(fromN?.name)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-cyan-500">
                          {localize(toN?.name)}
                        </span>
                        <span className="text-slate-400 font-mono">
                          ({localize(e.label)})
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
