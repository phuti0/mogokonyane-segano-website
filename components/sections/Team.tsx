'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

const team = [
  {
    name: 'One Segano',
    role: 'Co-Founder',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Otlotleng Mogokonyane',
    role: 'Co-Founder',
    image: '/api/placeholder/300/300'
  }
]

const roles = [
  { title: 'CTO', description: 'Oversees platform development and technical infrastructure' },
  { title: 'Marketing Manager', description: 'Executes outreach campaigns and brand strategy' },
  { title: 'Community Liaison', description: 'Manages rural engagement and farmer relations' },
  { title: 'Finance Officer', description: 'Handles accounts and donor documentation' }
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet The Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rural-born entrepreneurs with firsthand experience of agricultural challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-semibold">{member.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Key Team Roles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full">
                  <h4 className="text-lg font-bold text-green-600 mb-2">{role.title}</h4>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-green-50 rounded-2xl p-8"
        >
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-green-600">Our commitment:</span> Building a team 
            that consists of students and unemployed youth from rural communities or disadvantaged backgrounds.
          </p>
        </motion.div>
      </div>
    </section>
  )
}