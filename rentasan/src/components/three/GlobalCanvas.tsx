'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group>
      {/* Soft floating orbs for organic depth */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-10, 5, -10]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.03} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[10, -5, -8]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.02} />
        </mesh>
      </Float>
    </group>
  );
}

export default function GlobalCanvas() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <color attach="background" args={['#070A13']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F59E0B" />
        <AmbientGlow />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
