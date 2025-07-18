import React from 'react';
import { Link } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LearnMore: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-[#000e1f] via-[#001e3c] to-[#001730] text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">

        {/* Hero Section */}
        <motion.div
          className="mb-16 sm:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassContainer className="rounded-3xl border border-[#00264D]/50 bg-[#1a1a1a] p-6 sm:p-10 md:p-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 tracking-tight">
              How EngageSphere Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Learn how our real and organic social media growth services can help you achieve your goals and expand your online presence.
            </p>
          </GlassContainer>
        </motion.div>

        {/* How It Works */}
        <section className="mb-16 sm:mb-20">
          <motion.div
            className="rounded-3xl border border-[#00264D]/50 bg-[#1a1a1a] p-6 sm:p-10 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 tracking-wide">
              Simple 3-Step Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {[{
                icon: <Users className="h-10 w-10 text-green-500" />,
                title: '1. Choose Your Service',
                desc: 'Select your desired platform and growth package that matches your goals.',
              }, {
                icon: <Shield className="h-10 w-10 text-blue-400" />,
                title: '2. Secure Payment',
                desc: 'Complete your order with our secure payment system. No password required.',
              }, {
                icon: <Zap className="h-10 w-10 text-yellow-400" />,
                title: '3. Watch Your Growth',
                desc: 'See real results as we deliver your order with our proven methods.',
              }].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center transition-all hover:-translate-y-1 hover:scale-105 duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#2f2f2f] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-base sm:text-lg">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10 text-center tracking-wide">
            Why Choose EngageSphere?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[{
              icon: <CheckCircle className="h-7 w-7 text-emerald-400" />,
              title: '100% Safe & Secure',
              desc: 'Our methods comply with all platform guidelines and terms of service. Your account safety is our top priority.',
            }, {
              icon: <Users className="h-7 w-7 text-green-500" />,
              title: 'Real Engagement',
              desc: 'All engagement comes from real, active accounts. No bots or fake profiles.',
            }, {
              icon: <Clock className="h-7 w-7 text-yellow-400" />,
              title: 'Fast Delivery',
              desc: 'See results within 24-48 hours with our efficient delivery system.',
            }, {
              icon: <Shield className="h-7 w-7 text-blue-400" />,
              title: 'Money-Back Guarantee',
              desc: '30-day satisfaction guarantee ensures your investment is protected.',
            }].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlassContainer className="rounded-3xl border border-[#00264D]/50 bg-[#1a1a1a] p-6 sm:p-8">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-base sm:text-lg">{item.desc}</p>
                    </div>
                  </div>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassContainer className="rounded-3xl border border-[#00264D]/50 bg-[#1a1a1a] p-6 sm:p-10 md:p-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 tracking-tight">
              Ready to Start Growing?
            </h1>
            <p className="mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl">
              Join thousands of satisfied customers who have transformed their online presence with EngageSphere.
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="inline-flex items-center bg-gradient-to-r from-[#4ca3dd] to-[#0f172a] hover:from-[#0f172a] hover:to-[#4ca3dd] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all"
              >
                Get Started Now
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>
          </GlassContainer>
        </motion.section>
      </div>
    </div>
  );
};

export default LearnMore;
