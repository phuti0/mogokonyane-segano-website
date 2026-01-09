'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { FiTarget, FiEye, FiMapPin, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from '@/lib/animations';

const highlights = [
  { icon: FiMapPin, label: 'Rural Origins', value: 'Limpopo & North West' },
  { icon: FiUsers, label: 'Target Farmers', value: '2.5M+' },
  { icon: FiTrendingUp, label: 'Market Potential', value: 'R214B' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-dots opacity-50" />
      
      {/* Floating decorative elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -150]) }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
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
            Our Story
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">About </span>
            <span className="gradient-text">Us</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded by rural-born entrepreneurs with firsthand experience of agricultural challenges,
            we&apos;re building the future of South African farming.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Mission Card - Large */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Card className="group h-full glass-card border-0 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {/* Icon with glow */}
                <div className="relative mb-6 inline-block">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <FiTarget className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl -z-10 group-hover:blur-2xl transition-all" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Our Mission
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  To revolutionise South Africa&apos;s agricultural ecosystem by empowering farmers with 
                  market access, knowledge, and digital tools, while promoting sustainable farming 
                  and community upliftment through technology-driven solutions.
                </p>

                {/* Mission highlights */}
                <div className="grid grid-cols-3 gap-4">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="text-center p-4 rounded-xl bg-background/50 hover:bg-background transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-bold text-primary">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card className="group h-full glass-card border-0 p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="relative mb-6 inline-block">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-tertiary flex items-center justify-center shadow-lg">
                    <FiEye className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-accent/20 blur-xl -z-10" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  A future where every farmer, from rural to urban settings, has equal opportunity 
                  to thrive in a globally competitive agricultural market.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="group h-full bg-gradient-to-br from-secondary to-secondary-light p-8 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/blackwoma.jpg')] opacity-10 bg-cover bg-center" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium mb-2">Since 2024</p>
                  <p className="text-4xl font-bold mb-4">5+</p>
                  <p className="text-white/80">Provinces Targeted</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/70">
                    Expanding across South Africa to reach every farmer in need
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Problem Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-secondary rounded-3xl" />
          <div className="absolute inset-0 bg-[url('/blackwoma.jpg')] opacity-10 bg-cover bg-center rounded-3xl" />
          
          {/* Animated mesh overlay */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>
          
          <div className="relative z-10 p-10 md:p-16 text-white">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span 
                variants={staggerItem}
                className="inline-block px-4 py-1 rounded-full bg-white/10 text-sm font-medium mb-6"
              >
                The Challenge
              </motion.span>
              
              <motion.h3 
                variants={staggerItem}
                className="text-3xl md:text-4xl font-bold mb-8"
              >
                The Problem We&apos;re Solving
              </motion.h3>
              
              <motion.div 
                variants={staggerItem}
                className="grid md:grid-cols-2 gap-8"
              >
                <p className="text-lg text-white/90 leading-relaxed">
                  South Africa&apos;s farmers face numerous challenges that limit their productivity and profitability. 
                  Many lack direct access to markets, forcing them to sell through intermediaries at reduced prices.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Post-harvest losses are common due to inadequate storage and surplus management. Information on 
                  market prices, weather changes, and pest outbreaks is not always accessible, particularly for 
                  farmers in remote areas or those facing language barriers.
                </p>
              </motion.div>

              {/* Problem stats */}
              <motion.div 
                variants={staggerItem}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20"
              >
                {[
                  { value: '30%', label: 'Post-harvest losses' },
                  { value: '40%', label: 'Price reduction via middlemen' },
                  { value: '60%', label: 'Lack market access' },
                  { value: '70%', label: 'Information gaps' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-bold text-accent-light">{stat.value}</p>
                    <p className="text-sm text-white/70 mt-1">{stat.label}</p>
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
