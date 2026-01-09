'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

/**
 * Canvas-based floating particles for ambient background animation
 * Optimized for 60fps performance
 */
export function FloatingParticles({ count = 50, className = '' }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with earth/nature colors
    const colors = [
      'rgba(34, 130, 87, 0.4)',   // Forest green
      'rgba(139, 90, 43, 0.3)',    // Warm brown
      'rgba(234, 170, 60, 0.35)',  // Sunset gold
      'rgba(190, 120, 70, 0.3)',   // Terracotta
      'rgba(60, 150, 100, 0.35)',  // Light green
    ];

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 130, 87, ${0.08 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}

/**
 * Animated gradient orbs for hero background
 */
export function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary green orb */}
      <motion.div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 to-primary-light/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Sunset orange orb */}
      <motion.div
        className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-accent/25 to-accent-light/15 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Brown/earth orb */}
      <motion.div
        className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-secondary/20 to-secondary-light/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Small accent orb */}
      <motion.div
        className="absolute top-2/3 right-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-tertiary/20 to-tertiary-light/10 blur-2xl"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
}

/**
 * Animated wave SVG divider
 */
export function WaveDivider({ 
  flip = false, 
  className = '',
  color = 'fill-background'
}: { 
  flip?: boolean; 
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        className={`relative block w-full ${color}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: '80px' }}
      >
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          initial={{ opacity: 0.7 }}
          animate={{ 
            d: [
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              "M0,0V56.29c47.79,12.2,103.59,42.17,158,38,70.36-5.37,136.33-43.31,206.8-47.5C438.64,42.43,512.34,63.67,583,82.05c69.27,18,138.3,14.88,209.4,3.08,36.15-6,69.85-27.84,104.45-39.34C989.49,15,1113-24.29,1200,42.47V0Z",
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}

/**
 * Animated mesh gradient background
 */
export function MeshGradient({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34, 130, 87, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Floating leaf/organic shapes
 */
export function FloatingShapes() {
  const shapes = [
    { delay: 0, duration: 15, x: '10%', size: 60 },
    { delay: 3, duration: 18, x: '30%', size: 40 },
    { delay: 6, duration: 20, x: '50%', size: 50 },
    { delay: 2, duration: 16, x: '70%', size: 35 },
    { delay: 5, duration: 22, x: '85%', size: 45 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            left: shape.x,
            top: '-10%',
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotate: [0, 360],
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full fill-primary">
            <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Noise texture overlay
 */
export function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}
