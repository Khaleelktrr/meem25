import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Users, Newspaper, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-700 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-white text-2xl md:text-3xl font-light mb-4">SSF Daawa Sector</h2>
            <h1 className="text-yellow-400 text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-wider">
              Muhimmath
            </h1>
            <p className="text-white text-xl md:text-2xl font-light">
              <span className="text-yellow-300">2025</span> July 20-27 <span className="text-yellow-300">Badiadka</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/results"
              className="bg-yellow-500 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
            >
              View Results
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Muhimmath</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the various aspects of our institution through these quick access points
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Results',
                description: 'Check competition results and winners',
                link: '/results',
                color: 'bg-yellow-500'
              },
              {
                icon: Newspaper,
                title: 'Latest News',
                description: 'Stay updated with event announcements',
                link: '/news',
                color: 'bg-blue-500'
              },
              {
                icon: Image,
                title: 'Gallery',
                description: 'View photos from past events',
                link: '/gallery',
                color: 'bg-green-500'
              },
              {
                icon: Users,
                title: 'About Us',
                description: 'Learn about our mission and history',
                link: '/about',
                color: 'bg-purple-500'
              },
              {
                icon: Calendar,
                title: 'Events',
                description: 'Upcoming programs and schedule',
                link: '/news',
                color: 'bg-red-500'
              },
              {
                icon: MapPin,
                title: 'Contact',
                description: 'Get in touch with organizers',
                link: '/contact',
                color: 'bg-indigo-500'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Highlights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key information about Muhimmath Events 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-gray-600">8 Days of Activities & Events</p>
              <p className="text-red-600 font-semibold">July 20-27, 2025</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Badiadka</p>
              <p className="text-yellow-600 font-semibold">Kasaragod District</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Participants</h3>
              <p className="text-gray-600">Open to All</p>
              <p className="text-blue-600 font-semibold">Students & Community Members</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
