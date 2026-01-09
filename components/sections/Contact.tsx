'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FiMail, FiPhone, FiMapPin, FiSend, FiDownload, FiCheck, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Location',
    value: 'South Africa',
    detail: 'Operating across 5 provinces',
    color: 'from-primary to-primary-light',
  },
  {
    icon: FiMail,
    title: 'Email',
    value: 'contact@mogokonyane-segano.co.za',
    detail: 'We reply within 24 hours',
    color: 'from-accent to-accent-light',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: '+27 (0) XX XXX XXXX',
    detail: 'Mon-Fri, 8am-5pm SAST',
    color: 'from-secondary to-secondary-light',
  },
];

const investmentBreakdown = [
  { label: 'Platform Development', amount: 'R500,000', percentage: 50 },
  { label: 'Marketing & Outreach', amount: 'R200,000', percentage: 20 },
  { label: 'Training Programs', amount: 'R300,000', percentage: 30 },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-40 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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
            Let&apos;s Connect
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Get In </span>
            <span className="gradient-text">Touch</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to join our platform or learn more? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card className="glass-card border-0 p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Send us a message</h3>
              <p className="text-muted-foreground mb-8">Fill out the form and we&apos;ll get back to you soon.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="relative group">
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none ${
                      focusedField === 'name' || formState.name
                        ? '-top-2.5 text-xs bg-card px-2 text-primary font-medium'
                        : 'top-4 text-muted-foreground'
                    }`}
                  >
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(34,130,87,0.1)] transition-all duration-300 outline-none"
                    required
                  />
                </div>

                {/* Email field */}
                <div className="relative group">
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none ${
                      focusedField === 'email' || formState.email
                        ? '-top-2.5 text-xs bg-card px-2 text-primary font-medium'
                        : 'top-4 text-muted-foreground'
                    }`}
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(34,130,87,0.1)] transition-all duration-300 outline-none"
                    required
                  />
                </div>

                {/* Message field */}
                <div className="relative group">
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none ${
                      focusedField === 'message' || formState.message
                        ? '-top-2.5 text-xs bg-card px-2 text-primary font-medium'
                        : 'top-4 text-muted-foreground'
                    }`}
                  >
                    Your Message
                  </motion.label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_rgba(34,130,87,0.1)] transition-all duration-300 outline-none resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-400 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.01, y: isSubmitting || isSubmitted ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FiCheck className="w-5 h-5" />
                        Message Sent!
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Send Message
                        <FiSend className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Investment */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {/* Contact info cards */}
            {contactInfo.map((info, index) => (
              <motion.div key={info.title} variants={staggerItem}>
                <Card className="group glass-card border-0 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:shadow-xl flex-shrink-0 transition-shadow duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{info.title}</h4>
                      <p className="text-primary font-medium">{info.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Investment CTA */}
            <motion.div variants={staggerItem}>
              <Card className="relative overflow-hidden border-0">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary" />
                
                {/* Animated pattern overlay */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '20px 20px'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                
                <div className="relative z-10 p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">💰</span>
                    <h3 className="text-2xl font-bold">Investment Opportunity</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6">
                    We&apos;re seeking <span className="font-bold text-accent-light">R1 million</span> in initial capital 
                    to scale our operations across South Africa.
                  </p>
                  
                  {/* Investment breakdown with animated bars */}
                  <div className="space-y-4 mb-8">
                    {investmentBreakdown.map((item, index) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{item.label}</span>
                          <span className="font-semibold">{item.amount}</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiDownload className="w-5 h-5" />
                      Download Pitch Deck
                    </motion.button>
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Schedule Call
                      <FiArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
