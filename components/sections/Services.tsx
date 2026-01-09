'use client'

import { Card } from '@/components/ui/card'
import { FiShoppingCart, FiBell, FiBook, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

const services = [
  {
    icon: FiShoppingCart,
    title: 'Farmer Marketplace',
    description: 'A digital platform where farmers sell directly to buyers, cutting out intermediaries. This ensures fair pricing for farmers and fresher produce for consumers, while reducing post-harvest losses through quicker sales cycles.'
  },
  {
    icon: FiBell,
    title: 'WhatsApp Alert System',
    description: 'A multilingual alert service delivering real-time updates on weather patterns, pest outbreaks, market prices, and farming tips. Available in English, Setswana, isiZulu, Afrikaans, and more.'
  },
  {
    icon: FiBook,
    title: 'Farming Knowledge Hub',
    description: 'An online library offering free, multilingual guides, videos, and resources on modern farming techniques, crop management, and sustainable practices. Designed for both beginners and experienced farmers.'
  },
  {
    icon: FiHeart,
    title: 'Surplus Donation Program',
    description: 'A structured system that enables farmers to donate excess produce to schools, community kitchens, and NGOs. Donors receive official tax deduction certificates, encouraging community support while reducing food waste.'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to empower farmers and transform agriculture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Additional Features</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div>
                <p className="font-semibold text-green-600 mb-2">Urban Farming Kits</p>
                <p className="text-gray-600 text-sm">Complete solutions for city food production</p>
              </div>
              <div>
                <p className="font-semibold text-green-600 mb-2">Training Workshops</p>
                <p className="text-gray-600 text-sm">Hands-on learning with expert guidance</p>
              </div>
              <div>
                <p className="font-semibold text-green-600 mb-2">Google AdSense Integration</p>
                <p className="text-gray-600 text-sm">Supporting farmers through ad revenue</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}