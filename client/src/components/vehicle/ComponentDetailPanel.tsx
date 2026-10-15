import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, Bot, ArrowRight, Activity, Wrench, ShieldAlert } from 'lucide-react';
import { SystemId } from '../../types/automotive.js';
import { systemsData } from '../../data/systemsData.js';
import { useLanguage } from '../../context/LanguageContext.js';

interface ComponentDetailPanelProps {
  componentId: string | null;
  systemId: SystemId | null;
  onAskAI: (prompt: string, context: string) => void;
}

export const ComponentDetailPanel: React.FC<ComponentDetailPanelProps> = ({
  componentId,
  systemId,
  onAskAI,
}) => {
  const { t, localize } = useLanguage();
  const navigate = useNavigate();

  if (!componentId || !systemId) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <Activity className="w-8 h-8 text-slate-400 mb-2 stroke-[1.5]" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {t.vehicleViewer.noSelection}
        </p>
      </div>
    );
  }

  const system = systemsData[systemId];
  const component = system?.components.find((c) => c.id === componentId);

  const compName = component ? localize(component.name) : componentId;
  const compFunc = component
    ? localize(component.function)
    : 'Essential structural or kinematic vehicle component.';
  const systemName = system ? localize(system.name) : systemId;

  // Power or signal flow descriptor based on system
  const flowDescriptions: Record<SystemId, string> = {
    engine: 'Chemical/Electrical potential energy → High-pressure thermal expansion → Crankshaft rotational torque output',
    transmission: 'Engine crankshaft input torque → Planetary gear ratio multiplication → Differential output half-shafts',
    suspension: 'Road bump vertical impulse → Coil spring compression displacement → Damper fluid thermal dissipation',
    brakes: 'Driver pedal force → Master cylinder hydraulic line pressure → Friction caliper pad clamping torque',
    steering: 'Rotary handwheel angle → Pinion-rack linear translation → Ackermann knuckle wheel steering angle',
    electrical: 'Battery chemical potential → High-voltage inverter AC synthesis → High-speed CAN-bus ECU command',
    body: 'Impact crash momentum → Plastic progressive crumple zone buckling → Rigid safety cage passenger protection',
  };

  const handleAskAI = () => {
    const prompt = `Can you explain the detailed engineering principles, common failure modes, and working mechanism of the ${compName} in the ${systemName}?`;
    onAskAI(prompt, `${systemName} - ${compName}`);
  };

  return (
    <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
      <div className="space-y-3">
        {/* System badge */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
            {systemName}
          </span>
          <span className="text-[10px] font-mono text-slate-400">ID: {componentId}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {compName}
        </h3>

        {/* Function */}
        <div>
          <span className="text-[11px] font-mono uppercase font-semibold text-slate-500 block mb-1">
            Engineering Function
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {compFunc}
          </p>
        </div>

        {/* Material & principle if available */}
        {component?.material && (
          <div>
            <span className="text-[11px] font-mono uppercase font-semibold text-slate-500 block mb-1">
              Material Specification
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {localize(component.material)}
            </p>
          </div>
        )}

        {/* Energy & Motion Flow */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
            {t.vehicleViewer.powerFlow}
          </span>
          <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
            {flowDescriptions[systemId]}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={`/systems/${systemId}`}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold transition-colors"
        >
          <span>{t.vehicleViewer.viewSystemDetail}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleAskAI}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all active:scale-95"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>{t.vehicleViewer.askAIAboutPart}</span>
        </button>
      </div>
    </div>
  );
};
