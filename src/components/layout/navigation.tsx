"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Database, BarChart3, Users, Briefcase, BookOpen, Mail, Sun, Moon } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-data-gradient rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-data-gradient">D8taOps</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className="group relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-data-gradient opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle & CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-foreground hover:bg-muted"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            )}
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Get Quote
            </Button>
            <Button className="bg-data-gradient hover:opacity-90 text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Project
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
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
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-lg border border-border rounded-lg mt-2">
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
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Get Quote
                  </Button>
                  <Button className="w-full bg-data-gradient hover:opacity-90 text-white">
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