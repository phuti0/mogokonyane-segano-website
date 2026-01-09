/**
 * Animation Utilities & Variants
 * Reusable Framer Motion animation configurations for consistent animations across the site
 */

import { Variants } from 'framer-motion';

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

// ============================================
// STAGGER ANIMATIONS (for children)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Smooth stagger item with subtle scale
export const staggerItemSmooth: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ============================================
// 3D CARD ANIMATIONS
// ============================================

export const card3D: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: 10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ============================================
// REVEAL ANIMATIONS
// ============================================

export const revealFromLeft: Variants = {
  hidden: { 
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0 
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const revealFromRight: Variants = {
  hidden: { 
    clipPath: 'inset(0 0 0 100%)',
    opacity: 0 
  },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const revealFromBottom: Variants = {
  hidden: { 
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0 
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// ============================================
// TEXT ANIMATIONS
// ============================================

export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: '100%'
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const letterStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const letterVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// ============================================
// FLOATING/BREATHING ANIMATIONS
// ============================================

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const breathe: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const hoverLift = {
  y: -10,
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const hoverGlow = {
  boxShadow: '0 0 40px rgba(34, 130, 87, 0.35)',
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
};

// ============================================
// TAP ANIMATIONS
// ============================================

export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// ============================================
// VIEWPORT SETTINGS
// ============================================

export const viewportOnce = {
  once: true,
  margin: '-100px'
};

export const viewportAlways = {
  once: false,
  margin: '-50px'
};

// ============================================
// TRANSITION PRESETS
// ============================================

export const springTransition = {
  type: 'spring',
  stiffness: 350,
  damping: 35
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const bouncyTransition = {
  type: 'spring',
  stiffness: 280,
  damping: 18
};

// Ultra-smooth transition for subtle animations
export const ultraSmoothTransition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1]
};

// Quick but smooth transition for micro-interactions
export const quickTransition = {
  duration: 0.25,
  ease: [0.25, 0.46, 0.45, 0.94]
};
