import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ProceduralCarModel } from './ProceduralCarModel.js';
import { PowertrainType, SystemId } from '../../types/automotive.js';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';

interface Vehicle3DSceneProps {
  powertrain: PowertrainType;
  exploded: boolean;
  cutaway: boolean;
  selectedComponent: string | null;
  onSelectComponent: (componentId: string, systemId: SystemId) => void;
}

export const Vehicle3DScene: React.FC<Vehicle3DSceneProps> = ({
  powertrain,
  exploded,
  cutaway,
  selectedComponent,
  onSelectComponent,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { t } = useLanguage();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* 3D Scene Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-white text-xs font-medium backdrop-blur-md border border-slate-700/80 transition-colors shadow-lg"
          title={t.vehicleViewer.resetCamera}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.vehicleViewer.resetCamera}</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 hidden sm:block pointer-events-none">
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur border border-slate-800">
          {t.vehicleViewer.orbitHint}
        </span>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3.6, 2.2, 4.2]} fov={45} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 + 0.05} // prevent going below ground
        />

        {/* Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 4, -5]} intensity={0.6} />
        <pointLight position={[0, -1, 0]} intensity={0.4} color="#38bdf8" />

        {/* Circular Technical Ground Grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <circleGeometry args={[5, 32]} />
          <meshStandardMaterial color="#0b1120" roughness={0.9} />
        </mesh>
        <gridHelper args={[10, 20, '#0ea5e9', '#1e293b']} position={[0, -0.59, 0]} />

        <Suspense fallback={null}>
          <ProceduralCarModel
            powertrain={powertrain}
            exploded={exploded}
            cutaway={cutaway}
            selectedComponent={selectedComponent}
            onSelectComponent={onSelectComponent}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
