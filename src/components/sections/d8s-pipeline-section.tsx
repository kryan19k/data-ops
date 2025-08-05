"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Database, 
  Shield, 
  BarChart3, 
  Zap, 
  Target, 
  Brain,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  GitBranch
} from 'lucide-react';

interface D8Node {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  status: 'idle' | 'processing' | 'complete' | 'error';
  connections: string[];
  color: string;
  gradientId: string;
}

const d8Nodes: D8Node[] = [
  {
    id: 'd8-discover',
    name: 'D8 Discover',
    title: 'Data Discovery',
    description: 'Automated data source identification and cataloging across all your systems',
    icon: <Database className="w-7 h-7" />,
    position: { x: 15, y: 35 },
    status: 'idle',
    connections: ['d8-define'],
    color: 'from-emerald-400 to-green-600',
    gradientId: 'discover-gradient'
  },
  {
    id: 'd8-define',
    name: 'D8 Define',
    title: 'Data Definition',
    description: 'Schema validation, data quality assessment, and type classification',
    icon: <Target className="w-7 h-7" />,
    position: { x: 50, y: 15 },
    status: 'idle',
    connections: ['d8-design'],
    color: 'from-emerald-400 to-green-600',
    gradientId: 'define-gradient'
  },
  {
    id: 'd8-design',
    name: 'D8 Design',
    title: 'Pipeline Design',
    description: 'Intelligent data flow architecture and optimization planning',
    icon: <Brain className="w-7 h-7" />,
    position: { x: 85, y: 35 },
    status: 'idle',
    connections: ['d8-develop'],
    color: 'from-emerald-400 to-green-600',
    gradientId: 'design-gradient'
  },
  {
    id: 'd8-develop',
    name: 'D8 Develop',
    title: 'Development',
    description: 'Automated code generation, testing, and pipeline optimization',
    icon: <Zap className="w-7 h-7" />,
    position: { x: 85, y: 70 },
    status: 'idle',
    connections: ['d8-deploy'],
    color: 'from-cyan-400 to-blue-600',
    gradientId: 'develop-gradient'
  },
  {
    id: 'd8-deploy',
    name: 'D8 Deploy',
    title: 'Deployment',
    description: 'Seamless production deployment, scaling, and monitoring',
    icon: <GitBranch className="w-7 h-7" />,
    position: { x: 50, y: 85 },
    status: 'idle',
    connections: ['d8-defend'],
    color: 'from-cyan-400 to-blue-600',
    gradientId: 'deploy-gradient'
  },
  {
    id: 'd8-defend',
    name: 'D8 Defend',
    title: 'Data Security',
    description: 'Advanced security protocols, compliance, and threat monitoring',
    icon: <Shield className="w-7 h-7" />,
    position: { x: 15, y: 70 },
    status: 'idle',
    connections: ['d8-deliver'],
    color: 'from-gray-400 to-gray-700',
    gradientId: 'defend-gradient'
  },
  {
    id: 'd8-deliver',
    name: 'D8 Deliver',
    title: 'Data Delivery',
    description: 'Real-time data delivery, analytics, and business intelligence',
    icon: <BarChart3 className="w-7 h-7" />,
    position: { x: 15, y: 50 },
    status: 'idle',
    connections: ['d8-discover'],
    color: 'from-gray-400 to-gray-700',
    gradientId: 'deliver-gradient'
  }
];

// Beautiful curved paths that match the design
const connectionPaths = [
  { 
    from: 'd8-discover', 
    to: 'd8-define', 
    path: 'M 20 35 Q 30 20 45 20',
    gradient: 'connection-green'
  },
  { 
    from: 'd8-define', 
    to: 'd8-design', 
    path: 'M 55 20 Q 70 15 80 30',
    gradient: 'connection-green'
  },
  { 
    from: 'd8-design', 
    to: 'd8-develop', 
    path: 'M 85 40 Q 90 55 85 65',
    gradient: 'connection-blue'
  },
  { 
    from: 'd8-develop', 
    to: 'd8-deploy', 
    path: 'M 80 70 Q 65 80 55 80',
    gradient: 'connection-blue'
  },
  { 
    from: 'd8-deploy', 
    to: 'd8-defend', 
    path: 'M 45 80 Q 30 85 20 75',
    gradient: 'connection-gray'
  },
  { 
    from: 'd8-defend', 
    to: 'd8-deliver', 
    path: 'M 15 65 Q 10 57 15 50',
    gradient: 'connection-gray'
  },
  { 
    from: 'd8-deliver', 
    to: 'd8-discover', 
    path: 'M 15 45 Q 10 40 15 35',
    gradient: 'connection-gray'
  }
];

