"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

interface D8Node {
  id: string;
  name: string;
  shortName: string;
  position: { x: number; y: number; z: number };
  features: string[];
  status: 'idle' | 'processing' | 'completed' | 'error';
  connections: string[];
  color: string;
  type: 'core' | 'support';
}

interface EcosystemVisualizationProps {
  nodes: D8Node[];
  activeNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}

const NodeComponent: React.FC<{
  node: D8Node;
  isActive: boolean;
  onClick: () => void;
}> = ({ node, isActive, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const { theme } = useTheme();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      if (isActive) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        );
      }
    }
  });

  const nodeSize = node.type === 'core' ? 2.0 : 1.2;
  const nodeColor = isActive ? '#00ff00' : node.color;

  return (
    <group position={[node.position.x, node.position.y, node.position.z]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? nodeSize * 1.1 : nodeSize}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={nodeColor}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      <Html
        position={[0, nodeSize * 0.8, 0]}
        center
        distanceFactor={8}
        occlude={false}
      >
        <div className="pointer-events-none">
          <div className="bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg px-4 py-3 shadow-2xl max-w-xs">
            <h3 className="text-2xl font-bold text-white mb-2">{node.shortName}</h3>
            {node.type === 'core' && (
              <div className="space-y-1">
                {node.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="text-base text-blue-300">
                    • {feature}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Html>

      {hovered && (
        <Html
          position={[nodeSize * 1.5, 0, 0]}
          center
          distanceFactor={6}
          occlude={false}
        >
          <div className="pointer-events-none">
            <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-500/50 rounded-xl px-6 py-4 shadow-2xl max-w-sm">
              <h3 className="text-lg font-bold text-white mb-3">{node.name}</h3>
              <div className="space-y-2">
                {node.features.map((feature, index) => (
                  <div key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const ConnectionLine: React.FC<{
  from: D8Node;
  to: D8Node;
  isActive: boolean;
}> = ({ from, to, isActive }) => {
  const points = useMemo(() => [
    new THREE.Vector3(from.position.x, from.position.y, from.position.z),
    new THREE.Vector3(to.position.x, to.position.y, to.position.z),
  ], [from.position, to.position]);

  return (
    <Line
      points={points}
      color={isActive ? '#00ff00' : '#3b82f6'}
      lineWidth={isActive ? 6 : 4}
      transparent
      opacity={isActive ? 0.8 : 0.4}
    />
  );
};

const EcosystemScene: React.FC<{
  nodes: D8Node[];
  activeNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}> = ({ nodes, activeNodeId, onNodeClick }) => {
  const { theme } = useTheme();
  const connections = useMemo(() => {
    const lines: Array<{ from: D8Node; to: D8Node; isActive: boolean }> = [];
    
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          const isActive = activeNodeId === node.id || activeNodeId === targetNode.id;
          lines.push({
            from: node,
            to: targetNode,
            isActive
          });
        }
      });
    });
    
    return lines;
  }, [nodes, activeNodeId]);

  // Adjust lighting based on theme
  const ambientIntensity = theme === 'dark' ? 0.3 : 0.6;
  const pointLightIntensity = theme === 'dark' ? 1 : 0.8;
  const directionalIntensity = theme === 'dark' ? 0.8 : 1.2;

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[10, 10, 10]} intensity={pointLightIntensity} />
      <pointLight position={[-10, -10, -10]} intensity={pointLightIntensity * 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={directionalIntensity} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={50}
        minDistance={10}
      />
      
      {connections.map((connection, index) => (
        <ConnectionLine
          key={`${connection.from.id}-${connection.to.id}-${index}`}
          from={connection.from}
          to={connection.to}
          isActive={connection.isActive}
        />
      ))}
      
      {nodes.map(node => (
        <NodeComponent
          key={node.id}
          node={node}
          isActive={activeNodeId === node.id}
          onClick={() => onNodeClick(node.id)}
        />
      ))}
    </>
  );
};

const EcosystemVisualization: React.FC<EcosystemVisualizationProps> = ({
  nodes,
  activeNodeId,
  onNodeClick
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <EcosystemScene
        nodes={nodes}
        activeNodeId={activeNodeId}
        onNodeClick={onNodeClick}
      />
    </Canvas>
  );
};

export default EcosystemVisualization;