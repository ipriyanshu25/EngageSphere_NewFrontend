import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { CheckCircle } from 'lucide-react';

// ————————————————
// Sample data (replace with your real data)
// ————————————————
const services = [
  {
    serviceId: 1,
    serviceHeading: 'YouTube Growth',
    serviceDescription: 'Authentic views, subscribers & engagement.',
    serviceContent: [
      { contentId: 'a', key: 'Views', value: '1k–100k' },
      { contentId: 'b', key: 'Subscribers', value: '100–10k' },
    ],
    iconColor: 'text-blue-600',
  },
  {
    serviceId: 2,
    serviceHeading: 'Instagram Boost',
    serviceDescription: 'Real followers, likes & comments.',
    serviceContent: [
      { contentId: 'a', key: 'Followers', value: '500–50k' },
      { contentId: 'b', key: 'Likes', value: '1k–20k' },
    ],
    iconColor: 'text-pink-500',
  },
  {
    serviceId: 3,
    serviceHeading: 'Twitter Engagement',
    serviceDescription: 'Genuine retweets & impressions.',
    serviceContent: [
      { contentId: 'a', key: 'Impressions', value: '2k–30k' },
      { contentId: 'b', key: 'Retweets', value: '100–5k' },
    ],
    iconColor: 'text-sky-500',
  },
  {
    serviceId: 4,
    serviceHeading: 'LinkedIn Leads',
    serviceDescription: 'Quality connections & endorsements.',
    serviceContent: [
      { contentId: 'a', key: 'Connections', value: '100–5k' },
      { contentId: 'b', key: 'Endorsements', value: '50–2k' },
    ],
    iconColor: 'text-blue-700',
  },
  {
    serviceId: 5,
    serviceHeading: 'TikTok Virality',
    serviceDescription: 'Real views & likes to go viral.',
    serviceContent: [
      { contentId: 'a', key: 'Views', value: '5k–100k' },
      { contentId: 'b', key: 'Likes', value: '500–20k' },
    ],
    iconColor: 'text-teal-400',
  },
];

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Content Creator',
    content:
      'EngageSphere helped me grow my Instagram by 10k+ in 2 months. Real engagement & reach!',
    rating: 5,
  },
  {
    name: 'Meera Patel',
    role: 'YouTuber',
    content: 'Hit monetization fast. Their YouTube growth service is unmatched.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Business Owner',
    content:
      'LinkedIn leads & ROI skyrocketed after using their services.',
    rating: 4,
  },
];

const faqItems = [
  {
    question: 'Is engagement real?',
    answer: '100% real users. No bots, no risks to your account.',
  },
  {
    question: 'When do I see results?',
    answer: 'Initial delivery in 24–48h; full results vary by package.',
  },
  {
    question: 'Do I share passwords?',
    answer: 'Never. We only need your public username or URL.',
  },
  {
    question: 'Are services safe?',
    answer: 'Fully compliant with platform TOS to keep your account secure.',
  },
  {
    question: 'Refund policy?',
    answer: '30-day money-back guarantee if we don’t deliver.',
  },
];

// ————————————————
// Main Page Component
// ————————————————
const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-900">
      <HeroSection />

      {/* Services */}
      <section className="py-16 bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-blue-700">
              Comprehensive engagement solutions for your social media handles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.serviceId}
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 mb-4 bg-blue-100 flex items-center justify-center rounded-full group-hover:bg-blue-200 transition-colors`}
                  >
                    <CheckCircle className={`h-10 w-10 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-2 text-center">
                    {service.serviceHeading}
                  </h3>
                  <p className="text-lg text-blue-700 text-center mb-4">
                    {service.serviceDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  {service.serviceContent.map((item) => (
                    <div
                      key={item.contentId}
                      className="flex items-center justify-center space-x-3"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="text-base text-gray-800">
                        {item.key}: ${item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/services"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-500 transition"
            >
              View More Services
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-8 text-blue-900">
            What Our Clients Say
          </h2>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">
            Frequently Asked Questions
          </h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Ready to Boost Your Social Reach?
          </motion.h2>
          <p className="text-xl mb-8">Join thousands of satisfied clients now!</p>

          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-full shadow-lg hover:bg-blue-50 transition"
            >
              Get Started
            </a>
          </motion.div>

          <div className="mt-12 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email for a free audit"
              className="w-full max-w-md px-4 py-3 rounded-l-full focus:outline-none text-gray-800"
            />
            <button className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-r-full hover:bg-blue-50 transition">
              Free Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
