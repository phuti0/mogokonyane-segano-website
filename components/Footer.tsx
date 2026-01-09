'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowUp, FiMail, FiPhone } from 'react-icons/fi';
import { WaveDivider } from '@/components/ui/animated-backgrounds';
import { staggerContainer, staggerItem } from '@/lib/animations';

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Impact', href: '#impact' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'POPIA Compliance', href: '#' },
];

const socialLinks = [
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Wave divider at top */}
      <WaveDivider flip color="fill-background-dark" className="-mb-1" />
      
      {/* Main footer content */}
      <div className="bg-background-dark text-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="footer-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-grid)"/>
          </svg>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Top section with logo and newsletter */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10">
            {/* Logo and description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-xl font-bold">MS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mogokonyane-Segano</h3>
                  <p className="text-white/60 text-sm">Holdings</p>
                </div>
              </div>
              
              <p className="text-white/70 max-w-md leading-relaxed mb-6">
                Connecting farmers with markets, knowledge, and opportunities across South Africa. 
                Building a sustainable future for agriculture through technology.
              </p>
              
              {/* Contact quick info */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <a href="mailto:contact@mogokonyane-segano.co.za" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                  <FiMail className="w-4 h-4" />
                  contact@mogokonyane-segano.co.za
                </a>
                <a href="tel:+27000000000" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                  <FiPhone className="w-4 h-4" />
                  +27 (0) XX XXX XXXX
                </a>
              </div>
            </motion.div>

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:text-right"
            >
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-white/60 mb-4">
                Subscribe for farming tips, market updates, and platform news.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 w-full sm:w-64"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Links grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {/* Quick Links */}
            <motion.div variants={staggerItem}>
              <h4 className="font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-all duration-300 inline-flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={staggerItem}>
              <h4 className="font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {['Marketplace', 'Alerts', 'Knowledge Hub', 'Donations'].map((service) => (
                  <li key={service}>
                    <motion.a
                      href="#services"
                      className="text-white/60 hover:text-primary transition-all duration-300 inline-flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={staggerItem}>
              <h4 className="font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-primary transition-all duration-300 inline-flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={staggerItem}>
              <h4 className="font-semibold mb-6 text-white">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-primary/25 border border-white/10 hover:border-primary/40 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              
              {/* Province tags */}
              <div className="mt-6">
                <p className="text-xs text-white/40 mb-2">Operating in:</p>
                <div className="flex flex-wrap gap-2">
                  {['Limpopo', 'North West', 'Gauteng', 'Free State', 'Mpumalanga'].map((province) => (
                    <span
                      key={province}
                      className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-md text-white/50 hover:text-white/70 transition-all duration-300 cursor-default"
                    >
                      {province}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10"
          >
            <p className="text-white/50 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Mogokonyane-Segano Holdings. All rights reserved.
            </p>
            
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/50 hover:text-primary transition-all duration-300 group"
              whileHover={{ y: -3 }}
            >
              <span className="text-sm group-hover:text-primary transition-colors duration-300">Back to top</span>
              <motion.div
                className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/25 flex items-center justify-center transition-all duration-300"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FiArrowUp className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
