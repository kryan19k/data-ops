"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Database, BarChart3, Users, Briefcase, BookOpen, Mail, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/", label: "Home", icon: Database },
  { href: "/about", label: "About", icon: Users },
  { href: "/services", label: "Services", icon: BarChart3 },
  { href: "/solutions", label: "Solutions", icon: Briefcase },
  { href: "/case-studies", label: "Case Studies", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/30 shadow-2xl shadow-primary/5" 
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-600/5 opacity-0 transition-opacity duration-500 pointer-events-none" 
           style={{ opacity: scrolled ? 1 : 0 }} />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo.webp"
                  alt="D8taOps Logo"
                  width={48}
                  height={48}
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                  priority
                />
                <div className="absolute -top-1 -right-1">
                 
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  D8taOps
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wider">
                  DATA EXCELLENCE
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:text-primary group-hover:bg-primary/5 border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative p-3 rounded-xl transition-all duration-300 hover:bg-primary/10 border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {mounted && (
                <motion.div
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{ 
                    rotate: theme === "dark" ? 180 : 0,
                    scale: theme === "dark" ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="relative z-10"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                </motion.div>
              )}
            </motion.button>

            {/* Get Quote Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Get Quote
              </Button>
            </motion.div>

            {/* Start Project Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="relative bg-gradient-to-r from-primary via-blue-600 to-cyan-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-cyan-600/90 text-white border-0 px-6 py-2 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden group font-semibold">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Project</span>
                  <Sparkles className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 rounded-xl transition-all duration-300 hover:bg-primary/10 border border-transparent hover:border-primary/20"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-6 space-y-1 bg-background/95 backdrop-blur-xl rounded-2xl mt-4 border border-border/50 shadow-2xl">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5 group-hover:text-primary transition-colors duration-200" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="pt-4 space-y-3 border-t border-border/50">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 w-full group"
                    >
                      {theme === "light" ? (
                        <Moon className="w-5 h-5 group-hover:text-primary transition-colors duration-200" />
                      ) : (
                        <Sun className="w-5 h-5 group-hover:text-primary transition-colors duration-200" />
                      )}
                      <span>Toggle Theme</span>
                    </button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/30 text-primary hover:bg-primary/5"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Quote
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Project
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}