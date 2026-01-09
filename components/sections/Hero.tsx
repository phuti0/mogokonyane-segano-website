'use client'

import { Button } from '@/components/ui/button'
import { FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Farmers,
              <span className="text-green-600"> Feeding Opportunities</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Empowering South African farmers with market access, knowledge, and digital tools 
              for sustainable agriculture and community upliftment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Join the Platform
                <FiArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-green-600">R214B</p>
                <p className="text-sm text-gray-600">Market Size</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">2.5M+</p>
                <p className="text-sm text-gray-600">Farmers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">5</p>
                <p className="text-sm text-gray-600">Provinces</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img
                src="/api/placeholder/600/400"
                alt="Farmers using technology"
                className="rounded-lg w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}