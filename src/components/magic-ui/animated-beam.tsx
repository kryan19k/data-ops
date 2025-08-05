"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { forwardRef, useRef } from "react";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#18CCFC",
      gradientStopColor = "#6344F5",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref,
  ) => {
    const id = React.useId();
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    React.useEffect(() => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const resizeObserver = new ResizeObserver(() => {
          updatePath();
        });

        resizeObserver.observe(containerRef.current);
        resizeObserver.observe(fromRef.current);
        resizeObserver.observe(toRef.current);

        updatePath();

        return () => resizeObserver.disconnect();
      }
    }, [containerRef, fromRef, toRef]);

    const updatePath = () => {
      if (
        containerRef.current &&
        fromRef.current &&
        toRef.current &&
        svgRef.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        const svgRect = svgRef.current.getBoundingClientRect();

        const fromX =
          fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
        const fromY =
          fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;

        const toX =
          toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
        const toY =
          toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

        const controlX = fromX + (toX - fromX) / 2 + curvature;
        const controlY = fromY + (toY - fromY) / 2 - curvature;

        const d = `M${fromX},${fromY} Q${controlX},${controlY} ${toX},${toY}`;
        pathRef.current?.setAttribute("d", d);
      }
    };

    return (
      <svg
        ref={svgRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className,
        )}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={id}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
        />
        <path
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        >
          <motion.animate
            attributeName="stroke-dashoffset"
            values={reverse ? ["1000", "0"] : ["0", "1000"]}
            dur={`${duration}s`}
            repeatCount="indefinite"
            begin={delay}
          />
        </path>
      </svg>
    );
  },
);

AnimatedBeam.displayName = "AnimatedBeam";