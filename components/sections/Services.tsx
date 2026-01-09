'use client';

import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { FiShoppingCart, FiBell, FiBook, FiHeart, FiArrowRight, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const services = [
  {
    icon: FiShoppingCart,
    title: 'Farmer Marketplace',
    shortDesc: 'Direct sales platform',
    description: 'A digital platform where farmers sell directly to buyers, cutting out intermediaries. This ensures fair pricing for farmers and fresher produce for consumers, while reducing post-harvest losses through quicker sales cycles.',
    features: ['Direct buyer connections', 'Real-time pricing', 'Secure transactions', 'Logistics support'],
    color: 'from-primary to-primary-dark',
    bgColor: 'bg-primary/5',
  },
  {
    icon: FiBell,
    title: 'WhatsApp Alerts',
    shortDesc: 'Real-time notifications',
    description: 'A multilingual alert service delivering real-time updates on weather patterns, pest outbreaks, market prices, and farming tips. Available in English, Setswana, isiZulu, Afrikaans, and more.',
    features: ['Weather forecasts', 'Pest outbreak alerts', 'Price updates', 'Farming tips'],
    color: 'from-accent to-tertiary',
    bgColor: 'bg-accent/5',
  },
  {
    icon: FiBook,
    title: 'Knowledge Hub',
    shortDesc: 'Learning resources',
    description: 'An online library offering free, multilingual guides, videos, and resources on modern farming techniques, crop management, and sustainable practices. Designed for both beginners and experienced farmers.',
    features: ['Video tutorials', 'Expert guides', 'Community forums', 'Certification programs'],
    color: 'from-secondary to-secondary-light',
    bgColor: 'bg-secondary/5',
  },
  {
    icon: FiHeart,
    title: 'Surplus Donation',
    shortDesc: 'Community support',
    description: 'A structured system that enables farmers to donate excess produce to schools, community kitchens, and NGOs. Donors receive official tax deduction certificates, encouraging community support while reducing food waste.',
    features: ['Tax certificates', 'NGO partnerships', 'Impact tracking', 'Community recognition'],
    color: 'from-tertiary to-tertiary-light',
    bgColor: 'bg-tertiary/5',
  }
];

const additionalFeatures = [
  {
    title: 'Urban Farming Kits',
    description: 'Complete solutions for city food production',
    icon: '🌱',
  },
  {
    title: 'Training Workshops',
    description: 'Hands-on learning with expert guidance',
    icon: '📚',
  },
  {
    title: 'Revenue Support',
    description: 'Supporting farmers through multiple streams',
    icon: '💰',
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-alt to-background" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-40 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
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
            What We Offer
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Our </span>
            <span className="gradient-text">Services</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions designed to empower farmers and transform agriculture 
            across South Africa
          </p>
        </motion.div>

        {/* Services Grid - Bento Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="relative h-full glass-card border-0 p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Decorative corner gradient */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.color} opacity-10 blur-2xl group-hover:opacity-25 group-hover:scale-125 transition-all duration-700`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-primary/70 font-medium mb-4 group-hover:text-primary/90 transition-colors duration-300">
                    {service.shortDesc}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                          {service.features.map((feature, i) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08, duration: 0.3 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <FiCheck className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover indicator */}
                  <motion.div
                    className="flex items-center gap-2 mt-6 text-primary font-medium cursor-pointer"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1, x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm">Learn more</span>
                    <FiArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Card className="glass-card border-0 p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Additional Features
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Beyond our core services, we provide these valuable additions to support your farming journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-background hover:bg-primary/5 transition-all duration-400 text-center cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Emoji icon */}
                  <motion.span 
                    className="text-4xl mb-4 block"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.span>
                  
                  <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-300"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA within features */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-400"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore All Services
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
