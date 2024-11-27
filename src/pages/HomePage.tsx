import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Instagram, Calendar, Clock, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[500vh] bg-black text-white">
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold mb-6">Schedule Your Instagram Content</h1>
          <p className="text-xl text-gray-400 mb-8">Plan, create, and automate your social media presence</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Get Started
          </button>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 p-8 rounded-2xl"
            >
              <Instagram className="w-12 h-12 mb-6 text-purple-500" />
              <h3 className="text-2xl font-bold mb-4">Instagram Integration</h3>
              <p className="text-gray-400">Connect your Instagram account and manage everything from one place.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900 p-8 rounded-2xl"
            >
              <Calendar className="w-12 h-12 mb-6 text-blue-500" />
              <h3 className="text-2xl font-bold mb-4">Smart Scheduling</h3>
              <p className="text-gray-400">Plan your content calendar with our intuitive scheduling tools.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900 p-8 rounded-2xl"
            >
              <Clock className="w-12 h-12 mb-6 text-green-500" />
              <h3 className="text-2xl font-bold mb-4">Auto-Posting</h3>
              <p className="text-gray-400">Set it and forget it with our automated posting feature.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074&auto=format&fit=crop"
            alt="Instagram Management"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl font-bold mb-6">Take Control of Your Social Media</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our platform provides everything you need to manage and grow your Instagram presence effectively.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              Start Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Social Scheduler</h3>
              <p className="text-gray-400">Your all-in-one solution for social media management and scheduling.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Auto Scheduling</li>
                <li>Content Calendar</li>
                <li>Analytics</li>
                <li>Team Collaboration</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Social Scheduler. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}