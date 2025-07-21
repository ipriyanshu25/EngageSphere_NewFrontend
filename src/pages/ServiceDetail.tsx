// src/pages/ServiceDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlassContainer from '../components/GlassContainer';
import ServiceFeatures from '../components/ServiceFeatures';
import PricingTier from '../components/PricingTier';
import FAQ from '../components/FAQ';
import { ArrowLeft, Twitter, MessagesSquare, Send, Linkedin, Facebook } from 'lucide-react';
import { SiYoutube, SiInstagram } from 'react-icons/si';
import { get, post } from '../api/axios';

// Brand color configurations
const brandColors: Record<string, any> = {
  youtube: { primary: 'bg-red-600', light: 'bg-red-100', text: 'text-red-600', hover: 'hover:text-red-700', gradient: 'from-red-500 to-red-600', border: 'border-red-400', lightText: 'text-red-100' },
  instagram: { primary: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400', light: 'bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100', text: 'text-purple-600', hover: 'hover:text-purple-700', gradient: 'from-purple-500 via-pink-500 to-orange-400', border: 'border-purple-400', lightText: 'text-purple-100' },
  x: { primary: 'bg-black', light: 'bg-gray-100', text: 'text-black', hover: 'hover:text-gray-800', gradient: 'from-gray-800 to-black', border: 'border-gray-400', lightText: 'text-gray-100' },
  threads: { primary: 'bg-black', light: 'bg-gray-100', text: 'text-black', hover: 'hover:text-gray-800', gradient: 'from-gray-800 to-black', border: 'border-gray-400', lightText: 'text-gray-100' },
  telegram: { primary: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-500', hover: 'hover:text-blue-600', gradient: 'from-blue-400 to-blue-500', border: 'border-blue-400', lightText: 'text-blue-100' },
  linkedin: { primary: 'bg-blue-700', light: 'bg-blue-100', text: 'text-blue-700', hover: 'hover:text-blue-800', gradient: 'from-blue-600 to-blue-700', border: 'border-blue-400', lightText: 'text-blue-100' },
  tiktok: { primary: 'bg-[#69C9D0]', light: 'bg-[#C2F0F7]', text: 'text-[#69C9D0]', hover: 'hover:text-[#0ABAB5]', gradient: 'from-[#69C9D0] to-[#EE1D52]', border: 'border-[#69C9D0]', lightText: 'text-[#C2F0F7]' },
  facebook: { primary: 'bg-blue-600', light: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:text-blue-700', gradient: 'from-blue-500 to-blue-600', border: 'border-blue-400', lightText: 'text-blue-100' },
};

// Static service data (description, features, faq)
const serviceData: any = {
  youtube: {
    title: 'YouTube Growth Services',
    description: 'Boost your YouTube channel with our premium engagement services. Get more views, subscribers, likes, and comments to increase your reach and monetization potential.',
    icon: <SiYoutube className="h-16 w-16" style={{ color: '#FF0000' }} />, 
    features: [
      'High-retention views from real users',
      'Active subscribers that engage with your content',
      'Genuine likes and comments',
      'Increased watch time',
      'Improved search ranking',
      'Enhanced channel credibility',
      'Natural growth pattern',
      'Higher chances of monetization'
    ],
    faq: [
      { question: 'Will these subscribers unsubscribe later?', answer: 'No, our subscribers are genuine users interested in your niche; retention rates exceed industry standards.' },
      { question: 'Is this safe for my YouTube channel?', answer: 'Yes. We employ only approved, TOS-compliant methods to protect your channel’s standing.' },
      { question: 'How quickly will I see the results?', answer: 'Initial impact appears within 24–48 hours, with gradual delivery for a natural growth pattern.' },
      { question: 'Do I need to share my password?', answer: 'No. We require only your channel URL or video links to deliver our services.' },
      { question: 'Will this help me get monetized?', answer: 'Yes. Reaching subscriber and watch time thresholds faster improves monetization eligibility.' }
    ]
  },
  instagram: {
    title: 'Instagram Growth Services',
    description: 'Elevate your Instagram presence with our premium growth services. Gain real followers, likes, and comments to boost your engagement and influence.',
    icon: <SiInstagram className="h-16 w-16" style={{ color: '#E4405F' }} />, 
    features: [
      'Real, active followers from targeted regions',
      'Genuine likes from active accounts',
      'Authentic comments that boost engagement',
      'Improved visibility on Explore page',
      'Enhanced profile credibility',
      'Higher engagement rates',
      'Natural growth pattern',
      'Increased brand awareness'
    ],
    faq: [
      { question: 'Are these real Instagram followers?', answer: 'Yes, followers come from real accounts with profiles and posts—no bots.' },
      { question: 'Will my account get banned?', answer: 'No, methods comply with Instagram’s TOS and deliver gradually to mimic organic growth.' },
      { question: 'How long to see results?', answer: 'Expect delivery within 24–48 hours, depending on package size.' },
      { question: 'Can I target specific countries?', answer: 'Yes. Premium plans allow geographic targeting to match your audience.' },
      { question: 'Will they engage?', answer: 'Many recipients actively interact if your content aligns with their interests.' }
    ]
  },
  x: {
    title: 'X Growth Services',
    description: 'Expand your X presence with premium services: followers, likes, retweets to boost engagement and visibility.',
    icon: <Twitter className="h-16 w-16" style={{ color: '#1DA1F2' }} />, 
    features: [
      'Real X followers delivered organically',
      'Genuine likes from active profiles',
      'Authentic retweets to widen reach',
      'Better visibility in trending feeds',
      'Enhanced profile credibility',
      'Higher engagement rates',
      'Steady, natural growth'
    ],
    faq: [
      { question: 'Will followers unfollow later?', answer: 'Retention rates are industry-leading; minor natural fluctuation is normal.' },
      { question: 'Is it safe?', answer: 'Fully compliant with X’s terms—delivered gradually for organic patterns.' },
      { question: 'How fast?', answer: 'Results start in 24–48 hours, with completion varying by tier.' },
      { question: 'Password needed?', answer: 'No password required—only username or profile URL.' }
    ]
  },
  threads: {
    title: 'Threads Growth Services',
    description: 'Build your Threads voice with followers, likes, and replies to establish credibility on Meta’s new platform.',
    icon: <MessagesSquare className="h-16 w-16" />, 
    features: [
      'Real Threads followers',
      'Genuine likes on posts',
      'Authentic replies for engagement',
      'Enhanced content visibility',
      'Early adopter advantage',
      'Organic growth patterns'
    ],
    faq: [
      { question: 'Safe on Threads?', answer: 'Yes. Methods comply with Meta’s guidelines for natural growth.' },
      { question: 'How deliver followers?', answer: 'We connect your profile with real users interested in your niche.' }
    ]
  },
  telegram: {
    title: 'Telegram Growth Services',
    description: 'Grow your Telegram channel with real members, post views, and engagement to expand your community.',
    icon: <Send className="h-16 w-16" style={{ color: '#0088CC' }} />, 
    features: [
      'Real channel members',
      'Active group participants',
      'Genuine post views',
      'Improved channel trust',
      'Steady, natural growth'
    ],
    faq: [
      { question: 'Are these real users?', answer: 'Yes—no bots. Members have active Telegram profiles.' },
      { question: 'Will they stay?', answer: 'High retention rates ensure lasting membership.' }
    ]
  },
  linkedin: {
    title: 'LinkedIn Growth Services',
    description: 'Expand your professional network with genuine connections, endorsements, and post engagement.',
    icon: <Linkedin className="h-16 w-16" style={{ color: '#0A66C2' }} />, 
    features: [
      'Real professional connections',
      'Genuine skill endorsements',
      'Authentic post engagement',
      'Enhanced profile visibility'
    ],
    faq: [
      { question: 'Are these real professionals?', answer: 'Yes. Connections have complete LinkedIn profiles.' },
      { question: 'Safe for reputation?', answer: 'Complies with LinkedIn TOS to protect your standing.' }
    ]
  },
  tiktok: {
    title: 'TikTok Growth Services',
    description: 'Boost your TikTok presence with real followers, views, and engagement for viral potential.',
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16" fill="#000"><path d="M12.5 2.75c0-.69.56-1.25..."/></svg>),
    features: [
      'Real active followers',
      'Genuine video views and likes',
      'Targeted audience engagement',
      'Organic growth patterns'
    ],
    faq: [
      { question: 'Real followers and views?', answer: 'Yes—no bots; all interactions come from active users.' },
      { question: 'Safe for account?', answer: 'Follows TikTok guidelines to keep your account secure.' }
    ]
  },
  facebook: {
    title: 'Facebook Growth Services',
    description: 'Elevate your Facebook page with real likes, followers, and post engagement to build authority.',
    icon: <Facebook className="h-16 w-16" style={{ color: '#1877F2' }} />, 
    features: [
      'Real page likes',
      'Genuine followers',
      'Authentic post engagement',
      'Enhanced brand credibility'
    ],
    faq: [
      { question: 'Real users only?', answer: 'Yes—no fake accounts or bots, only genuine users.' },
      { question: 'Will it affect page standing?', answer: 'Compliant with Facebook’s policies for safe growth.' }
    ]
  }
};

const getDefaultData = (platform: string) => ({
  title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Growth Services`,
  description: `Boost your ${platform} presence...`, icon: <SiYoutube className="h-16 w-16" />, features: [], faq: []
});

type Pricing = { name: string; price: string; description: string; features: string[]; isPopular?: boolean };
interface ServiceDataDynamic { pricing: Pricing[]; }

const ServiceDetail: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const normalized = platform?.toLowerCase() || '';
  const staticInfo = serviceData[normalized] || getDefaultData(normalized);
  const colors = brandColors[normalized] || brandColors.facebook;

  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      setLoading(true);
      try {
        const resp = await post<ServiceDataDynamic>('/plan/getByname', { name: normalized });
        setPricing(resp.pricing);
      } catch (err: any) {
        console.error('Error fetching pricing:', err);
        setError(err.response?.data?.error || 'Unable to load pricing.');
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, [normalized]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/" className={`inline-flex items-center ${colors.text} font-medium mb-8 ${colors.hover}`}>
          <ArrowLeft size={18} className="mr-2" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className={`${colors.light} p-6 rounded-full`}>{staticInfo.icon}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{staticInfo.title}</h1>
            <p className="text-slate-600 max-w-2xl">{staticInfo.description}</p>
          </div>
        </div>

        {/* Features Section */}
        {staticInfo.features.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Premium Features</h2>
            <ServiceFeatures features={staticInfo.features} />
          </section>
        )}

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((tier, idx) => (
              <PricingTier
                key={idx}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                isPopular={tier.isPopular}
              />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {staticInfo.faq.length > 0 && <FAQ items={staticInfo.faq} />}

        {/* CTA Section */}
        <section className="mt-16">
          <GlassContainer className={`bg-gradient-to-r ${colors.gradient} rounded-lg shadow-lg ${colors.border} p-8 md:p-12 text-center text-white`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to grow your {normalized} presence?</h2>
            <p className={`${colors.lightText} mb-8 max-w-2xl mx-auto`}>Join thousands of satisfied customers who have transformed their online presence with our premium services.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => (window.location.href = '/login')} className={`bg-white ${colors.text} hover:bg-slate-100 px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg`}>Get Started Now</button>
              <Link to="/contact" className={`bg-white border ${colors.border} ${colors.text} hover:bg-opacity-90 px-6 py-3 rounded-full font-medium transition-colors`}>Contact Support</Link>
            </div>
          </GlassContainer>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
