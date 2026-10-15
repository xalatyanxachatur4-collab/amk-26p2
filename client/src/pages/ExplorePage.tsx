import React from 'react';
import { VehicleExplorer } from '../components/vehicle/VehicleExplorer.js';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { Layers, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ExplorePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAskAI = (prompt: string, context: string) => {
    navigate(`/assistant?q=${encodeURIComponent(prompt)}&ctx=${encodeURIComponent(context)}`);
  };

  return (
    <div className="space-y-6 pb-16">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Layers className="w-4 h-4" />
            <span>Vehicle Structural Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.vehicleViewer.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            {t.vehicleViewer.subtitle}
          </p>
        </div>

        {/* Master Vehicle Explorer component */}
        <VehicleExplorer onAskAI={handleAskAI} />

        {/* Engineering Lab Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">Spatial Packaging</h4>
            <p className="text-slate-500 dark:text-slate-400">
              Internal combustion architectures require longitudinal or transverse engine bays, whereas electric skateboards distribute heavy battery mass low between axles for optimal roll stability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">Exploded Assembly</h4>
            <p className="text-slate-500 dark:text-slate-400">
              Toggle the Exploded Assembly button to translate wheel knuckles, powertrain blocks, and suspension struts away from the unibody along kinematic axes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">2D Fallback Safety</h4>
            <p className="text-slate-500 dark:text-slate-400">
              If running on hardware with limited WebGL acceleration, switch to the 2D Engineering Cutaway for vector-sharp SVG inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
