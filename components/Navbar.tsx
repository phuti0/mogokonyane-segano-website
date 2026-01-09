'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FiMenu, FiX } from 'react-icons/fi';
import { useScrolled } from '@/lib/hooks';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Impact', href: '#impact' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrolled = useScrolled(50);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        scrolled
          ? 'glass shadow-lg border-b border-white/20 py-2'
          : 'bg-transparent py-0'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo with animation */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Logo mark with gradient */}
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-xl font-bold text-white">MS</span>
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/20"
                  initial={{ opacity: 0, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            
            <motion.div
              className="hidden sm:flex flex-col"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg font-bold gradient-text">
                Mogokonyane-Segano
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5">
                Holdings
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.name}
                
                {/* Active indicator line */}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    layoutId="activeSection"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.a>
            ))}
            
            {/* CTA Button with effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="ml-4"
            >
              <Button
                className="relative bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium px-6 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-400 overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <motion.div whileTap={{ scale: 0.92 }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative h-12 w-12 rounded-xl hover:bg-primary/10 transition-colors duration-300"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <FiX className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <FiMenu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </SheetTrigger>
            
            <SheetContent className="glass-dark border-l border-white/10 w-full sm:w-80" side="right">
              <motion.div
                className="flex flex-col space-y-2 mt-12"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.15 }
                  }
                }}
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium py-4 px-5 rounded-xl transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary/20 text-primary'
                        : 'text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15'
                    }`}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      {activeSection === item.href.substring(1) && (
                        <motion.span
                          className="w-2.5 h-2.5 rounded-full bg-accent"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                        />
                      )}
                    </span>
                  </motion.a>
                ))}
                
                <motion.div
                  className="pt-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium py-6 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Button>
                </motion.div>

                {/* Decorative element */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-32 h-1 rounded-full bg-gradient-to-r from-primary/30 via-accent/50 to-primary/30" />
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
