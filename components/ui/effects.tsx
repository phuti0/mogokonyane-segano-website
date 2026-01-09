'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollProgress, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Custom animated cursor that follows mouse movement
 * Only visible on desktop devices with hover capability
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse)
    const hasFingerPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFingerPointer || prefersReducedMotion) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -ml-1 -mt-1 rounded-full bg-white"
          animate={{
            width: isClicking ? 6 : isHovering ? 12 : 8,
            height: isClicking ? 6 : isHovering ? 12 : 8,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Cursor ring/glow */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative rounded-full border-2 border-primary/50"
          style={{
            marginLeft: '-20px',
            marginTop: '-20px',
          }}
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            marginLeft: isHovering ? '-30px' : '-20px',
            marginTop: isHovering ? '-30px' : '-20px',
            opacity: isClicking ? 0.3 : 0.6,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  );
}

/**
 * Scroll progress indicator bar at the top of the page
 */
export function ScrollProgress() {
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="scroll-progress fixed left-0 top-0 z-[100] h-1 w-full origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, hsl(152 62% 28%) 0%, hsl(152 50% 40%) 50%, hsl(32 95% 55%) 100%)',
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

/**
 * Floating action button with bounce animation
 */
export function FloatingActionButton({
  onClick,
  icon,
  label,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={onClick || scrollToTop}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg hover:shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      whileHover={{ 
        scale: 1.12,
        boxShadow: '0 0 35px rgba(34, 130, 87, 0.45)',
      }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 28,
      }}
      aria-label={label}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
}

/**
 * Animated number counter with easing
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
  inView = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  inView?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;

    setHasAnimated(true);
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(value * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, inView, hasAnimated]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Typing text effect component
 */
export function TypewriterText({
  words,
  className = '',
}: {
  words: string[];
  className?: string;
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  );
}

/**
 * Magnetic button effect
 */
export function MagneticButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}

/**
 * Ripple effect button
 */
export function RippleButton({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            width: 500,
            height: 500,
            x: -250,
            y: -250,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  );
}
