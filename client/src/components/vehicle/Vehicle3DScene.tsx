import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ProceduralCarModel } from './ProceduralCarModel.js';
import { PowertrainType, SystemId } from '../../types/automotive.js';
import { RotateCcw, Eye, Sparkles } from 'lucide-react';
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
    <div className="relative w-full h-full min-h-[480px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      {/* 3D Scene Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-white text-xs font-semibold backdrop-blur-md border border-slate-700/80 transition-colors shadow-lg active:scale-95"
          title={t.vehicleViewer.resetCamera}
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.vehicleViewer.resetCamera}</span>
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 text-[11px] font-mono border border-cyan-800/40 backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          <span>High-Visibility CAD Shader</span>
        </span>
      </div>

      <div className="absolute bottom-4 left-4 z-10 hidden sm:block pointer-events-none">
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur border border-slate-800">
          {t.vehicleViewer.orbitHint}
        </span>
      </div>

      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[3.8, 2.4, 4.4]} fov={42} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={1.8}
          maxDistance={11}
          maxPolarAngle={Math.PI / 2 + 0.05} // prevent clipping beneath floor
        />

        {/* Studio Three-Point Lighting Setup */}
        <hemisphereLight args={['#bae6fd', '#0f172a', 0.75]} />
        {/* Main Sun / Key Light */}
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-bias={-0.0005}
        />
        {/* Cool Cyan Rim Light */}
        <directionalLight position={[-6, 5, -6]} intensity={1.1} color="#38bdf8" />
        {/* Warm Fill Light */}
        <directionalLight position={[0, -2, 5]} intensity={0.5} color="#f8fafc" />
        {/* Chassis Under-Glow Reflection */}
        <pointLight position={[0, -0.4, 0]} intensity={0.6} color="#00e5ff" distance={4} />

        {/* Circular Technical Engineering Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <circleGeometry args={[5.5, 48]} />
          <meshStandardMaterial color="#080e1a" roughness={0.85} metalness={0.2} />
        </mesh>
        <gridHelper args={[11, 22, '#0ea5e9', '#1e293b']} position={[0, -0.59, 0]} />

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
