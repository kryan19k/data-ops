"use client";

import { motion } from "framer-motion";
import { ChevronRight, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { SplineScene } from "@/components/spline/spline-scene";
import { Suspense } from "react";

const stats = [
  { value: 500, label: "Fortune 500 Companies Served", prefix: "", suffix: "+" },
  { value: 99.9, label: "Pipeline Uptime", prefix: "", suffix: "%" },
  { value: 80, label: "Faster Time-to-Insight", prefix: "", suffix: "%" },
  { value: 1000, label: "Data Pipelines Built", prefix: "", suffix: "+" },
];

const technologies = [
  "AWS", "Azure", "GCP", "Snowflake", "Databricks", "Apache Spark",
  "TensorFlow", "PyTorch", "MLflow", "Docker", "Kubernetes", "Grafana"
];

// Fallback 3D scene placeholder
function SplineFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
      {/* Animated geometric shapes as fallback */}
      <div className="relative w-full h-full">
        {/* Floating cubes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg"
            animate={{
              x: [0, Math.sin(i) * 100],
              y: [0, Math.cos(i) * 80],
              rotateX: [0, 360],
              rotateY: [0, 180],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 25}%`,
            }}
          />
        ))}
        
        {/* Central glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-primary/30 to-transparent rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        Interactive 3D Scene
      </div>
    </div>
  );
}

export function HeroSectionWithSpline() {
  // For demo purposes, we'll use a placeholder Spline scene URL
  // In production, you would replace this with your actual Spline scene URL
  const splineSceneUrl = "https://prod.spline.design/68btAWPSB5iCSMQV/scene.splinecode";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1]" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Badge 
                variant="outline" 
                className="px-4 py-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <span className="mr-2">✨</span>
                New: AI-Powered Data Pipeline Automation
                <ChevronRight className="ml-1 h-3 w-3" />
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-foreground">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Data
                </span>
                <br />
                Into Competitive{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Advantage
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none leading-relaxed"
            >
              Enterprise-grade DataOps solutions that scale. Reduce time-to-insight by 80% 
              with our data engineering, AI/ML, and cloud architecture expertise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
                             <Button 
                 size="lg" 
                 className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
               >
                 Start Your Project
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
              
                             <Button 
                 variant="outline" 
                 size="lg"
                 className="border-primary/50 text-primary dark:text-primary hover:bg-primary hover:text-white dark:hover:text-white text-lg px-8 py-6"
               >
                 <Play className="mr-2 h-5 w-5" />
                 Watch Demo
               </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                    <NumberTicker 
                      value={stat.value} 
                      className="text-primary"
                      decimalPlaces={stat.value % 1 !== 0 ? 1 : 0}
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px] xl:h-[700px]"
          >
            <div className="w-full h-full  overflow-hidden ">
              <Suspense fallback={<SplineFallback />}>
                <SplineScene
                  scene={splineSceneUrl}
                  className="w-full h-full"
                  fallback={<SplineFallback />}
                />
              </Suspense>
            </div>
            
            {/* Floating Elements Around 3D Scene */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-primary/30 rounded-full"
                  animate={{
                    x: [0, Math.sin(i * 45) * 30],
                    y: [0, Math.cos(i * 45) * 30],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + (i * 0.2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${10 + (i % 4) * 25}%`,
                    top: `${10 + Math.floor(i / 4) * 80}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Technology Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm border-t border-border/50">
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...technologies, ...technologies].map((tech, index) => (
              <span 
                key={index} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}