'use client'

import { Card } from '@/components/ui/card'
import { FiTarget, FiEye } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded by rural-born entrepreneurs with firsthand experience of agricultural challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full border-2 border-green-100">
              <FiTarget className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To revolutionise South Africa&apos;s agricultural ecosystem by empowering farmers with 
                market access, knowledge, and digital tools, while promoting sustainable farming 
                and community upliftment through technology-driven solutions.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full border-2 border-green-100">
              <FiEye className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                A future where every farmer, from rural to urban settings, has equal opportunity 
                to thrive in a globally competitive agricultural market.
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-6">The Problem We&apos;re Solving</h3>
          <p className="text-lg leading-relaxed">
            South Africa&apos;s farmers face numerous challenges that limit their productivity and profitability. 
            Many lack direct access to markets, forcing them to sell through intermediaries at reduced prices. 
            Post-harvest losses are common due to inadequate storage and surplus management. Information on 
            market prices, weather changes, and pest outbreaks is not always accessible, particularly for 
            farmers in remote areas or those facing language barriers.
          </p>
        </motion.div>
      </div>
    </section>
  )
}