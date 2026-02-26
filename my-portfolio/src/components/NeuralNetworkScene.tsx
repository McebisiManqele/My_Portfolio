'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '@/context/SceneContext';
import { projects } from '@/lib/projects';

export default function NeuralNetworkScene() {
  const { hoveredNodeId, cameraMode } = useScene();
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  // Create nodes from projects
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

  // Create connections between nodes
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

  // Camera transitions
  useEffect(() => {
    if (cameraMode === 'home') {
      camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.1);
    } else {
      camera.position.lerp(new THREE.Vector3(-8, 2, 12), 0.1);
    }
  }, [cameraMode, camera]);

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    pulseRef.current += delta;
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Project nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const scale = isHovered ? 1.5 : 1;
        const intensity = isHovered ? 1 : 0.3;

        return (
          <group key={node.id} position={node.position}>
            <Sphere args={[0.3 * scale, 16, 16]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={intensity}
              />
            </Sphere>
            {/* Pulse ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.5, 32]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={Math.sin(pulseRef.current * 2) * 0.3 + 0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Line
          key={i}
          points={conn}
          color="#00ffcc"
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}

      {/* Neural pulse lines from center */}
      {nodes.map((node, i) => (
        <Line
          key={`pulse-${i}`}
          points={[new THREE.Vector3(0, 0, 0), node.position]}
          color="#00ffcc"
          lineWidth={2}
          transparent
          opacity={Math.max(0, Math.sin(pulseRef.current * 2 - i * 0.5) * 0.5)}
        />
      ))}
    </group>
  );
}
