'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to join our platform or learn more? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6 flex items-start space-x-4">
              <FiMapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-gray-600">South Africa</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start space-x-4">
              <FiMail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-gray-600">contact@mogokonyane-segano.co.za</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start space-x-4">
              <FiPhone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-gray-600">+27 (0) XX XXX XXXX</p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Investment Opportunity</h3>
              <p className="mb-6">
                We&apos;re seeking R1 million in initial capital to scale our operations across South Africa.
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Platform Development: R500,000</li>
                <li>• Marketing & Outreach: R200,000</li>
                <li>• Training Programs: R300,000</li>
              </ul>
              <Button variant="secondary" className="w-full">
                Download Pitch Deck
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}