"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  ArrowRight,
  Network,
  Activity,
  Shield,
  Zap
} from 'lucide-react';
import * as THREE from 'three';

interface D8Node {
  id: string;
  name: string;
  shortName: string;
  position: { x: number; y: number; z: number };
  features: string[];
  status: 'idle' | 'processing' | 'complete';
  connections: string[];
  color: string;
  type: 'core' | 'support';
}

// Node data with better spacing and cleaner layout
const d8Nodes: D8Node[] = [
  // Core D8 Agents - better spaced for cleaner visualization
  {
    id: 'd8-forge',
    name: 'D8.FORGE',
    shortName: 'D8.FORGE',
    position: { x: -6, y: 3, z: 0 },
    features: [
      'Centralized',
      'Governance', 
      'Compliance',
      'Security'
    ],
    status: 'idle',
    connections: ['d8-sec'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-sec',
    name: 'D8.SEC',
    shortName: 'D8.SEC',
    position: { x: -2, y: 5, z: 0 },
    features: [
      'Control Plane'
    ],
    status: 'idle',
    connections: ['d8-observe', 'automation', 'supervisors'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-observe',
    name: 'D8.OBSERVE',
    shortName: 'D8.OBSERVE',
    position: { x: 4, y: 5, z: 0 },
    features: [
      'Data Integrity Agents',
      'Security',
      'Log and Graph',
      'Telemetry'
    ],
    status: 'idle',
    connections: ['consumption'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-ingest',
    name: 'D8.INGEST',
    shortName: 'D8.INGEST',
    position: { x: -6, y: 0, z: 0 },
    features: [
      'Multi-Channel Data Onboarding',
      'Self Coding',
      'Self Learning',
      'Initial Transformations',
      'Data Onboarding'
    ],
    status: 'idle',
    connections: ['d8-cat'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-cat',
    name: 'D8.CAT',
    shortName: 'D8.CAT',
    position: { x: -2, y: -3, z: 0 },
    features: [
      'Metadata Catalog',
      'Classification',
      'Tagging',
      'Compliance',
      'Access Control',
      'Self Organized',
      'Interactive'
    ],
    status: 'idle',
    connections: ['d8-curate'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-curate',
    name: 'D8.CURATE',
    shortName: 'D8.CURATE',
    position: { x: 4, y: -3, z: 0 },
    features: [
      'Data Cleaning',
      'Data Enrichment',
      'Data Gravity Resolution',
      'Domain Specification',
      'Data Preparation',
      'Data Steward'
    ],
    status: 'idle',
    connections: ['d8-flow'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-flow',
    name: 'D8.FLOW',
    shortName: 'D8.FLOW',
    position: { x: -2, y: -7, z: 0 },
    features: [
      'Orchestration Layer',
      'Pipe Line Creation',
      'Automated Data Lineage',
      'Origin and Destination Aware',
      'Autonomous'
    ],
    status: 'idle',
    connections: ['d8-stage'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-stage',
    name: 'D8.STAGE',
    shortName: 'D8.STAGE',
    position: { x: 6, y: -7, z: 0 },
    features: [
      'Data Fabric Layer',
      'Multi-Stage Organization',
      'Self Generating Agent',
      'Unified Business Access'
    ],
    status: 'idle',
    connections: ['d8-view'],
    color: '#3b82f6',
    type: 'core'
  },
  {
    id: 'd8-view',
    name: 'D8.VIEW',
    shortName: 'D8.VIEW',
    position: { x: 8, y: -2, z: 0 },
    features: [
      'Visualization',
      'Enterprise Consumption',
      'Access and Security aware',
      'Use case agent definable'
    ],
    status: 'idle',
    connections: ['consumption'],
    color: '#3b82f6',
    type: 'core'
  },
  // Supporting Components
  {
    id: 'ingestion',
    name: 'Ingestion',
    shortName: 'Ingestion',
    position: { x: -10, y: 1, z: 0 },
    features: [],
    status: 'idle',
    connections: ['d8-forge'],
    color: '#6b7280',
    type: 'support'
  },
  {
    id: 'consumption',
    name: 'Consumption',
    shortName: 'Consumption',
    position: { x: 12, y: 1, z: 0 },
    features: [],
    status: 'idle',
    connections: [],
    color: '#6b7280',
    type: 'support'
  },
  {
    id: 'automation',
    name: 'Automation',
    shortName: 'Automation',
    position: { x: -2, y: 2.5, z: 0 },
    features: [],
    status: 'idle',
    connections: [],
    color: '#6b7280',
    type: 'support'
  },
  {
    id: 'supervisors',
    name: 'Supervisors',
    shortName: 'Supervisors',
    position: { x: 2, y: 2.5, z: 0 },
    features: [],
    status: 'idle',
    connections: [],
    color: '#6b7280',
    type: 'support'
  }
];

// Connection definitions based on image layout
const connections = [
  { from: 'ingestion', to: 'd8-forge' },
  { from: 'd8-forge', to: 'd8-sec' },
  { from: 'd8-sec', to: 'd8-observe' },
  { from: 'd8-observe', to: 'consumption' },
  { from: 'd8-forge', to: 'd8-ingest' },
  { from: 'd8-ingest', to: 'd8-cat' },
  { from: 'd8-cat', to: 'd8-curate' },
  { from: 'd8-curate', to: 'd8-flow' },
  { from: 'd8-flow', to: 'd8-stage' },
  { from: 'd8-stage', to: 'd8-view' },
  { from: 'd8-view', to: 'consumption' },
  { from: 'd8-sec', to: 'automation' },
  { from: 'd8-sec', to: 'supervisors' }
];

// Three.js Node Component - Cleaner and more readable
function NodeComponent({ node, isActive = false, onClick }: { 
  node: D8Node; 
  isActive?: boolean;
  onClick?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      if (isActive) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      }
    }
  });

  const size = node.type === 'core' ? 2.0 : 1.2;
  const color = isActive ? '#fbbf24' : hovered ? '#60a5fa' : node.color;

  return (
    <group position={[node.position.x, node.position.y, node.position.z]}>
      {/* Node geometry */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size, size * 0.6, 0.3]} />
        <meshStandardMaterial 
          color={color}
          emissive={isActive ? '#fbbf24' : '#000000'}
          emissiveIntensity={isActive ? 0.3 : 0}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      
      {/* Node label - much larger and more readable */}
      <Html
        position={[0, 0, 0.2]}
        center
        distanceFactor={3}
        occlude={false}
      >
        <div className="bg-black/95 backdrop-blur-sm border-2 border-blue-400/80 rounded-lg px-8 py-4 pointer-events-none shadow-2xl">
          <div className="text-white text-2xl font-bold text-center whitespace-nowrap drop-shadow-lg">
            {node.shortName}
          </div>
        </div>
      </Html>

      {/* Feature labels positioned to the side - only show for core nodes */}
      {node.features.length > 0 && node.type === 'core' && (
        <Html
          position={[size + 2, 0, 0]}
          center={false}
          distanceFactor={3}
          occlude={false}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-500/70 rounded-lg p-4 pointer-events-none shadow-2xl max-w-sm">
            <div className="space-y-2">
              {node.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="text-gray-200 text-base leading-relaxed flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}

      {/* Expanded details on hover for core nodes */}
      {hovered && node.type === 'core' && (
        <Html
          position={[0, -size * 1.8, 0]}
          center
          distanceFactor={2.5}
          occlude={false}
        >
          <div className="bg-gray-900/98 backdrop-blur-sm border-2 border-blue-400/80 rounded-xl p-6 shadow-2xl min-w-96 pointer-events-none">
            <div className="font-bold text-blue-300 text-2xl mb-4 text-center drop-shadow-lg">{node.name}</div>
            <div className="grid grid-cols-1 gap-3">
              {node.features.map((feature, fIndex) => (
                <div key={fIndex} className="text-gray-100 text-lg leading-relaxed flex items-start">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mt-2 mr-4 flex-shrink-0"></div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Connection Line Component - Enhanced visibility
function ConnectionLine({ from, to, isActive = false }: { 
  from: THREE.Vector3; 
  to: THREE.Vector3; 
  isActive?: boolean;
}) {
  const points = [from, to];
  const color = isActive ? '#fbbf24' : '#60a5fa';
  const opacity = isActive ? 1.0 : 0.6;

  return (
    <Line
      points={points}
      color={color}
      lineWidth={isActive ? 6 : 4}
      dashed={true}
      dashScale={8}
      gapSize={3}
      transparent
      opacity={opacity}
    />
  );
}

// Main 3D Scene Component
function EcosystemScene({ nodes, activeNodeId, onNodeClick }: {
  nodes: D8Node[];
  activeNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const nodePositions = new Map(
    nodes.map(node => [
      node.id, 
      new THREE.Vector3(node.position.x, node.position.y, node.position.z)
    ])
  );

  return (
    <>
      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={45}
        minDistance={15}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-15, -15, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 0, 20]} intensity={0.6} color="#06b6d4" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />

      {/* Nodes */}
      {nodes.map((node) => (
        <NodeComponent
          key={node.id}
          node={node}
          isActive={activeNodeId === node.id}
          onClick={() => onNodeClick(node.id)}
        />
      ))}

      {/* Connections */}
      {connections.map((connection, index) => {
        const fromPos = nodePositions.get(connection.from);
        const toPos = nodePositions.get(connection.to);
        
        if (!fromPos || !toPos) return null;

        const isActive = activeNodeId === connection.from || activeNodeId === connection.to;

        return (
          <ConnectionLine
            key={index}
            from={fromPos}
            to={toPos}
            isActive={isActive}
          />
        );
      })}
    </>
  );
}

export function D8sEcosystemSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentStep = 0;
    
    if (isRunning) {
      interval = setInterval(() => {
        const coreNodes = d8Nodes.filter(node => node.type === 'core');
        currentStep = (currentStep + 1) % coreNodes.length;
        setActiveNodeId(coreNodes[currentStep].id);
      }, 2000);
    } else {
      setActiveNodeId(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const togglePipeline = () => {
    setIsRunning(!isRunning);
  };

  const handleNodeClick = (nodeId: string) => {
    setActiveNodeId(activeNodeId === nodeId ? null : nodeId);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-lg border-blue-500/30 bg-blue-500/10 text-blue-400">
              D8 DATA GOVERNANCE ECOSYSTEM
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Complete Data </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A comprehensive ecosystem of intelligent agents orchestrating your entire data lifecycle
            </p>
          </motion.div>
        </div>

        {/* Pipeline Controls */}
        <div className="flex justify-center mb-16">
          <Button
            onClick={togglePipeline}
            size="lg"
            className="button-text-visible bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            {isRunning ? (
              <>
                <Pause className="mr-3 h-6 w-6" />
                Pause Ecosystem
              </>
            ) : (
              <>
                <Play className="mr-3 h-6 w-6" />
                Activate Ecosystem
              </>
            )}
          </Button>
        </div>

        {/* Main Three.js Ecosystem Visualization */}
        <div className="relative">
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-[1000px] w-full">
              <Canvas
                camera={{ position: [0, 0, 25], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <EcosystemScene
                    nodes={d8Nodes}
                    activeNodeId={activeNodeId}
                    onNodeClick={handleNodeClick}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* Ecosystem Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Active Agents', value: '9', icon: <Network className="w-6 h-6" /> },
            { label: 'Data Flows', value: '13', icon: <Activity className="w-6 h-6" /> },
            { label: 'Governance Layers', value: '7', icon: <Shield className="w-6 h-6" /> },
            { label: 'Processing Nodes', value: '50+', icon: <Zap className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-blue-400 mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Button 
            size="lg" 
            className="button-text-visible bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-10 py-5 text-xl rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            Deploy Your D8 Ecosystem
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}