// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   Menu, X, Zap, User, LogOut, Crown, ChevronDown, Search,
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Globe } from 'lucide-react';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'initial'>('initial');
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, isAuthenticated, logout } = useAuth();
//   const lastScrollY = useRef(0);

//   const servicePlatforms = [
//     'youtube', 'instagram', 'x', 'threads', 'telegram', 'linkedin', 'tiktok', 'facebook'
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentY = window.scrollY;
//       if (currentY === 0) {
//         setScrollDirection('initial');
//       } else if (currentY < lastScrollY.current) {
//         setScrollDirection('up');
//       } else {
//         setScrollDirection('down');
//       }
//       lastScrollY.current = currentY;
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsOpen(false);
//     setServicesOpen(false);
//   }, [location]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const toggleServices = () => setServicesOpen(!servicesOpen);

//   const handleSearch = () => {
//     const query = searchQuery.trim().toLowerCase();
//     if (servicePlatforms.includes(query)) {
//       navigate(`/services/${query}`);
//     } else if (["about", "contact"].includes(query)) {
//       navigate(`/${query}`);
//     } else if (query === "profile" && isAuthenticated) {
//       navigate("/profile");
//     } else if (query === "admin" && isAuthenticated && user?.isAdmin) {
//       navigate("/admin-dashboard");
//     } else {
//       alert("Page not found or permission denied.");
//     }
//     setSearchQuery("");
//     setServicesOpen(false);
//   };

//   const isScrolled = scrollDirection === 'up' || scrollDirection === 'down';

//   const navbarBg = isScrolled
//     ? 'bg-white shadow-md backdrop-blur-md'
//     : 'bg-gradient-to-r from-[#0a1433] via-[#0c1d47] to-[#0f254f] backdrop-blur-md';

//   const textColor = isScrolled ? 'text-black' : 'text-white';
//   const hoverColor = isScrolled ? 'hover:text-blue-600' : 'hover:text-yellow-300';
//   const borderColor = isScrolled ? 'border-black/10' : 'border-white/20';

//   return (
//     <header className={`sticky top-0 z-50 transition-all duration-300 py-3 ${navbarBg}`}>
//       <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
// <Link to="/" className={`flex items-center group transition-transform hover:scale-105 ${textColor}`}>
//   <Globe className={`h-9 w-9 ${isScrolled ? 'text-black' : 'text-white'} drop-shadow-xl animate-pulse`} />
//   <span className={`ml-3 text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
//     EngageSphere
//   </span>
// </Link>

//         <nav className={`hidden md:flex items-center space-x-6 ${textColor}`}>
//           <Link to="/" className={`text-lg font-semibold ${hoverColor}`}>Home</Link>

//           <div className="relative">
//             <button
//               onClick={toggleServices}
//               className={`font-semibold text-lg flex items-center gap-2 ${hoverColor}`}
//             >
//               Services
//               <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
//             </button>

//             <AnimatePresence>
//               {servicesOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute left-0 mt-4 w-64 bg-white rounded-xl border border-gray-200 p-4 z-50 shadow-xl"
//                 >
//                   <motion.ul
//                     initial="hidden"
//                     animate="visible"
//                     variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
//                     className="flex flex-col space-y-2"
//                   >
//                     {servicePlatforms.map((platform) => (
//                       <motion.li
//                         key={platform}
//                         variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
//                       >
//                         <Link
//                           to={`/services/${platform}`}
//                           onClick={() => setServicesOpen(false)}
//                           className="block text-black text-lg font-medium capitalize px-4 py-2 rounded hover:bg-black/10 hover:text-blue-800"
//                         >
//                           {platform}
//                         </Link>
//                       </motion.li>
//                     ))}
//                   </motion.ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <Link to="/learn-more" className={`text-lg font-semibold ${hoverColor}`}>Learn More</Link>

//           <div className="relative flex items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder=" "
//               className="rounded-full px-6 py-2 w-72 text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSearch}
//               className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//             >
//               <Search className="w-5 h-5" />
//             </button>
//           </div>

//           <div className={`flex items-center space-x-4 border-l pl-6 ${borderColor}`}>
//             {isAuthenticated ? (
//               <>
//                 {user?.isAdmin ? (
//                   <button onClick={() => navigate('/admin-dashboard')} className={`${textColor} ${hoverColor}`}>
//                     <Crown className="w-6 h-6" />
//                   </button>
//                 ) : (
//                   <button onClick={() => navigate('/profile')} className={`${textColor} ${hoverColor}`}>
//                     <User className="w-6 h-6" />
//                   </button>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className={`flex items-center gap-2 font-medium px-4 py-2 ${textColor} hover:text-red-400`}
//                 >
//                   <LogOut className="w-4 h-4" /> Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </nav>

//         <motion.button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`md:hidden ${textColor} p-2 rounded-lg transition-all`}
//           whileTap={{ scale: 0.9 }}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </motion.button>
//       </div>

//       {/* ✅ Fullscreen White Mobile Drawer */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ duration: 0.4 }}
//             className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6 flex flex-col space-y-6 text-black"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-2xl font-bold">Menu</span>
//               <button onClick={() => setIsOpen(false)} className="text-black">
//                 <X size={28} />
//               </button>
//             </div>

//             <Link to="/" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>Home</Link>

//             <button onClick={toggleServices} className="text-xl font-semibold flex items-center gap-2">
//               Services <ChevronDown className={`w-5 h-5 ${servicesOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {servicesOpen && (
//               <div className="ml-4 space-y-2">
//                 {servicePlatforms.map((platform) => (
//                   <Link
//                     key={platform}
//                     to={`/services/${platform}`}
//                     className="block capitalize text-base hover:text-blue-600"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {platform}
//                   </Link>
//                 ))}
//               </div>
//             )}

