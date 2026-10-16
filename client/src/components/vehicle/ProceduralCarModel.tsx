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

  // Smooth explosion interpolation multiplier (0 = normal, 1 = fully exploded)
  const explosionRef = useRef(0);
  useFrame((_, delta) => {
    const target = exploded ? 1 : 0;
    explosionRef.current = THREE.MathUtils.damp(explosionRef.current, target, 4.5, delta);
  });

  const exp = explosionRef.current;

  // Helper for component interactive hover & selection styling
  const getMaterial = (
    id: string,
    baseColor: string,
    isMetal = true,
    roughness = 0.35,
    opacity = 1.0,
    transparent = false
  ) => {
    const isSelected = selectedComponent === id;
    const isHovered = hovered === id;

    let color = baseColor;
    let emissive = '#000000';
    let emissiveIntensity = 0;

    if (isSelected) {
      color = '#00f0ff';
      emissive = '#00b4d8';
      emissiveIntensity = 0.85;
    } else if (isHovered) {
      emissive = '#38bdf8';
      emissiveIntensity = 0.5;
    }

    return (
      <meshStandardMaterial
        color={color}
        metalness={isMetal ? 0.75 : 0.15}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        transparent={transparent || opacity < 1.0}
        opacity={opacity}
      />
    );
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. CHASSIS / SPACE-FRAME (OPEN PERIMETER ARCHITECTURE)        */}
      {/* ============================================================== */}
      <group position={[0, -0.15 - exp * 0.5, 0]}>
        {/* Left Subframe Longitudinal Rail */}
        <mesh
          castShadow
          position={[-0.68, 0, 0]}
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
          <boxGeometry args={[0.12, 0.1, 3.6]} />
          {getMaterial('chassis-floor', '#475569', true, 0.3)}
        </mesh>

        {/* Right Subframe Longitudinal Rail */}
        <mesh
          castShadow
          position={[0.68, 0, 0]}
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
          <boxGeometry args={[0.12, 0.1, 3.6]} />
          {getMaterial('chassis-floor', '#475569', true, 0.3)}
        </mesh>

        {/* Front Structural Crossmember */}
        <mesh position={[0, 0, 1.25]}>
          <boxGeometry args={[1.4, 0.08, 0.15]} />
          {getMaterial('chassis-crossmember-front', '#334155', true, 0.4)}
        </mesh>

        {/* Center Structural Crossmember */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.08, 0.15]} />
          {getMaterial('chassis-crossmember-center', '#334155', true, 0.4)}
        </mesh>

        {/* Rear Structural Crossmember */}
        <mesh position={[0, 0, -1.25]}>
          <boxGeometry args={[1.4, 0.08, 0.15]} />
          {getMaterial('chassis-crossmember-rear', '#334155', true, 0.4)}
        </mesh>

        {/* Central Driveshaft / Battery Tunnel Structure */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.22, 0.08, 2.6]} />
          {getMaterial('chassis-tunnel', '#1e293b', true, 0.5)}
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. POWERTRAIN: INTERNAL COMBUSTION ENGINE vs EV DUAL-MOTOR    */}
      {/* ============================================================== */}
      {powertrain === 'ice' ? (
        <group position={[0, 0.35 + exp * 0.8, 1.1 + exp * 0.5]}>
          {/* V6 Engine Cylinder Block (Brushed Cast Aluminum) */}
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
            <boxGeometry args={[0.62, 0.45, 0.72]} />
            {getMaterial('cylinder-block', '#ea580c', true, 0.25)}
          </mesh>

          {/* Left Cylinder Head with Cam Cover (V-Angle Left) */}
          <mesh position={[-0.18, 0.28, 0]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.26, 0.14, 0.68]} />
            {getMaterial('cylinder-head-l', '#c2410c', true, 0.2)}
          </mesh>

          {/* Right Cylinder Head with Cam Cover (V-Angle Right) */}
          <mesh position={[0.18, 0.28, 0]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.26, 0.14, 0.68]} />
            {getMaterial('cylinder-head-r', '#c2410c', true, 0.2)}
          </mesh>

          {/* Polished Intake Manifold Plenum (Top Center) */}
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[0.28, 0.1, 0.5]} />
            {getMaterial('intake-plenum', '#94a3b8', true, 0.15)}
          </mesh>

          {/* 6 Curved Intake Runners */}
          {[-0.18, 0, 0.18].map((z, idx) => (
            <React.Fragment key={idx}>
              <mesh position={[-0.16, 0.32, z]} rotation={[0, 0, 0.6]}>
                <cylinderGeometry args={[0.025, 0.025, 0.16, 12]} />
                {getMaterial('intake-runner', '#cbd5e1', true, 0.1)}
              </mesh>
              <mesh position={[0.16, 0.32, z]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.025, 0.025, 0.16, 12]} />
                {getMaterial('intake-runner', '#cbd5e1', true, 0.1)}
              </mesh>
            </React.Fragment>
          ))}

          {/* Front Timing Belt Pulley System */}
          <group position={[0, 0, 0.38]}>
            <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
              {getMaterial('crank-pulley', '#334155', true, 0.2)}
            </mesh>
            <mesh position={[-0.15, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
              {getMaterial('cam-pulley-l', '#334155', true, 0.2)}
            </mesh>
            <mesh position={[0.15, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
              {getMaterial('cam-pulley-r', '#334155', true, 0.2)}
            </mesh>
          </group>

          {/* Twin-Scroll Turbocharger & Wastegate (Right Side) */}
          <group
            position={[0.42, 0.05, -0.1]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('turbocharger', 'engine');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('turbocharger');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Turbine Housing (Hot Exhaust Side - Bronze/Titanium) */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.14, 0.14, 20]} />
              {getMaterial('turbocharger', '#d97706', true, 0.2)}
            </mesh>
            {/* Compressor Housing (Cold Induction Side - Silver) */}
            <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.14, 0.1, 0.12, 20]} />
              {getMaterial('turbo-compressor', '#94a3b8', true, 0.15)}
            </mesh>
          </group>

          {/* Dual Chrome Exhaust Pipes Leading Backward */}
          <mesh position={[-0.22, -0.18, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 1.4, 16]} />
            {getMaterial('exhaust-pipe', '#cbd5e1', true, 0.1)}
          </mesh>
          <mesh position={[0.22, -0.18, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 1.4, 16]} />
            {getMaterial('exhaust-pipe', '#cbd5e1', true, 0.1)}
          </mesh>
        </group>
      ) : (
        /* EV DUAL PERMANENT MAGNET SYNCHRONOUS MOTORS & BATTERY */
        <>
          {/* Skateboard High-Voltage Lithium-Ion Battery Pack */}
          <group position={[0, -0.04 - exp * 0.4, 0]}>
            {/* Battery Aluminum Protective Shell */}
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
              <boxGeometry args={[1.42, 0.16, 2.3]} />
              {getMaterial('ev-battery', '#0284c7', true, 0.25)}
            </mesh>

            {/* Internal Modular Battery Cell Banks (Visible on Top Surface) */}
            {[-0.7, -0.2, 0.3, 0.8].map((z, i) => (
              <mesh key={i} position={[0, 0.09, z]}>
                <boxGeometry args={[1.28, 0.02, 0.36]} />
                {getMaterial('battery-cells', '#38bdf8', true, 0.4)}
              </mesh>
            ))}

            {/* High-Voltage Orange Connection Busbars */}
            <mesh position={[0, 0.1, 1.18]}>
              <boxGeometry args={[0.3, 0.05, 0.08]} />
              {getMaterial('hv-busbar', '#f97316', false, 0.2)}
            </mesh>
          </group>

          {/* Front Electric Traction Motor & SiC Inverter */}
          <group position={[0, 0.15 + exp * 0.7, 1.25 + exp * 0.5]}>
            {/* Cylindrical Motor Stator Housing with Cooling Fins */}
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
              <cylinderGeometry args={[0.24, 0.24, 0.56, 32]} />
              {getMaterial('electric-motor', '#06b6d4', true, 0.2)}
            </mesh>

            {/* Exposed Copper End-Turn Windings (Visual Realism) */}
            <mesh position={[-0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
              {getMaterial('motor-windings', '#f59e0b', true, 0.15)}
            </mesh>
            <mesh position={[0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
              {getMaterial('motor-windings', '#f59e0b', true, 0.15)}
            </mesh>

            {/* Silicon Carbide (SiC) Inverter Module */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[0.42, 0.16, 0.42]} />
              {getMaterial('ev-inverter', '#e0f2fe', true, 0.15)}
            </mesh>

            {/* High-Voltage Orange Cables */}
            <mesh position={[0, 0.18, -0.22]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.22, 12]} />
              {getMaterial('hv-cable', '#f97316', false, 0.3)}
            </mesh>
          </group>

          {/* Rear Electric Traction Motor & Reduction Gearbox */}
          <group position={[0, 0.15 + exp * 0.7, -1.25 - exp * 0.5]}>
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
              <cylinderGeometry args={[0.24, 0.24, 0.56, 32]} />
              {getMaterial('electric-motor', '#06b6d4', true, 0.2)}
            </mesh>

            {/* Rear Integrated Inverter Module */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[0.42, 0.16, 0.42]} />
              {getMaterial('ev-inverter', '#e0f2fe', true, 0.15)}
            </mesh>
          </group>
        </>
      )}

      {/* ============================================================== */}
      {/* 3. TRANSMISSION & DRIVETRAIN (FOR ICE)                          */}
      {/* ============================================================== */}
      {powertrain === 'ice' && (
        <>
          {/* Automatic / Dual-Clutch Transmission Gearbox */}
          <group position={[0, 0.22 + exp * 0.5, 0.42]}>
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
              <boxGeometry args={[0.44, 0.38, 0.68]} />
              {getMaterial('gearbox-geartrain', '#3b82f6', true, 0.35)}
            </mesh>
            {/* Bellhousing Flange to Engine */}
            <mesh position={[0, 0, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.22, 0.06, 24]} />
              {getMaterial('bellhousing', '#2563eb', true, 0.3)}
            </mesh>
          </group>

          {/* Polished Chrome Driveshaft with Universal Joints */}
          <group position={[0, 0.06, -0.36]}>
            <mesh
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
              <cylinderGeometry args={[0.038, 0.038, 1.25, 20]} />
              {getMaterial('driveshaft', '#60a5fa', true, 0.15)}
            </mesh>
            {/* Front & Rear U-Joint Couplers */}
            <mesh position={[0, 0, 0.62]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              {getMaterial('ujoint-front', '#1e293b', true, 0.2)}
            </mesh>
            <mesh position={[0, 0, -0.62]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              {getMaterial('ujoint-rear', '#1e293b', true, 0.2)}
            </mesh>
          </group>

          {/* Rear Differential Axle Housing ("Pumpkin") */}
          <group position={[0, 0.1 - exp * 0.3, -1.25]}>
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
              <sphereGeometry args={[0.19, 20, 20]} />
              {getMaterial('differential', '#1d4ed8', true, 0.3)}
            </mesh>

            {/* Left & Right Rear Axle Half-Shafts with Rubber CV Boots */}
            <mesh position={[-0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.032, 0.032, 0.68, 16]} />
              {getMaterial('rear-halfshaft', '#64748b', true, 0.25)}
            </mesh>
            <mesh position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.032, 0.032, 0.68, 16]} />
              {getMaterial('rear-halfshaft', '#64748b', true, 0.25)}
            </mesh>
            {/* Rubber CV Joint Boots */}
            <mesh position={[-0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
              {getMaterial('cv-boot', '#0f172a', false, 0.8)}
            </mesh>
            <mesh position={[0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
              {getMaterial('cv-boot', '#0f172a', false, 0.8)}
            </mesh>
          </group>
        </>
      )}

      {/* ============================================================== */}
      {/* 4. SUSPENSION SPRINGS & STRUTS (4 CORNERS)                    */}
      {/* ============================================================== */}
      {[
        { x: -0.74 - exp * 0.6, z: 1.25, isRight: false },
        { x: 0.74 + exp * 0.6, z: 1.25, isRight: true },
        { x: -0.74 - exp * 0.6, z: -1.25, isRight: false },
        { x: 0.74 + exp * 0.6, z: -1.25, isRight: true },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.22, pos.z]}>
          {/* Emerald Green Coil Spring Cylinder */}
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
            <cylinderGeometry args={[0.085, 0.085, 0.48, 20]} />
            {getMaterial('springs', '#10b981', true, 0.2)}
          </mesh>

          {/* Chrome Inner Damper Piston Rod */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.52, 16]} />
            {getMaterial('damper-shaft', '#f8fafc', true, 0.05)}
          </mesh>

          {/* Lower Wishbone / A-Arm Control Arm */}
          <mesh
            position={[pos.isRight ? -0.16 : 0.16, -0.22, 0]}
            rotation={[0, 0, pos.isRight ? 0.18 : -0.18]}
          >
            <boxGeometry args={[0.32, 0.04, 0.2]} />
            {getMaterial('control-arms', '#059669', true, 0.35)}
          </mesh>

          {/* Upper Strut Mount Top Hat */}
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
            {getMaterial('strut-hat', '#334155', true, 0.3)}
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 5. VENTILATED BRAKE ROTORS & SPORT CALIPERS (4 CORNERS)       */}
      {/* ============================================================== */}
      {[
        { x: -0.92 - exp * 0.75, z: 1.25, rotY: Math.PI / 2 },
        { x: 0.92 + exp * 0.75, z: 1.25, rotY: -Math.PI / 2 },
        { x: -0.92 - exp * 0.75, z: -1.25, rotY: Math.PI / 2 },
        { x: 0.92 + exp * 0.75, z: -1.25, rotY: -Math.PI / 2 },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.05, pos.z]} rotation={[0, pos.rotY, 0]}>
          {/* Ventilated Steel Brake Rotor Disc */}
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
            <cylinderGeometry args={[0.24, 0.24, 0.035, 36]} />
            {getMaterial('brake-rotor', '#cbd5e1', true, 0.1)}
          </mesh>

          {/* Rotor Center Hub Hat */}
          <mesh position={[0, 0, 0.025]}>
            <cylinderGeometry args={[0.11, 0.11, 0.03, 24]} />
            {getMaterial('rotor-hub', '#475569', true, 0.2)}
          </mesh>

          {/* High-Performance Red Brake Caliper */}
          <mesh
            position={[0, 0.15, 0.04]}
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
            <boxGeometry args={[0.13, 0.11, 0.08]} />
            {getMaterial('brake-caliper', '#ef4444', true, 0.25)}
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 6. STEERING SYSTEM (FRONT RACK, PINION, TIE RODS, COLUMN)     */}
      {/* ============================================================== */}
      <group position={[0, 0.06, 1.05 + exp * 0.5]}>
        {/* Main Steering Rack & Pinion Housing */}
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
          <cylinderGeometry args={[0.04, 0.04, 1.45 + exp * 0.8, 20]} />
          {getMaterial('rack-and-pinion', '#06b6d4', true, 0.25)}
        </mesh>

        {/* Rubber Accordion Gaiter Boots */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.14, 12]} />
          {getMaterial('steering-boot', '#0f172a', false, 0.8)}
        </mesh>
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.14, 12]} />
          {getMaterial('steering-boot', '#0f172a', false, 0.8)}
        </mesh>

        {/* Angled Steering Column Leading into Cabin */}
        <mesh position={[-0.28, 0.28, -0.26]} rotation={[0.65, 0.1, 0]}>
          <cylinderGeometry args={[0.026, 0.026, 0.65, 14]} />
          {getMaterial('steering-column', '#0891b2', true, 0.25)}
        </mesh>

        {/* 3-Spoke Sport Steering Wheel in Cabin */}
        <group position={[-0.32, 0.52, -0.48]} rotation={[0.65, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.15, 0.018, 12, 24]} />
            {getMaterial('steering-wheel', '#0f172a', false, 0.4)}
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 7. WHEELS & TIRES (OPEN ALLOY 5-SPOKE RIMS FOR ROTOR SIGHT)   */}
      {/* ============================================================== */}
      {[
        { x: -0.98 - exp * 0.85, z: 1.25, rotY: Math.PI },
        { x: 0.98 + exp * 0.85, z: 1.25, rotY: 0 },
        { x: -0.98 - exp * 0.85, z: -1.25, rotY: Math.PI },
        { x: 0.98 + exp * 0.85, z: -1.25, rotY: 0 },
      ].map((pos, idx) => (
        <group key={idx} position={[pos.x, 0.05, pos.z]} rotation={[0, pos.rotY, Math.PI / 2]}>
          {/* Black Rubber Tire with Tread */}
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.35, 0.11, 16, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.92} metalness={0.05} />
          </mesh>

          {/* Wheel Alloy Outer Barrel */}
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 24]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* 5-Spoke Sport Star Rim (Allows Clear View to Brake Rotor Inside) */}
          {Array.from({ length: 5 }).map((_, spokeIdx) => (
            <mesh
              key={spokeIdx}
              position={[0, 0.07, 0]}
              rotation={[0, (spokeIdx * Math.PI * 2) / 5, 0]}
            >
              <boxGeometry args={[0.04, 0.02, 0.24]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.15} />
            </mesh>
          ))}
          {/* Center Wheel Hub Cap */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 8. PASSENGER SAFETY CELL & HIGH-CLARITY AERODYNAMIC CANOPY     */}
      {/* ============================================================== */}
      <group position={[0, 0.48 + exp * 1.1, 0]}>
        {/* Rigid Boron-Steel Safety Roll Cage (A, B, C Pillars) */}
        <group
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
          {/* Left Roof Rail */}
          <mesh position={[-0.58, 0.32, 0]}>
            <boxGeometry args={[0.06, 0.06, 1.9]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Right Roof Rail */}
          <mesh position={[0.58, 0.32, 0]}>
            <boxGeometry args={[0.06, 0.06, 1.9]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Front Windshield Header Bar */}
          <mesh position={[0, 0.32, 0.95]}>
            <boxGeometry args={[1.22, 0.06, 0.06]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Rear Window Header Bar */}
          <mesh position={[0, 0.32, -0.95]}>
            <boxGeometry args={[1.22, 0.06, 0.06]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>

          {/* Left A-Pillar (Angled to Hood) */}
          <mesh position={[-0.62, 0.08, 1.25]} rotation={[0.62, 0, 0.15]}>
            <boxGeometry args={[0.06, 0.06, 0.72]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Right A-Pillar */}
          <mesh position={[0.62, 0.08, 1.25]} rotation={[0.62, 0, -0.15]}>
            <boxGeometry args={[0.06, 0.06, 0.72]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>

          {/* Left B-Pillar (Vertical Center) */}
          <mesh position={[-0.66, 0, 0]}>
            <boxGeometry args={[0.06, 0.65, 0.1]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Right B-Pillar */}
          <mesh position={[0.66, 0, 0]}>
            <boxGeometry args={[0.06, 0.65, 0.1]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>

          {/* Left C-Pillar (Fastback Slope) */}
          <mesh position={[-0.62, 0.08, -1.25]} rotation={[-0.58, 0, 0.15]}>
            <boxGeometry args={[0.06, 0.06, 0.75]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
          {/* Right C-Pillar */}
          <mesh position={[0.62, 0.08, -1.25]} rotation={[-0.58, 0, -0.15]}>
            <boxGeometry args={[0.06, 0.06, 0.75]} />
            {getMaterial('safety-cell', '#38bdf8', true, 0.3)}
          </mesh>
        </group>

        {/* High-Clarity Blueprint Acrylic Glass Canopy (100% Transparent Interior View) */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.38, 0.58, 2.1]} />
          <meshStandardMaterial
            color="#38bdf8"
            metalness={0.1}
            roughness={0.1}
            transparent={true}
            opacity={cutaway ? 0.08 : 0.22}
            wireframe={false}
          />
        </mesh>

        {/* Lightweight Sport Bucket Seats (Cabin Realism) */}
        <mesh position={[-0.32, -0.12, 0.1]}>
          <boxGeometry args={[0.34, 0.42, 0.38]} />
          {getMaterial('driver-seat', '#1e293b', false, 0.6)}
        </mesh>
        <mesh position={[0.32, -0.12, 0.1]}>
          <boxGeometry args={[0.34, 0.42, 0.38]} />
          {getMaterial('passenger-seat', '#1e293b', false, 0.6)}
        </mesh>
      </group>
    </group>
  );
};
