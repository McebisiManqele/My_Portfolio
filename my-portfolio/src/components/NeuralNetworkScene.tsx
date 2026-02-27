'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere, MeshDistortMaterial, Sparkles, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '@/context/SceneContext';
import { projects } from '@/lib/projects';

export default function NeuralNetworkScene() {
  const { hoveredNodeId, cameraMode } = useScene();
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  const nodes = useMemo(() => {
    return projects.map(project => ({
      id: project.id,
      position: new THREE.Vector3(
        project.coordinates.x,
        project.coordinates.y,
        project.coordinates.z
      ),
      color: project.color
    }));
  }, []);

  const connections = useMemo(() => {
    const conns: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          conns.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return conns;
  }, [nodes]);

  useEffect(() => {
    if (cameraMode === 'home') {
      camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.1);
    } else {
      camera.position.lerp(new THREE.Vector3(-8, 2, 12), 0.1);
    }
  }, [cameraMode, camera]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    pulseRef.current += delta;
  });

  return (
    <>
      <Sparkles count={300} scale={40} size={3} speed={0.4} opacity={0.6} color="#00ffcc" />
      <Sparkles count={100} scale={40} size={2} speed={0.2} opacity={0.3} color="#ff00ff" />
      
      <group ref={groupRef}>
        {/* Central core with distortion and float */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#00ffcc"
              emissive="#00ffcc"
              emissiveIntensity={1}
              distort={0.4}
              speed={3}
              roughness={0.1}
              metalness={1}
            />
          </Sphere>
        </Float>
        
        {/* Core energy rings */}
        {[1.5, 2, 2.5].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, pulseRef.current * (i + 1) * 0.2]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial
              color="#00ffcc"
              transparent
              opacity={0.3 - i * 0.1}
            />
          </mesh>
        ))}
        
        {/* Core glow layers */}
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#00ffcc"
            transparent
            opacity={0.15}
          />
        </Sphere>
        <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#00ffcc"
            transparent
            opacity={0.05}
          />
        </Sphere>

        {/* Project nodes with trails */}
        {nodes.map((node, idx) => {
          const isHovered = hoveredNodeId === node.id;
          const scale = isHovered ? 2 : 1;
          const intensity = isHovered ? 2 : 0.6;

          return (
            <Float key={node.id} speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
              <Trail
                width={isHovered ? 3 : 1}
                length={8}
                color={new THREE.Color(node.color)}
                attenuation={(t) => t * t}
              >
                <group position={node.position}>
                  {/* Main sphere */}
                  <Sphere args={[0.5 * scale, 32, 32]}>
                    <meshStandardMaterial
                      color={node.color}
                      emissive={node.color}
                      emissiveIntensity={intensity}
                      roughness={0.2}
                      metalness={0.9}
                    />
                  </Sphere>
                  
                  {/* Inner glow */}
                  <Sphere args={[0.7 * scale, 16, 16]}>
                    <meshBasicMaterial
                      color={node.color}
                      transparent
                      opacity={isHovered ? 0.4 : 0.15}
                    />
                  </Sphere>
                  
                  {/* Outer glow */}
                  <Sphere args={[0.9 * scale, 16, 16]}>
                    <meshBasicMaterial
                      color={node.color}
                      transparent
                      opacity={isHovered ? 0.2 : 0.08}
                    />
                  </Sphere>
                  
                  {/* Rotating rings */}
                  <mesh rotation={[Math.PI / 2, 0, pulseRef.current * 2]}>
                    <ringGeometry args={[0.6, 0.7, 32]} />
                    <meshBasicMaterial
                      color={node.color}
                      transparent
                      opacity={Math.sin(pulseRef.current * 3) * 0.4 + 0.3}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                  <mesh rotation={[Math.PI / 2, 0, -pulseRef.current * 1.5]}>
                    <ringGeometry args={[0.8, 0.9, 32]} />
                    <meshBasicMaterial
                      color={node.color}
                      transparent
                      opacity={Math.sin(pulseRef.current * 3 + 1) * 0.3 + 0.2}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                  
                  {/* Particle burst on hover */}
                  {isHovered && (
                    <Sparkles count={20} scale={2} size={2} speed={0.5} color={node.color} />
                  )}
                </group>
              </Trail>
            </Float>
          );
        })}

        {/* Enhanced connections */}
        {connections.map((conn, i) => (
          <Line
            key={i}
            points={conn}
            color="#00ffcc"
            lineWidth={1}
            transparent
            opacity={0.25}
            dashed
            dashScale={50}
            dashSize={1}
            gapSize={0.5}
          />
        ))}

        {/* Animated neural pulse lines */}
        {nodes.map((node, i) => {
          const pulseOpacity = Math.max(0, Math.sin(pulseRef.current * 2 - i * 0.5) * 0.5);
          return (
            <Line
              key={`pulse-${i}`}
              points={[new THREE.Vector3(0, 0, 0), node.position]}
              color={node.color}
              lineWidth={1.5}
              transparent
              opacity={pulseOpacity}
            />
          );
        })}
      </group>
    </>
  );
}
