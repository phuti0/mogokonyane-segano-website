import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mogokonyane-Segano</h3>
            <p className="text-gray-400">
              Connecting farmers, feeding opportunities across South Africa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-white">Impact</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white">Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">POPIA Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mogokonyane-Segano Holdings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}