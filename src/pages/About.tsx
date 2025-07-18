import React from 'react';
import GlassContainer from '../components/GlassContainer';
import { Users, Award, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-[#60A5FA]" />,
      title: "Authenticity",
      desc: "We believe in real engagement from real users, never compromising on quality.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#FBBF24]" />,
      title: "Excellence",
      desc: "We strive for excellence in every interaction and service we provide.",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#34D399]" />,
      title: "Innovation",
      desc: "We continuously evolve our services to stay ahead of platform changes.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#FB7185]" />,
      title: "Integrity",
      desc: "We maintain the highest standards of honesty and transparency.",
    }
  ];

  return (
    <div className="pt-28 pb-16 bg-gradient-to-br from-[#000e1f] via-[#001e3c] to-[#001730] min-h-screen text-white">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
            About EngageSphere
          </h1>
          <p className="text-lg font-semibold">
            Empowering creators and businesses to reach their full potential through authentic social media growth.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <GlassContainer className="p-8 md:p-12 bg-[#111111] border border-[#00264D]/60 rounded-lg">
            <h2 className="text-2xl font-extrabold mb-6 tracking-wide">Our Story</h2>
            <p className="mb-6 leading-relaxed">
              Founded in 2023, EngageSphere emerged from a simple observation: genuine social media growth shouldn't be complicated or risky.
              Our founders, having experienced the challenges of building online presence firsthand, set out to create a service that would provide
              authentic engagement while maintaining the highest standards of safety and quality.
            </p>
            <p className="leading-relaxed">
              Today, we're proud to serve thousands of clients worldwide, from emerging content creators to established brands, helping them
              achieve their social media goals through legitimate and effective growth strategies.
            </p>
          </GlassContainer>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <GlassContainer className="p-8 bg-[#111111] border border-[#00264D]/60 rounded-lg">
              <h2 className="text-2xl font-extrabold mb-6 tracking-wide">Our Mission</h2>
              <p className="leading-relaxed">
                To democratize social media success by providing accessible, authentic, and effective growth solutions that empower creators and
                businesses to reach their full potential in the digital space.
              </p>
            </GlassContainer>

            <GlassContainer className="p-8 bg-[#111111] border border-[#00264D]/60 rounded-lg">
              <h2 className="text-2xl font-extrabold mb-6 tracking-wide">Our Vision</h2>
              <p className="leading-relaxed">
                To become the world's most trusted partner in social media growth, setting the industry standard for authenticity, transparency,
                and results.
              </p>
            </GlassContainer>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-extrabold mb-8 tracking-wide">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlassContainer className="p-6 text-center bg-[#111111] border border-[#00264D]/60 rounded-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-black/30">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p>{desc}</p>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassContainer className="p-8 md:p-12 text-center bg-[#111111] border border-[#00264D]/60 rounded-lg">
            <h2 className="text-2xl font-extrabold mb-8 tracking-wide">Our Global Team</h2>
            <p className="mb-6 max-w-2xl mx-auto leading-relaxed">
              With team members across multiple continents, we bring diverse perspectives and expertise to deliver exceptional service 24/7.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-extrabold mb-2">50+</p>
                <p className="text-[#4ca3dd]">Team Members</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">20+</p>
                <p className="text-[#4ca3dd]">Countries</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">24/7</p>
                <p className="text-[#4ca3dd]">Support</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold mb-2">100K+</p>
                <p className="text-[#4ca3dd]">Happy Clients</p>
              </div>
            </div>
          </GlassContainer>
        </motion.section>

      </div>
    </div>
  );
};

export default About;

