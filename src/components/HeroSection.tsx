import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Award, Shield, Users } from 'lucide-react';
import GlassContainer from './GlassContainer';

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#000e1f] via-[#001e3c] to-[#001730] text-white shadow-inner">
      {/* Background Royal Glow Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1a2a6c] rounded-full opacity-20 blur-[120px]"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4b6cb7] rounded-full opacity-20 blur-[120px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Hero Section */}
       <div className="lg:w-1/2 bg-white backdrop-blur-md border border-white/20 rounded-3xl p-10 transition-transform duration-300 hover:-translate-y-1">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-black drop-shadow-xl">
    Elevate Your Social Media Presence
  </h1>

  <p className="text-lg text-black mb-8 max-w-xl leading-relaxed">
    <span className="text-black font-semibold">EngageSphere</span> helps you build your online empire with real and organic followers, likes, and engagement across major platforms.
  </p>

  <div className="flex flex-wrap gap-4">
    <Link
  to="/learn-more"
  className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-black px-6 py-3 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
>
  Learn More
</Link>

  </div>
</div>



{/* Right Features Grid */}
<div className="lg:w-1/2 w-full px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto bg-white p-6 rounded-2xl">
    {[
      {
        icon: <Award className="h-6 w-6 text-yellow-500" />,
        title: 'Premium Quality',
        desc: 'Real engagement from real users',
        span: 'sm:col-span-2',
      },
      {
        icon: <Zap className="h-6 w-6 text-pink-500" />,
        title: 'Fast Delivery',
        desc: 'Get noticed quickly',
      },
      {
        icon: <Shield className="h-6 w-6 text-cyan-500" />,
        title: 'Top Security',
        desc: 'Safe & encrypted',
      },
      {
        icon: <Users className="h-6 w-6 text-green-600" />,
        title: '24/7 Support',
        desc: 'We’re always here',
        span: 'sm:col-span-2',
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className={`p-5 bg-white border border-gray-200 rounded-2xl transition-transform duration-300 hover:-translate-y-1 ${item.span || ''}`}
      >
        <div className="flex items-center">
          <div className="bg-white p-3 rounded-full mr-4 border border-gray-300">
            {item.icon}
          </div>
          <div>
            <h3 className="font-extrabold text-2xl text-black">{item.title}</h3>
            <p className="text-lg text-black">{item.desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>







        </div>
      </div>
    </section>
  );
};

export default HeroSection;
