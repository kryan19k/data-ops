"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  BarChart3, 
  Brain, 
  Zap, 
  Shield, 
  CloudUpload,
  TrendingUp,
  Workflow,
  Users
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magic-ui/bento-grid";
import { AnimatedBeam } from "@/components/magic-ui/animated-beam";

const services = [
  {
    Icon: Database,
    name: "Data Engineering",
    description: "Build robust, scalable data pipelines that transform raw data into business intelligence.",
    href: "/services/data-engineering",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-700/20">
        <div className="absolute inset-0 bg-grid-small-white/[0.1] bg-[size:20px_20px]" />
        <div className="absolute top-4 left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-400/30 rounded-full blur-lg" />
      </div>
    ),
  },
  {
    Icon: BarChart3,
    name: "Business Intelligence",
    description: "Create interactive dashboards and reports that drive data-informed decision making.",
    href: "/services/business-intelligence",
    cta: "Explore",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-700/20">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-pulse delay-700" />
        </motion.div>
      </div>
    ),
  },
  {
    Icon: Brain,
    name: "Machine Learning",
    description: "Deploy AI solutions that automate processes and unlock predictive insights from your data.",
    href: "/services/machine-learning",
    cta: "Discover",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-700/20">
        <div className="absolute inset-0 opacity-30">
          <motion.div className="absolute w-1 h-1 bg-purple-400 rounded-full top-1/4 left-1/4" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} />
          <motion.div className="absolute w-1 h-1 bg-purple-400 rounded-full top-1/3 right-1/3" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.3 }} />
          <motion.div className="absolute w-1 h-1 bg-purple-400 rounded-full bottom-1/3 left-1/2" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} />
          <motion.div className="absolute w-1 h-1 bg-purple-400 rounded-full top-2/3 right-1/4" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.9 }} />
          <motion.div className="absolute w-1 h-1 bg-purple-400 rounded-full bottom-1/4 left-1/3" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />
        </div>
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Real-time Analytics",
    description: "Stream processing and real-time data analysis for immediate business insights.",
    href: "/services/real-time-analytics",
    cta: "See how",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-orange-700/20">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 border-2 border-yellow-400/30 rounded-full">
            <div className="w-24 h-24 border-2 border-yellow-300/40 rounded-full m-3">
              <div className="w-16 h-16 border-2 border-yellow-200/50 rounded-full m-3" />
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    Icon: Shield,
    name: "Data Governance",
    description: "Ensure data quality, security, and compliance across your entire organization.",
    href: "/services/data-governance",
    cta: "Secure now",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-700/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-red-400/50 rounded-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    ),
  },
  {
    Icon: CloudUpload,
    name: "Cloud Migration",
    description: "Seamlessly migrate your data infrastructure to modern cloud platforms.",
    href: "/services/cloud-migration",
    cta: "Migrate",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-cyan-600/10 to-cyan-700/20">
        <motion.div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-4 bg-cyan-400/20 rounded-sm"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${30 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    ),
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your data into a strategic advantage with our comprehensive suite of data solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BentoGrid className="lg:grid-rows-3 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BentoCard {...service} />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your data strategy?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Data Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}