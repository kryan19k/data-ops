"use client";

import { Suspense, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { useTheme } from "next-themes";
import { Application } from "@splinetool/runtime";

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const splineRef = useRef<Application | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (splineRef.current) {
      // Update scene based on theme
      const isDark = theme === "dark";
      
      // You can add theme-specific scene adjustments here
      // For example, changing materials, lighting, or colors
      try {
        // Example of theme-based scene modification
        if (isDark) {
          // Dark mode adjustments
          splineRef.current.setVariable?.("isDarkMode", true);
        } else {
          // Light mode adjustments
          splineRef.current.setVariable?.("isDarkMode", false);
        }
      } catch (error) {
        console.warn("Spline theme update failed:", error);
      }
    }
  }, [theme]);

  const handleLoad = (spline: Application) => {
    splineRef.current = spline;
    
    // Enable mouse interaction
    spline.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    
    // Add cursor tracking for interactive elements
    const canvas = spline.canvas;
    if (canvas) {
      canvas.style.cursor = "pointer";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (splineRef.current && e.currentTarget) {
      // Pass mouse position to Spline scene
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      try {
        splineRef.current.setVariable?.("mouseX", x);
        splineRef.current.setVariable?.("mouseY", y);
      } catch {
        // Silently handle if variables don't exist in scene
      }
    }
  };

  return (
    <div className={className}>
      <Suspense fallback={fallback || <SplineSceneFallback />}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onMouseMove={handleMouseMove}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        />
      </Suspense>
    </div>
  );
}

function SplineSceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading 3D Scene...</p>
      </div>
    </div>
  );
}