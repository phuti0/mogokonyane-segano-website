'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor, ScrollProgress, FloatingActionButton } from '@/components/ui/effects';
import { FloatingParticles, NoiseOverlay } from '@/components/ui/animated-backgrounds';
import { FiArrowUp } from 'react-icons/fi';

interface ClientProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers and global UI components
 * Handles custom cursor, scroll progress, particles, and floating action button
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth page load transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Custom cursor - only shows on desktop */}
      <CustomCursor />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Floating particles background */}
      <FloatingParticles count={30} />
      
      {/* Subtle noise texture overlay */}
      <NoiseOverlay opacity={0.02} />
      
      {/* Main content with smooth fade-in */}
      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isLoading ? 0.1 : 0
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Floating back to top button */}
      <FloatingActionButton
        icon={<FiArrowUp className="w-6 h-6" />}
        label="Scroll to top"
      />
    </>
  );
}
