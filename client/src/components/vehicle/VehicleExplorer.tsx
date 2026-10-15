import React, { useState } from 'react';
import { PowertrainType, SystemId } from '../../types/automotive.js';
import { Vehicle3DScene } from './Vehicle3DScene.js';
import { Vehicle2DCutaway } from './Vehicle2DCutaway.js';
import { ComponentDetailPanel } from './ComponentDetailPanel.js';
import { useLanguage } from '../../context/LanguageContext.js';
import {
  Layers,
  Eye,
  Zap,
  Flame,
  Maximize2,
  Box,
  Compass,
  Activity,
  Disc,
  Cog,
  Shield,
} from 'lucide-react';

interface VehicleExplorerProps {
  onAskAI?: (prompt: string, context: string) => void;
  initialSystem?: SystemId;
  initialComponent?: string;
}

export const VehicleExplorer: React.FC<VehicleExplorerProps> = ({
  onAskAI = () => {},
  initialSystem = 'engine',
  initialComponent = 'cylinder-block',
}) => {
  const { t } = useLanguage();
  const [powertrain, setPowertrain] = useState<PowertrainType>('ice');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [exploded, setExploded] = useState(false);
  const [cutaway, setCutaway] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(initialComponent);
  const [selectedSystem, setSelectedSystem] = useState<SystemId | null>(initialSystem);

  const handleSelectComponent = (comp: string, sys: SystemId) => {
    setSelectedComponent(comp);
    setSelectedSystem(sys);
  };

  const quickComponents: { id: string; sys: SystemId; label: string; icon: any }[] = [
    {
      id: powertrain === 'ice' ? 'cylinder-block' : 'electric-motor',
      sys: 'engine',
      label: powertrain === 'ice' ? 'Engine' : 'Motor',
      icon: Flame,
    },
    {
      id: powertrain === 'ice' ? 'gearbox-geartrain' : 'ev-inverter',
      sys: 'transmission',
      label: powertrain === 'ice' ? 'Transmission' : 'Inverter',
      icon: Cog,
    },
    { id: 'springs', sys: 'suspension', label: 'Suspension', icon: Activity },
    { id: 'brake-rotor', sys: 'brakes', label: 'Brakes', icon: Disc },
    { id: 'rack-and-pinion', sys: 'steering', label: 'Steering', icon: Compass },
    {
      id: powertrain === 'ice' ? 'can-bus' : 'ev-battery',
      sys: 'electrical',
      label: powertrain === 'ice' ? 'Electronics' : 'HV Battery',
      icon: Zap,
    },
    { id: 'safety-cell', sys: 'body', label: 'Safety Cell', icon: Shield },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Powertrain Toggle: ICE vs EV */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          <button
            onClick={() => {
              setPowertrain('ice');
              setSelectedComponent('cylinder-block');
              setSelectedSystem('engine');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              powertrain === 'ice'
                ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.vehicleViewer.ice}</span>
          </button>
          <button
            onClick={() => {
              setPowertrain('ev');
              setSelectedComponent('electric-motor');
              setSelectedSystem('engine');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              powertrain === 'ev'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{t.vehicleViewer.ev}</span>
          </button>
        </div>

        {/* View Mode Toggle: 3D vs 2D */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === '3d'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{t.vehicleViewer.view3D}</span>
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === '2d'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.vehicleViewer.view2D}</span>
          </button>
        </div>

        {/* 3D Visual Options: Cutaway & Exploded View */}
        {viewMode === '3d' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCutaway(!cutaway)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                cutaway
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.vehicleViewer.cutaway}</span>
            </button>
            <button
              onClick={() => setExploded(!exploded)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                exploded
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.vehicleViewer.exploded}</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Component Selection Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickComponents.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedComponent === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectComponent(item.id, item.sys)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Split: Viewer & Component Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
        <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden">
          {viewMode === '3d' ? (
            <Vehicle3DScene
              powertrain={powertrain}
              exploded={exploded}
              cutaway={cutaway}
              selectedComponent={selectedComponent}
              onSelectComponent={handleSelectComponent}
            />
          ) : (
            <Vehicle2DCutaway
              powertrain={powertrain}
              selectedComponent={selectedComponent}
              onSelectComponent={handleSelectComponent}
            />
          )}
        </div>

        <div className="lg:col-span-1 h-[500px]">
          <ComponentDetailPanel
            componentId={selectedComponent}
            systemId={selectedSystem}
            onAskAI={onAskAI}
          />
        </div>
      </div>
    </div>
  );
};