//             <Link to="/learn-more" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>
//               Learn More
//             </Link>

//             <div className="flex flex-col gap-4 mt-auto">
//               {isAuthenticated ? (
//                 <>
//                   {user?.isAdmin ? (
//                     <button onClick={() => { navigate('/admin-dashboard'); setIsOpen(false); }}>
//                       <Crown className="w-6 h-6" />
//                     </button>
//                   ) : (
//                     <button onClick={() => { navigate('/profile'); setIsOpen(false); }}>
//                       <User className="w-6 h-6" />
//                     </button>
//                   )}
//                   <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-2">
//                     <LogOut className="w-4 h-4" /> Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg bg-blue-600 px-4 py-2 rounded-full text-white text-center">
//                   Sign In
//                 </Link>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Zap, User, LogOut, Crown, ChevronDown, Search,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'initial'>('initial');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const lastScrollY = useRef(0);

  const servicePlatforms = [
    'youtube', 'instagram', 'x', 'threads', 'telegram', 'linkedin', 'tiktok', 'facebook'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY === 0) {
        setScrollDirection('initial');
      } else if (currentY < lastScrollY.current) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleServices = () => setServicesOpen(!servicesOpen);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (servicePlatforms.includes(query)) {
      navigate(`/services/${query}`);
    } else if (["about", "contact"].includes(query)) {
      navigate(`/${query}`);
    } else if (query === "profile" && isAuthenticated) {
      navigate("/profile");
    } else if (query === "admin" && isAuthenticated && user?.isAdmin) {
      navigate("/admin-dashboard");
    } else {
      alert("Page not found or permission denied.");
    }
    setSearchQuery("");
    setServicesOpen(false);
  };

  const isScrolled = scrollDirection === 'up' || scrollDirection === 'down';

  const navbarBg = isScrolled
    ? 'bg-white shadow-md backdrop-blur-md'
    : 'bg-gradient-to-r from-[#0a1433] via-[#0c1d47] to-[#0f254f] backdrop-blur-md';

  const textColor = isScrolled ? 'text-black' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-blue-600' : 'hover:text-yellow-300';
  const borderColor = isScrolled ? 'border-black/10' : 'border-white/20';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 py-3 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`flex items-center group transition-transform hover:scale-105 ${textColor}`}>
          <Globe className={`h-9 w-9 ${isScrolled ? 'text-black' : 'text-white'} drop-shadow-xl animate-pulse`} />
          <span className={`ml-3 text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
            EngageSphere
          </span>
        </Link>

        <nav className={`hidden md:flex items-center space-x-6 ${textColor}`}>
          <Link to="/" className={`text-lg font-semibold ${hoverColor}`}>Home</Link>

          <div className="relative">
            <button
              onClick={toggleServices}
              className={`font-semibold text-lg flex items-center gap-2 ${hoverColor}`}
            >
              Services
              <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 mt-4 w-64 bg-white rounded-xl border border-gray-200 p-4 z-50 shadow-xl"
                >
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    className="flex flex-col space-y-2"
                  >
                    {servicePlatforms.map((platform) => (
                      <motion.li
                        key={platform}
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                      >
                        <Link
                          to={`/services/${platform}`}
                          onClick={() => setServicesOpen(false)}
                          className="block text-black text-lg font-medium capitalize px-4 py-2 rounded hover:bg-black/10 hover:text-blue-800"
                        >
                          {platform}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/learn-more" className={`text-lg font-semibold ${hoverColor}`}>Learn More</Link>

          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=" "
              className="rounded-full px-6 py-2 w-72 text-base text-black border border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className={`flex items-center space-x-4 border-l pl-6 ${borderColor}`}>
            {isAuthenticated ? (
              <>
                {user?.isAdmin ? (
                  <button onClick={() => navigate('/admin-dashboard')} className={`${textColor} ${hoverColor}`}>
                    <Crown className="w-6 h-6" />
                  </button>
                ) : (
                  <button onClick={() => navigate('/profile')} className={`${textColor} ${hoverColor}`}>
                    <User className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 font-medium px-4 py-2 ${textColor} hover:text-red-400`}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden ${textColor} p-2 rounded-lg transition-all`}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6 flex flex-col space-y-6 text-black"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)} className="text-black">
                <X size={28} />
              </button>
            </div>

            <Link to="/" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>Home</Link>

            <button onClick={toggleServices} className="text-xl font-semibold flex items-center gap-2">
              Services <ChevronDown className={`w-5 h-5 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesOpen && (
              <div className="ml-4 space-y-2">
                {servicePlatforms.map((platform) => (
                  <Link
                    key={platform}
                    to={`/services/${platform}`}
                    className="block capitalize text-base hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {platform}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/learn-more" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>
              Learn More
            </Link>

            <div className="flex flex-col gap-4 mt-auto">
              {isAuthenticated ? (
                <>
                  {user?.isAdmin ? (
                    <button onClick={() => { navigate('/admin-dashboard'); setIsOpen(false); }}>
                      <Crown className="w-6 h-6" />
                    </button>
                  ) : (
                    <button onClick={() => { navigate('/profile'); setIsOpen(false); }}>
                      <User className="w-6 h-6" />
                    </button>
                  )}
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg bg-blue-600 px-4 py-2 rounded-full text-white text-center">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
