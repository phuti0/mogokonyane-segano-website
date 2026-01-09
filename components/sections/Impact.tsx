'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { FiTrendingUp, FiUsers, FiShield, FiCloud, FiArrowUpRight } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/effects';
import { staggerContainer, staggerItem } from '@/lib/animations';

const impacts = [
  {
    icon: FiUsers,
    title: 'Reduced Rural Unemployment',
    description: 'Creating job opportunities for students and youth from disadvantaged backgrounds',
    stat: '500+',
    statLabel: 'Jobs Created',
    color: 'from-primary to-primary-light',
  },
  {
    icon: FiTrendingUp,
    title: 'Increased Farmer Profitability',
    description: 'Cutting out middlemen to ensure farmers receive fair prices for their produce',
    stat: '35%',
    statLabel: 'Income Increase',
    color: 'from-accent to-accent-light',
  },
  {
    icon: FiShield,
    title: 'Boost to Food Security',
    description: 'Supporting schools and communities through our surplus donation program',
    stat: '10K+',
    statLabel: 'Meals Donated',
    color: 'from-secondary to-secondary-light',
  },
  {
    icon: FiCloud,
    title: 'Enhanced Climate Resilience',
    description: 'Real-time information sharing on weather patterns and sustainable practices',
    stat: '24/7',
    statLabel: 'Alert Coverage',
    color: 'from-tertiary to-tertiary-light',
  }
];

const projections = {
  conservative: [
    { year: 'Year 1', revenue: 200000, displayRevenue: 'R200K' },
    { year: 'Year 2', revenue: 1200000, displayRevenue: 'R1.2M' },
    { year: 'Year 3', revenue: 6000000, displayRevenue: 'R6M' },
  ],
  highGrowth: [
    { year: 'Year 1', revenue: 500000, displayRevenue: 'R500K' },
    { year: 'Year 2', revenue: 3000000, displayRevenue: 'R3M' },
    { year: 'Year 3', revenue: 15000000, displayRevenue: 'R15M' },
  ],
};

export default function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="impact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-dots opacity-40" />
      
      {/* Animated gradient orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Making a Difference
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Social </span>
            <span className="gradient-text">Impact</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Creating lasting change in communities across South Africa through 
            sustainable agricultural innovation
          </p>
        </motion.div>

        {/* Impact Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              variants={staggerItem}
              className="group"
            >
              <Card className="relative h-full glass-card border-0 p-6 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Top section with icon */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-5 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <impact.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Stat display */}
                  <div className="mb-4">
                    <motion.p
                      className="text-3xl font-bold gradient-text"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    >
                      {impact.stat}
                    </motion.p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {impact.statLabel}
                    </p>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {impact.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {impact.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiArrowUpRight className="w-4 h-4 text-primary" />
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Financial Projections */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-3xl" />
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 rounded-3xl overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
            </svg>
          </div>

          {/* Animated gradient blob */}
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="relative z-10 p-10 md:p-16 text-white">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-12">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
                  Growth Trajectory
                </span>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Financial Projections
                </h3>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                {/* Conservative Scenario */}
                <motion.div variants={staggerItem}>
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-semibold">Conservative</h4>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                        22% NPM
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {projections.conservative.map((item, index) => (
                        <motion.div
                          key={item.year}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.15 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70">{item.year}</span>
                            <span className="font-bold text-lg">{item.displayRevenue}</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-white/50 to-white/30 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(item.revenue / 6000000) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 + index * 0.15 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* High Growth Scenario */}
                <motion.div variants={staggerItem}>
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden">
                    {/* Highlight badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-accent text-foreground text-xs font-bold">
                        Recommended
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-semibold">High Growth</h4>
                      <span className="px-3 py-1 rounded-full bg-accent/30 text-sm">
                        30% NPM
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {projections.highGrowth.map((item, index) => (
                        <motion.div
                          key={item.year}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.15 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70">{item.year}</span>
                            <span className="font-bold text-lg text-accent-light">{item.displayRevenue}</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(item.revenue / 15000000) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.7 + index * 0.15 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Bottom stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20"
              >
                {[
                  { value: 'R214B', label: 'Total Market Size' },
                  { value: '2.5M+', label: 'Target Farmers' },
                  { value: '5%', label: 'Year 1 Market Share Goal' },
                  { value: '3x', label: 'ROI by Year 3' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-accent-light">{stat.value}</p>
                    <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
