import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Instagram, Twitter, Facebook, Linkedin, Youtube,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 bg-gradient-to-br from-[#000e1f] via-[#001e3c] to-[#001730] text-white shadow-inner">
      <div className="container mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-5 hover:brightness-110 transition">
              <Globe className="h-8 w-8 text-white" />
              <span className="ml-3 text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">
                EngageSphere
              </span>
            </Link>
            <p className="text-yellow-100 mb-6 leading-relaxed max-w-xs">
              Your premier destination for authentic social media engagement and growth services.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              {[
                { Icon: Instagram, color: '#C13584' },
                { Icon: Twitter, color: '#1DA1F2' },
                { Icon: Facebook, color: '#1877F2' },
                { Icon: Linkedin, color: '#0077B5' },
                { Icon: Youtube, color: '#FF0000' },
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors drop-shadow-md"
                  style={{ color }}
                  aria-label="Social Media Link"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-yellow-400 pb-2 tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-3 text-yellow-300">
              {[
                'Youtube', 'Instagram', 'X', 'Threads',
                'Telegram', 'LinkedIn', 'TikTok', 'Facebook',
              ].map((platform) => (
                <li key={platform}>
                  <Link
                    to={`/services/${platform.toLowerCase()}`}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {platform} Services
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-yellow-400 pb-2 tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3 text-yellow-300">
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-yellow-400 pb-2 tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-3 text-yellow-300">
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-yellow-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-400 transition-colors">
                  FAQ Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-yellow-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-yellow-300 text-sm">
          <p className="mb-4 md:mb-0 select-none">
            &copy; {new Date().getFullYear()} EngageSphere. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link to="/terms" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
