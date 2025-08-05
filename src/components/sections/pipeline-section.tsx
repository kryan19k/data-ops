"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Database, 
  Filter, 
  Zap, 
  BarChart3, 
  CloudUpload, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Play,
  Pause
} from "lucide-react";
import { AnimatedBeam } from "@/components/magic-ui/animated-beam";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: "idle" | "processing" | "completed" | "error";
  metrics?: {
    label: string;
    value: string;
  }[];
}

const pipelineStages: PipelineStage[] = [
  {
    id: "ingestion",
    name: "Data Ingestion",
    description: "Collect data from multiple sources",
    icon: CloudUpload,
    status: "completed",
    metrics: [
      { label: "Sources", value: "12" },
      { label: "Records/min", value: "50K" }
    ]
  },
  {
    id: "processing",
    name: "Data Processing",
    description: "Clean, transform, and validate data",
    icon: Filter,
    status: "processing",
    metrics: [
      { label: "Rules Applied", value: "45" },
      { label: "Quality Score", value: "98%" }
    ]
  },
  {
    id: "enrichment",
    name: "Data Enrichment",
    description: "Enhance data with ML models",
    icon: Zap,
    status: "processing",
    metrics: [
      { label: "Models", value: "8" },
      { label: "Accuracy", value: "94%" }
    ]
  },
  {
    id: "storage",
    name: "Data Storage",
    description: "Store in optimized data warehouse",
    icon: Database,
    status: "idle",
    metrics: [
      { label: "Partitions", value: "150" },
      { label: "Compression", value: "85%" }
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Generate insights and reports",
    icon: BarChart3,
    status: "idle",
    metrics: [
      { label: "Dashboards", value: "25" },
      { label: "Users", value: "340" }
    ]
  }
];

const getStatusIcon = (status: PipelineStage["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "processing":
      return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <div className="w-4 h-4 rounded-full bg-gray-300" />;
  }
};

const getStatusColor = (status: PipelineStage["status"]) => {
  switch (status) {
    case "completed":
      return "border-green-500 bg-green-50 dark:bg-green-950";
    case "processing":
      return "border-blue-500 bg-blue-50 dark:bg-blue-950 animate-pulse";
    case "error":
      return "border-red-500 bg-red-50 dark:bg-red-950";
    default:
      return "border-gray-300 bg-gray-50 dark:bg-gray-950";
  }
};

export function PipelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isRunning, setIsRunning] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const togglePipeline = () => {
    setIsRunning(!isRunning);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Interactive <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Data Pipeline</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Watch how we transform raw data into actionable insights through our automated pipeline
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              onClick={togglePipeline}
              variant={isRunning ? "default" : "outline"}
              className="flex items-center gap-2 bg-primary text-always-visible-white hover:bg-primary/90"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? "Pause Pipeline" : "Start Pipeline"}
            </Button>
            <Badge variant="secondary" className="text-sm">
              {isRunning ? "Running" : "Paused"}
            </Badge>
          </div>
        </motion.div>

        {/* Pipeline Visualization */}
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-8 overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-small-white/[0.05] bg-[size:20px_20px]" />
          
          {/* Pipeline Stages */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-8">
            {pipelineStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <Card
                    ref={(el) => (stageRefs.current[stage.id] = el)}
                    className={`w-48 h-56 transition-all duration-300 cursor-pointer hover:scale-105 ${getStatusColor(stage.status)} ${
                      selectedStage === stage.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                  >
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                          {getStatusIcon(stage.status)}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-sm mb-2">{stage.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">{stage.description}</p>
                      
                      {stage.metrics && (
                        <div className="space-y-1">
                          {stage.metrics.map((metric, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{metric.label}:</span>
                              <span className="font-medium">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Animated Beams */}
          {isRunning && containerRef.current && (
            <>
              {pipelineStages.slice(0, -1).map((stage, index) => {
                const fromRef = { current: stageRefs.current[stage.id] };
                const toRef = { current: stageRefs.current[pipelineStages[index + 1].id] };
                
                return (
                  <AnimatedBeam
                    key={`${stage.id}-${pipelineStages[index + 1].id}`}
                    containerRef={containerRef}
                    fromRef={fromRef}
                    toRef={toRef}
                    duration={3}
                    delay={index * 0.5}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#8b5cf6"
                    pathOpacity={0.3}
                  />
                );
              })}
            </>
          )}
        </div>

        {/* Stage Details */}
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className="p-6">
              <CardContent>
                {(() => {
                  const stage = pipelineStages.find(s => s.id === selectedStage);
                  if (!stage) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <stage.icon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold">{stage.name}</h3>
                        {getStatusIcon(stage.status)}
                      </div>
                      <p className="text-muted-foreground mb-4">{stage.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stage.metrics?.map((metric, idx) => (
                          <div key={idx} className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{metric.value}</div>
                            <div className="text-sm text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Pipeline Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Data Processed", value: "2.5TB", change: "+12%" },
            { label: "Pipeline Uptime", value: "99.9%", change: "+0.1%" },
            { label: "Processing Speed", value: "50K/min", change: "+25%" },
            { label: "Error Rate", value: "0.001%", change: "-50%" }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}