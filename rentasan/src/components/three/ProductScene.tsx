'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function SpinningBox({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.8;
  });
  return (
    <Float speed={1.5} floatIntensity={1}>
      <mesh ref={ref}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>
      <mesh>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial color={color} opacity={0.15} transparent />
      </mesh>
    </Float>
  );
}

export default function ProductScene({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color={color} />
      <Stars radius={50} depth={30} count={1000} factor={3} fade speed={1} />
      <SpinningBox color={color} />
    </Canvas>
  );
}
