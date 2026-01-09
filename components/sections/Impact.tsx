'use client'

import { Card } from '@/components/ui/card'
import { FiTrendingUp, FiUsers, FiShield, FiCloud } from 'react-icons/fi'
import { motion } from 'framer-motion'

const impacts = [
  {
    icon: FiUsers,
    title: 'Reduced Rural Unemployment',
    description: 'Creating job opportunities for students and youth from disadvantaged backgrounds'
  },
  {
    icon: FiTrendingUp,
    title: 'Increased Farmer Profitability',
    description: 'Cutting out middlemen to ensure farmers receive fair prices for their produce'
  },
  {
    icon: FiShield,
    title: 'Boost to Food Security',
    description: 'Supporting schools and communities through our surplus donation program'
  },
  {
    icon: FiCloud,
    title: 'Enhanced Climate Resilience',
    description: 'Real-time information sharing on weather patterns and sustainable practices'
  }
]

export default function Impact() {
  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Social Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating lasting change in communities across South Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center h-full border-2 border-green-100 hover:border-green-300 transition-colors">
                <impact.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{impact.title}</h3>
                <p className="text-gray-600 text-sm">{impact.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Financial Projections</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-4">Conservative Scenario</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Year 1:</span>
                  <span className="font-bold">R200,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 2:</span>
                  <span className="font-bold">R1,200,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 3:</span>
                  <span className="font-bold">R6,000,000</span>
                </div>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-sm">Net Profit Margin: 22%</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">High Growth Scenario</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Year 1:</span>
                  <span className="font-bold">R500,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 2:</span>
                  <span className="font-bold">R3,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 3:</span>
                  <span className="font-bold">R15,000,000</span>
                </div>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-sm">Net Profit Margin: 30%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}