import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PowertrainType, SystemId } from '../../types/automotive.js';

interface ProceduralCarModelProps {
  powertrain: PowertrainType;
  exploded: boolean;
  cutaway: boolean;
  selectedComponent: string | null;
  onSelectComponent: (componentId: string, systemId: SystemId) => void;
}

export const ProceduralCarModel: React.FC<ProceduralCarModelProps> = ({
  powertrain,
  exploded,
  cutaway,
  selectedComponent,
  onSelectComponent,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Smooth explosion interpolation multiplier (0 = normal, 1 = exploded)
  const explosionRef = useRef(0);
  useFrame((_, delta) => {
    const target = exploded ? 1 : 0;
    explosionRef.current = THREE.MathUtils.damp(explosionRef.current, target, 4, delta);
  });

  const exp = explosionRef.current;

  // Helper for component interactive hover & click
  const getMaterial = (id: string, baseColor: string, isMetal = true, roughness = 0.4) => {
    const isSelected = selectedComponent === id;
    const isHovered = hovered === id;

    let color = baseColor;
    let emissive = '#000000';
    let emissiveIntensity = 0;

    if (isSelected) {
      color = '#00e5ff';
      emissive = '#00b4d8';
      emissiveIntensity = 0.7;
    } else if (isHovered) {
      emissive = '#38bdf8';
      emissiveIntensity = 0.4;
    }

    return (
      <meshStandardMaterial
        color={color}
        metalness={isMetal ? 0.7 : 0.2}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    );
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. CHASSIS / UNIBODY PLATFORM */}
      <group position={[0, -0.15 - exp * 0.4, 0]}>
        <mesh
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent('chassis-floor', 'body');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered('chassis-floor');
          }}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[1.7, 0.15, 3.8]} />
          {getMaterial('chassis-floor', '#334155', true, 0.5)}
        </mesh>
        {/* Longitudinal Subframe Rails */}
        <mesh position={[-0.6, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.12, 3.6]} />
          {getMaterial('chassis-rails', '#1e293b', true, 0.4)}
        </mesh>
        <mesh position={[0.6, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.12, 3.6]} />
          {getMaterial('chassis-rails', '#1e293b', true, 0.4)}
        </mesh>
      </group>

      {/* 2. POWERTRAIN: ICE vs EV */}
      {powertrain === 'ice' ? (
        <group position={[0, 0.35 + exp * 0.6, 1.1 + exp * 0.4]}>
          {/* Engine V6 Cylinder Block */}
          <mesh
            castShadow
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('cylinder-block', 'engine');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('cylinder-block');
            }}
            onPointerOut={() => setHovered(null)}
          >
            <boxGeometry args={[0.65, 0.55, 0.75]} />
            {getMaterial('cylinder-block', '#ea580c', true, 0.3)}
          </mesh>
          {/* Cylinder Head Cover */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.6, 0.15, 0.7]} />
            {getMaterial('cylinder-head', '#c2410c', true, 0.2)}
          </mesh>
          {/* Turbocharger */}
          <mesh position={[0.42, 0.1, -0.1]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.2, 16]} />
            {getMaterial('turbocharger', '#94a3b8', true, 0.2)}
          </mesh>
        </group>
      ) : (
        /* EV DUAL ELECTRIC MOTORS & HIGH VOLTAGE BATTERY PACK */
        <>
          {/* Skateboard High-Voltage Battery Pack */}
          <group position={[0, -0.05, 0]}>
            <mesh
              castShadow
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent('ev-battery', 'electrical');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('ev-battery');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <boxGeometry args={[1.5, 0.18, 2.4]} />
              {getMaterial('ev-battery', '#0284c7', true, 0.3)}
            </mesh>
          </group>

          {/* Front EV Motor & Inverter */}
          <group position={[0, 0.15 + exp * 0.5, 1.2 + exp * 0.4]}>
            <mesh
              castShadow
              rotation={[0, 0, Math.PI / 2]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent('electric-motor', 'engine');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('electric-motor');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <cylinderGeometry args={[0.22, 0.22, 0.55, 24]} />
              {getMaterial('electric-motor', '#06b6d4', true, 0.3)}
            </mesh>
            {/* SiC Inverter Housing */}
            <mesh position={[0, 0.26, 0]}>
              <boxGeometry args={[0.4, 0.14, 0.4]} />
              {getMaterial('ev-inverter', '#e0f2fe', true, 0.2)}
            </mesh>
          </group>

          {/* Rear EV Motor */}
          <group position={[0, 0.15 + exp * 0.5, -1.2 - exp * 0.4]}>
            <mesh
              castShadow
              rotation={[0, 0, Math.PI / 2]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent('electric-motor', 'engine');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('electric-motor');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <cylinderGeometry args={[0.22, 0.22, 0.55, 24]} />
              {getMaterial('electric-motor', '#06b6d4', true, 0.3)}
            </mesh>
          </group>
        </>
      )}

      {/* 3. TRANSMISSION & DRIVETRAIN (for ICE) */}
      {powertrain === 'ice' && (
        <>
          {/* Gearbox Bellhousing & Case */}
          <group position={[0, 0.22 + exp * 0.4, 0.45]}>
            <mesh
              castShadow
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent('gearbox-geartrain', 'transmission');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('gearbox-geartrain');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <boxGeometry args={[0.45, 0.4, 0.65]} />
              {getMaterial('gearbox-geartrain', '#3b82f6', true, 0.4)}
            </mesh>
          </group>

          {/* Longitudinal Driveshaft */}
          <mesh
            position={[0, 0.05, -0.35]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('driveshaft', 'transmission');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('driveshaft');
            }}
            onPointerOut={() => setHovered(null)}
          >
            <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
            {getMaterial('driveshaft', '#60a5fa', true, 0.2)}
          </mesh>

          {/* Rear Axle Differential Pumpkin */}
          <group position={[0, 0.12 - exp * 0.3, -1.25]}>
            <mesh
              castShadow
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent('differential', 'transmission');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('differential');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              {getMaterial('differential', '#2563eb', true, 0.3)}
            </mesh>
            {/* Rear Half-shafts */}
            <mesh position={[-0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.65, 12]} />
              {getMaterial('rear-halfshaft', '#64748b', true, 0.3)}
            </mesh>
            <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.65, 12]} />
              {getMaterial('rear-halfshaft', '#64748b', true, 0.3)}
            </mesh>
          </group>
        </>
      )}

      {/* 4. SUSPENSION SPRINGS & DAMPERS (4 Corners) */}
      {[
        { x: -0.75 - exp * 0.5, z: 1.25, side: 'FL' },
        { x: 0.75 + exp * 0.5, z: 1.25, side: 'FR' },
        { x: -0.75 - exp * 0.5, z: -1.25, side: 'RL' },
        { x: 0.75 + exp * 0.5, z: -1.25, side: 'RR' },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.25, pos.z]}>
          {/* Coil Spring Strut */}
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('springs', 'suspension');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('springs');
            }}
            onPointerOut={() => setHovered(null)}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.45, 16]} />
            {getMaterial('springs', '#10b981', true, 0.3)}
          </mesh>
          {/* Lower Wishbone / Control Arm */}
          <mesh position={[pos.x > 0 ? -0.15 : 0.15, -0.22, 0]} rotation={[0, 0, pos.x > 0 ? 0.2 : -0.2]}>
            <boxGeometry args={[0.3, 0.04, 0.18]} />
            {getMaterial('control-arms', '#059669', true, 0.4)}
          </mesh>
        </group>
      ))}

      {/* 5. BRAKE DISCS & CALIPERS (4 Corners) */}
      {[
        { x: -0.92 - exp * 0.6, z: 1.25, rotY: Math.PI / 2 },
        { x: 0.92 + exp * 0.6, z: 1.25, rotY: -Math.PI / 2 },
        { x: -0.92 - exp * 0.6, z: -1.25, rotY: Math.PI / 2 },
        { x: 0.92 + exp * 0.6, z: -1.25, rotY: -Math.PI / 2 },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.05, pos.z]} rotation={[0, pos.rotY, 0]}>
          {/* Vented Brake Rotor Disc */}
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('brake-rotor', 'brakes');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('brake-rotor');
            }}
            onPointerOut={() => setHovered(null)}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />
            {getMaterial('brake-rotor', '#cbd5e1', true, 0.15)}
          </mesh>
          {/* Brake Caliper */}
          <mesh
            position={[0, 0.15, 0.03]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('brake-caliper', 'brakes');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('brake-caliper');
            }}
            onPointerOut={() => setHovered(null)}
          >
            <boxGeometry args={[0.12, 0.1, 0.07]} />
            {getMaterial('brake-caliper', '#ef4444', true, 0.3)}
          </mesh>
        </group>
      ))}

      {/* 6. STEERING MECHANISM (Front) */}
      <group position={[0, 0.08, 1.05 + exp * 0.4]}>
        {/* Rack & Pinion Bar */}
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent('rack-and-pinion', 'steering');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered('rack-and-pinion');
          }}
          onPointerOut={() => setHovered(null)}
        >
          <cylinderGeometry args={[0.035, 0.035, 1.4 + exp * 0.6, 16]} />
          {getMaterial('rack-and-pinion', '#06b6d4', true, 0.3)}
        </mesh>
        {/* Steering Column Angling to Cabin */}
        <mesh position={[-0.25, 0.25, -0.25]} rotation={[0.6, 0.1, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 12]} />
          {getMaterial('steering-column', '#0891b2', true, 0.3)}
        </mesh>
      </group>

      {/* 7. WHEELS & TIRES (4 Corners) */}
      {[
        { x: -0.98 - exp * 0.7, z: 1.25 },
        { x: 0.98 + exp * 0.7, z: 1.25 },
        { x: -0.98 - exp * 0.7, z: -1.25 },
        { x: 0.98 + exp * 0.7, z: -1.25 },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.05, pos.z]} rotation={[0, 0, Math.PI / 2]}>
          {/* Rubber Tire */}
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.34, 0.11, 16, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Alloy Wheel Rim */}
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.18, 24]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 8. RIGID PASSENGER SAFETY CELL & BODY SHELL */}
      <group position={[0, 0.45 + exp * 0.8, 0]}>
        {/* Safety Cell Pillars & Roof Cage */}
        <mesh
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent('safety-cell', 'body');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered('safety-cell');
          }}
          onPointerOut={() => setHovered(null)}
        >
          {/* Roof and Pillars Frame */}
          <boxGeometry args={[1.45, 0.7, 2.2]} />
          <meshStandardMaterial
            color={cutaway ? '#38bdf8' : '#1e293b'}
            metalness={0.5}
            roughness={0.3}
            wireframe={cutaway}
            transparent={cutaway}
            opacity={cutaway ? 0.25 : 0.95}
          />
        </mesh>

        {/* Aerodynamic Outer Body Silhouette (Cutaway toggles visibility) */}
        {!cutaway && (
          <group position={[0, -0.15, 0]}>
            {/* Hood / Bonnet */}
            <mesh position={[0, -0.05, 1.3]}>
              <boxGeometry args={[1.65, 0.25, 1.2]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Trunk / Rear deck */}
            <mesh position={[0, -0.05, -1.3]}>
              <boxGeometry args={[1.65, 0.25, 1.0]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};
