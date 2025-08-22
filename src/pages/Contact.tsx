import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const { error } = await supabase.from('contacts').insert([{
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      subject: formData.subject,
      message: formData.message,
      status: 'unread'
    }]);

    if (error) {
      setSubmitStatus('error');
      console.error('Error submitting contact form:', error);
    } else {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Badiadka Town Hall', 'Kasaragod District', 'Kerala - 671543'],
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9876543210', '+91 8765432109'],
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@muhimmath.org', 'contact@muhimmath.org'],
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      color: 'bg-purple-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Director',
      phone: '+91 9876543210',
      email: 'director@muhimmath.org'
    },
    {
      name: 'Prof. Lakshmi Nair',
      position: 'Cultural Coordinator',
      phone: '+91 8765432109',
      email: 'cultural@muhimmath.org'
    },
    {
      name: 'Suresh Menon',
      position: 'Competition Head',
      phone: '+91 7654321098',
      email: 'competitions@muhimmath.org'
    },
    {
      name: 'Priya Sharma',
      position: 'Media & Communications',
      phone: '+91 6543210987',
      email: 'media@muhimmath.org'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about Muhimmath? Want to participate or collaborate? We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Participation Information">Participation Information</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Media & Press">Media & Press</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm text-center">Thank you for your message! We will get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm text-center">Sorry, there was an error sending your message. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Team Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Direct Contacts</h2>
              </div>

              <div className="space-y-6">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-l-4 border-red-500 pl-4 py-2"
                  >
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-red-600 text-sm mb-2">{member.position}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${member.phone}`} className="hover:text-red-600 transition-colors">
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${member.email}`} className="hover:text-red-600 transition-colors">
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/news" className="block hover:text-yellow-300 transition-colors">
                  📰 Latest News & Updates
                </a>
                <a href="/results" className="block hover:text-yellow-300 transition-colors">
                  🏆 Competition Results
                </a>
                <a href="/gallery" className="block hover:text-yellow-300 transition-colors">
                  📸 Photo Gallery
                </a>
                <a href="/about" className="block hover:text-yellow-300 transition-colors">
                  ℹ️ About Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