export function D8sPipelineSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [nodes, setNodes] = useState(d8Nodes);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % nodes.length;
          
          // Update node statuses
          setNodes((prevNodes) =>
            prevNodes.map((node, index) => ({
              ...node,
              status: index === nextStep ? 'processing' 
                    : index === (nextStep - 1 + nodes.length) % nodes.length ? 'complete'
                    : index < nextStep ? 'complete' 
                    : 'idle'
            }))
          );

          // Update active connections
          const currentConnectionIndex = nextStep;
          if (connectionPaths[currentConnectionIndex]) {
            setActiveConnections([connectionPaths[currentConnectionIndex].gradient]);
          }
          
          return nextStep;
        });
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, nodes.length]);

  const togglePipeline = () => {
    if (!isRunning) {
      setIsRunning(true);
      setCurrentStep(0);
    } else {
      setIsRunning(false);
      setNodes(d8Nodes);
      setActiveConnections([]);
      setCurrentStep(0);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Stunning Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      
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
            <Badge variant="outline" className="mb-6 px-6 py-2 text-lg border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              MEET THE D8'S
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Intelligent </span>
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Data Pipeline
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Seven specialized AI agents working in perfect synchronization to revolutionize your data operations
            </p>
          </motion.div>
        </div>

        {/* Pipeline Controls */}
        <div className="flex justify-center mb-16">
          <Button
            onClick={togglePipeline}
            size="lg"
            className="button-text-visible bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
          >
            {isRunning ? (
              <>
                <Pause className="mr-3 h-6 w-6" />
                Pause Pipeline
              </>
            ) : (
              <>
                <Play className="mr-3 h-6 w-6" />
                Start Pipeline
              </>
            )}
          </Button>
        </div>

        {/* Main Pipeline Visualization */}
        <div className="relative">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 shadow-2xl">
            {/* SVG Container for Connections */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Connection Gradients */}
                <linearGradient id="connection-green" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="connection-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="connection-gray" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6b7280" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.6" />
                </linearGradient>
                
                {/* Active Connection Gradient */}
                <linearGradient id="active-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              
              {/* Connection Paths */}
              {connectionPaths.map((connection, index) => {
                const isActive = activeConnections.includes(connection.gradient);
                return (
                  <g key={`connection-${index}`}>
                    {/* Base path */}
                    <motion.path
                      d={connection.path}
                      stroke={`url(#${connection.gradient})`}
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1
                      }}
                      transition={{ 
                        pathLength: { duration: 1.2, delay: index * 0.2 },
                        opacity: { duration: 0.5, delay: index * 0.2 }
                      }}
                    />
                    
                    {/* Active flow animation */}
                    {isActive && (
                      <motion.path
                        d={connection.path}
                        stroke="url(#active-flow)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="8,4"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -24 }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        filter="drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* D8 Nodes */}
            <div className="relative h-[600px]">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  className="absolute group"
                  style={{
                    left: `${node.position.x}%`,
                    top: `${node.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {/* Main Node Container */}
                  <div className="relative">
                    {/* Node Circle */}
                    <motion.div
                      className={`
                        w-24 h-24 md:w-28 md:h-28 rounded-full 
                        border-2 border-gray-600/30
                        flex items-center justify-center cursor-pointer 
                        transition-all duration-500 
                        bg-gradient-to-br ${node.color}
                        shadow-2xl
                        ${node.status === 'processing' ? 'ring-4 ring-yellow-400/50 shadow-yellow-400/30' : ''}
                        ${node.status === 'complete' ? 'ring-4 ring-emerald-400/50 shadow-emerald-400/30' : ''}
                      `}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      animate={{
                        boxShadow: node.status === 'processing' 
                          ? `0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)`
                          : node.status === 'complete'
                          ? `0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(34, 197, 94, 0.2)`
                          : `0 10px 40px rgba(0, 0, 0, 0.3)`
                      }}
                    >
                      <div className="text-white drop-shadow-lg">
                        {node.icon}
                      </div>
                      
                      {/* Status Indicator */}
                      {node.status === 'processing' && (
                        <motion.div 
                          className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity 
                          }}
                        >
                          <Clock className="w-4 h-4 text-yellow-900" />
                        </motion.div>
                      )}
                      
                      {node.status === 'complete' && (
                        <motion.div 
                          className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-900" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Node Label */}
                    <motion.div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      <div className="font-bold text-white text-lg whitespace-nowrap mb-1">
                        {node.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {node.title}
                      </div>
                    </motion.div>

                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 shadow-2xl min-w-64 max-w-80">
                        <div className="font-bold text-white text-lg mb-2">{node.title}</div>
                        <div className="text-gray-300 text-sm leading-relaxed">{node.description}</div>
                        <div className="mt-3 flex items-center text-xs text-gray-400">
                          <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${node.color}`}></div>
                          {node.status === 'processing' ? 'Processing...' : 
                           node.status === 'complete' ? 'Complete' : 'Ready'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Data Sources', value: '150+', icon: <Database className="w-6 h-6" /> },
            { label: 'Processing Speed', value: '50TB/hr', icon: <Zap className="w-6 h-6" /> },
            { label: 'Accuracy Rate', value: '99.9%', icon: <Target className="w-6 h-6" /> },
            { label: 'System Uptime', value: '99.99%', icon: <Shield className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-500/30"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-emerald-400 mb-3 flex justify-center">{stat.icon}</div>
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
            className="button-text-visible bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 px-10 py-5 text-xl rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
          >
            Experience the D8's Revolution
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}