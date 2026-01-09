'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FiArrowRight, FiPlay, FiChevronDown } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradientOrbs, WaveDivider, FloatingShapes } from '@/components/ui/animated-backgrounds';
import { TypewriterText, AnimatedCounter } from '@/components/ui/effects';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  scaleInBounce,
  viewportOnce 
} from '@/lib/animations';

const stats = [
  { value: 214, prefix: 'R', suffix: 'B', label: 'Market Size' },
  { value: 2500000, suffix: '+', label: 'Farmers', display: '2.5M+' },
  { value: 5, label: 'Provinces' },
];

const typewriterWords = [
  'Market Access',
  'Digital Tools',
  'Knowledge Hub',
  'Community Growth',
  'Food Security',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating gradient orbs */}
      <GradientOrbs />
      
      {/* Floating organic shapes */}
      <FloatingShapes />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Main content with parallax */}
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 hover:shadow-lg transition-shadow duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">
                Empowering South African Agriculture
              </span>
            </motion.div>

            {/* Main headline with gradient text */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <motion.span 
                className="text-foreground inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Connecting Farmers,
              </motion.span>
              <br />
              <motion.span 
                className="gradient-text inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Feeding
              </motion.span>{' '}
              <motion.span 
                className="gradient-text-gold inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Opportunities
              </motion.span>
            </motion.h1>

            {/* Dynamic typewriter subheadline */}
            <motion.div
              variants={staggerItem}
              className="flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <span className="text-xl text-muted-foreground">Providing</span>
              <span className="text-xl font-semibold text-primary">
                <TypewriterText words={typewriterWords} />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10"
            >
              Transforming rural agriculture through technology-driven solutions. 
              Access markets, gain knowledge, and build sustainable communities 
              with our innovative platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }} 
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-400 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Join the Platform
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <FiArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -z-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }} 
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  <FiPlay className="mr-2 w-5 h-5 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              variants={staggerItem}
              className="mt-16 grid grid-cols-3 gap-6 lg:gap-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center lg:text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1 transition-transform duration-300 group-hover:scale-105">
                    {stat.display ? (
                      stat.display
                    ) : (
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix || ''}
                        suffix={stat.suffix || ''}
                        duration={2500}
                      />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            style={{ y: y2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              variants={scaleInBounce}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Main card with glassmorphism */}
              <div className="relative glass-card rounded-3xl p-2 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 -z-10" />
                
                {/* Image container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.img
                    src="/blackwoma.jpg"
                    alt="Farmers using technology in the field"
                    className="w-full h-auto object-cover transition-transform duration-700"
                    whileHover={{ scale: 1.03 }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating info card */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 glass-card rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/70">Active Farmers</p>
                        <p className="text-2xl font-bold text-primary">2,547</p>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.4 + i * 0.1, type: 'spring', stiffness: 300 }}
                          >
                            {i}
                          </motion.div>
                        ))}
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-white/90 border-2 border-white flex items-center justify-center text-primary text-xs font-bold"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.9, type: 'spring', stiffness: 300 }}
                        >
                          +99
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating accent cards */}
              <motion.div
                className="absolute -top-8 -right-8 glass-card rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-tertiary flex items-center justify-center">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Crops Listed</p>
                    <p className="font-bold text-foreground">1,234+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue Growth</p>
                    <p className="font-bold text-primary">+47%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            whileHover={{ y: -3 }}
          >
            <span className="text-sm font-medium group-hover:text-primary transition-colors">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider color="fill-background" />
      </div>
    </section>
  );
}
