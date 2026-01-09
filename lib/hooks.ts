'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Hook to track scroll progress (0 to 1)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrollHeight > 0 ? scrolled / scrollHeight : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

/**
 * Hook to track if user has scrolled past a threshold
 */
export function useScrolled(threshold: number = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Hook to track mouse position
 */
export function useMousePosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}

/**
 * Hook to check if element is in viewport
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}

/**
 * Hook for counting animation
 */
export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  shouldStart: boolean = true
): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, shouldStart]);

  return count;
}

/**
 * Hook for typing effect
 */
export function useTypewriter(
  words: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  delayBetweenWords: number = 2000
): { text: string; isTyping: boolean } {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
          setIsTyping(true);
        } else {
          setIsTyping(false);
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
          setIsTyping(true);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return { text, isTyping };
}

/**
 * Hook to check for reduced motion preference
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for parallax effect
 */
export function useParallax(speed: number = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

/**
 * Hook for smooth element following cursor
 */
export function useSmoothCursor(delay: number = 0.1): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateTarget = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * delay,
        y: prev.y + (targetRef.current.y - prev.y) * delay
      }));
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateTarget);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateTarget);
      cancelAnimationFrame(animationFrame);
    };
  }, [delay]);

  return position;
}

/**
 * Hook for window dimensions
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
