'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '@/lib/animations';

const team = [
  {
    name: 'One Segano',
    role: 'Co-Founder',
    bio: 'Rural-born entrepreneur with deep understanding of agricultural challenges facing South African farmers.',
    image: '/onesegano.png',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'one@mogokonyane-segano.co.za',
    },
  },
  {
    name: 'Otlotleng Mogokonyane',
    role: 'Co-Founder',
    bio: 'Passionate about leveraging technology to create opportunities for rural communities.',
    image: '/otlotleng.png',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'otlotleng@mogokonyane-segano.co.za',
    },
  },
];

const roles = [
  { 
    title: 'CTO', 
    description: 'Oversees platform development and technical infrastructure',
    icon: '💻',
    color: 'from-primary to-primary-light',
  },
  { 
    title: 'Marketing Manager', 
    description: 'Executes outreach campaigns and brand strategy',
    icon: '📢',
    color: 'from-accent to-accent-light',
  },
  { 
    title: 'Community Liaison', 
    description: 'Manages rural engagement and farmer relations',
    icon: '🤝',
    color: 'from-secondary to-secondary-light',
  },
  { 
    title: 'Finance Officer', 
    description: 'Handles accounts and donor documentation',
    icon: '📊',
    color: 'from-tertiary to-tertiary-light',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="team" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-alt to-background" />
      <div className="absolute inset-0 bg-dots opacity-40" />
      
      {/* Floating orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 80]) }}
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
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
            The People Behind
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Meet The </span>
            <span className="gradient-text">Team</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rural-born entrepreneurs with firsthand experience of agricultural challenges, 
            committed to transforming South African farming
          </p>
        </motion.div>

        {/* Team Members - Featured Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="group"
            >
              <Card className="relative glass-card border-0 overflow-hidden transition-all duration-500 hover:shadow-2xl">
                {/* Image with overlay */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Social icons - appear on hover */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {[
                      { icon: FiLinkedin, href: member.social.linkedin },
                      { icon: FiTwitter, href: member.social.twitter },
                      { icon: FiMail, href: `mailto:${member.social.email}` },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/80 text-xs font-medium mb-3">
                        {member.role}
                      </span>
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Roles Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Key Team Roles
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="group relative h-full glass-card border-0 p-6 text-center hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Icon */}
                  <motion.span 
                    className="text-4xl mb-4 block"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {role.icon}
                  </motion.span>
                  
                  <h4 className={`text-lg font-bold mb-2 bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}>
                    {role.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Card className="relative overflow-hidden border-0">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="relative z-10 p-10 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-3xl">🌱</span>
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                Our Commitment to Community
              </h3>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Building a team that consists of <span className="text-primary font-semibold">students and unemployed youth</span> from 
                rural communities or disadvantaged backgrounds. We believe in creating opportunities 
                while solving agricultural challenges.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-border/50">
                {[
                  { value: '100%', label: 'Local Talent' },
                  { value: '60%', label: 'From Rural Areas' },
                  { value: '40%', label: 'Youth Employment' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
