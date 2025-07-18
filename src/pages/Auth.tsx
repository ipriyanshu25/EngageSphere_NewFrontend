// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   MapPin,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
// } from 'lucide-react';

// // import logo from '../assets/ghostlamp-logo.png';            // ← Your logo

// type AuthFnResult = unknown;

// function toSuccess(result: AuthFnResult): boolean {
//   if (typeof result === 'object' && result !== null && 'success' in (result as any)) {
//     return Boolean((result as any).success);
//   }
//   return Boolean(result);
// }

// const Auth: React.FC = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const { login, register, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/', { replace: true });
//     }
//   }, [isAuthenticated, navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const togglePasswordVisibility = () => setShowPassword(v => !v);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(v => !v);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       let result: AuthFnResult;
//       if (isSignIn) {
//         result = await login(formData.email, formData.password);
//       } else {
//         if (formData.password !== formData.confirmPassword) {
//           setMessage({ type: 'error', text: 'Passwords do not match.' });
//           setLoading(false);
//           return;
//         }
//         if (formData.password.length < 6) {
//           setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
//           setLoading(false);
//           return;
//         }
//         result = await register({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           password: formData.password,
//         });
//       }

//       const success = toSuccess(result);
//       if (success) {
//         setMessage({
//           type: 'success',
//           text: isSignIn
//             ? 'Login successful! Redirecting…'
//             : 'Registration successful! Redirecting…',
//         });
//         navigate('/', { replace: true });
//       } else {
//         setMessage({
//           type: 'error',
//           text: isSignIn
//             ? 'Invalid email or password.'
//             : 'Registration failed. Email may already exist.',
//         });
//       }
//     } catch {
//       setMessage({ type: 'error', text: 'Something went wrong. Try again.' });
//     }

//     setLoading(false);
//   };

//   const toggleMode = () => {
//     setIsSignIn(v => !v);
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       password: '',
//       confirmPassword: '',
//     });
//     setMessage(null);
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#E6FDFC] px-4">
//       <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden flex">
//         {/* Left: Illustration */}
//         <div className="hidden md:block w-1/2">
//           <img
//             src={isSignIn ? '/side_image.png' : '/register.png'}
//             alt={isSignIn ? 'Login Illustration' : 'Register Illustration'}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Right: Form */}
//         <div className="w-full md:w-1/2 p-8">
//           {/* Logo */}
//           {/* <img src={logo} alt="Logo" className="h-8 mb-6" /> */}

//           {/* Heading */}
//           <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
//             {isSignIn ? 'Login' : 'Register'}
//           </h1>
//           <p className="text-sm text-gray-500 mb-6 text-center">
//             {' '}
//             {isSignIn ? '' : ''}
//           </p>

//           {/* Message */}
//           {message && (
//             <div
//               className={`mb-4 px-4 py-3 rounded-lg flex items-center border ${message.type === 'success'
//                 ? 'bg-green-50 border-green-200 text-green-700'
//                 : 'bg-red-50 border-red-200 text-red-700'
//                 }`}
//             >
//               {message.type === 'success' ? (
//                 <CheckCircle className="mr-2" />
//               ) : (
//                 <AlertCircle className="mr-2" />
//               )}
//               {message.text}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {!isSignIn && (
//               <>
//                 <Input
//                   label="Full Name"
//                   name="name"
//                   icon={<User />}
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <Input
//                   label="Phone"
//                   name="phone"
//                   icon={<Phone />}
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <Input
//                   label="Address"
//                   name="address"
//                   icon={<MapPin />}
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </>
//             )}

//             <Input
//               label="Email Address"
//               name="email"
//               icon={<Mail />}
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />

//             <Input
//               label="Password"
//               name="password"
//               icon={<Lock />}
//               type={showPassword ? 'text' : 'password'}
//               value={formData.password}
//               onChange={handleInputChange}
//               toggleIcon={showPassword ? <EyeOff /> : <Eye />}
//               onToggle={togglePasswordVisibility}
//               required
//             />

//             {!isSignIn && (
//               <Input
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 icon={<Lock />}
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 toggleIcon={showConfirmPassword ? <EyeOff /> : <Eye />}
//                 onToggle={toggleConfirmPasswordVisibility}
//                 required
//               />
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-lg font-semibold text-white
//                          bg-gradient-to-r from-[#3E82F7] to-[#6BA7FF]
//                          hover:from-[#366FCC] hover:to-[#549CEB]
//                          transition"
//             >
//               {loading
//                 ? isSignIn
//                   ? 'Logging in…'
//                   : 'Signing up…'
//                 : isSignIn
//                   ? 'Login Now'
//                   : 'Take the Oath of Entry'}
//             </button>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-4 flex justify-between text-sm text-gray-500">
//             {isSignIn ? (
//               <button className="hover:underline">Forget Password?</button>
//             ) : (
//               <button onClick={toggleMode} className="hover:underline">
//                 Already have an account?
//               </button>
//             )}
//             <button onClick={toggleMode} className="hover:underline">
//               {isSignIn ? 'Register Now' : 'Login'}
//             </button>
//           </div>

//           {/* Social Login */}
//           {/* <p className="text-center text-gray-400 mt-6">Or you can join with</p>
//           <div className="flex justify-center space-x-4 mt-3">
//             <button className="p-2 bg-white rounded-full shadow">
//               {}
//             </button>
//             <button className="p-2 bg-white rounded-full shadow">
//               {}
//             </button>
//             <button className="p-2 bg-white rounded-full shadow">
//               {}
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   icon: React.ReactNode;
//   toggleIcon?: React.ReactNode;
//   onToggle?: () => void;
// }

// const Input: React.FC<InputProps> = ({ label, icon, toggleIcon, onToggle, ...props }) => (
//   <div>
//     <label className="block mb-1 text-sm text-gray-700">{label}</label>
//     <div className="relative">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//         {icon}
//       </div>
//       <input
//         {...props}
//         className="w-full pl-10 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-lg
//                    text-gray-700 placeholder-gray-400
//                    focus:outline-none focus:ring-2 focus:ring-[#3E82F7] focus:border-transparent"
//       />
//       {toggleIcon && onToggle && (
//         <button
//           type="button"
//           onClick={onToggle}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//         >
//           {toggleIcon}
//         </button>
//       )}
//     </div>
//   </div>
// );

// export default Auth;




import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
// import logoSrc from '../assets/logo.png';
// Decorative SVG background
const DecorativeBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* top-left blob */}
    <div
      className="absolute bg-[#E6FDFC] rounded-full"
      style={{
        width: 600,
        height: 600,
        top: -200,
        left: -200,
      }}
    />
    {/* bottom-right blob */}
    <div
      className="absolute bg-[#E6FDFC] rounded-full"
      style={{
        width: 500,
        height: 500,
        bottom: -150,
        right: -150,
      }}
    />
  </div>
);

function toSuccess(result: unknown): boolean {
  if (typeof result === 'object' && result !== null && 'success' in (result as any)) {
    return Boolean((result as any).success);
  }
  return Boolean(result);
}

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => setShowPassword((v) => !v);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((v) => !v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let result: unknown;
      if (isSignIn) {
        result = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match.' });
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
          setLoading(false);
          return;
        }
        result = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        });
      }

      const success = toSuccess(result);
      if (success) {
        setMessage({
          type: 'success',
          text: isSignIn ? 'Login successful! Redirecting…' : 'Registration successful! Redirecting…',
        });
        navigate('/', { replace: true });
      } else {
        setMessage({
          type: 'error',
          text: isSignIn
            ? 'Invalid email or password.'
            : 'Registration failed. Email may already exist.',
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong. Try again.' });
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignIn((v) => !v);
    setFormData({ name: '', email: '', phone: '', address: '', password: '', confirmPassword: '' });
    setMessage(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4">
      {/* Decorative Background */}

      <Link
        to="/"
        className="absolute top-4 left-4 z-20 flex items-center space-x-2"
      >
        {/* <img
          src={logoSrc}
          alt="EngageSphere Logo"
          className="h-8 w-8 object-contain"
        /> */}
        <span className="text-blue-600 text-2xl font-bold">EngageSphere</span>
      </Link>
      <DecorativeBackground />

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex z-10">
        {/* Left: Illustration with Gradient Overlay */}
        <div className="hidden md:block w-1/2">
          <img
            src={isSignIn ? '/side_image.png' : '/register.png'}
            alt={isSignIn ? 'Login Illustration' : 'Register Illustration'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-10 relative">
          {/* Logo */}
          {/* <img src={logo} alt="Logo" className="h-10 mb-8 mx-auto" /> */}

          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
            {isSignIn ? 'Welcome Back' : 'Create Your Account'}
          </h1>

          {message && (
            <div
              className={`mb-6 px-5 py-4 rounded-xl flex items-center border shadow-sm animate-fade-in ${message.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
                }`}
            >
              {message.type === 'success' ? <CheckCircle className="mr-3" /> : <AlertCircle className="mr-3" />}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isSignIn && <Input label="Full Name" name="name" icon={<User />} value={formData.name} onChange={handleInputChange} required />}
            {!isSignIn && <Input label="Phone" name="phone" icon={<Phone />} value={formData.phone} onChange={handleInputChange} required />}
            {!isSignIn && <Input label="Address" name="address" icon={<MapPin />} value={formData.address} onChange={handleInputChange} required />}

            <Input label="Email Address" name="email" icon={<Mail />} type="email" value={formData.email} onChange={handleInputChange} required />

            <Input
              label="Password"
              name="password"
              icon={<Lock />}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              toggleIcon={showPassword ? <EyeOff /> : <Eye />}
              onToggle={togglePasswordVisibility}
              required
            />

            {!isSignIn && (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                icon={<Lock />}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                toggleIcon={showConfirmPassword ? <EyeOff /> : <Eye />}
                onToggle={toggleConfirmPasswordVisibility}
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#3E82F7] to-[#6BA7FF] hover:from-[#366FCC] hover:to-[#549CEB] transition-transform transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? (isSignIn ? 'Logging in…' : 'Signing up…') : isSignIn ? 'Login Now' : 'Take the Oath of Entry'}
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm text-gray-600">
            {isSignIn ? (
              <button className="hover:underline">Forgot Password?</button>
            ) : (
              <button onClick={toggleMode} className="hover:underline ">
                Already have an account? Login
              </button>
            )}
            <button onClick={toggleMode} className="font-medium text-blue-600 hover:underline">
              {isSignIn ? 'Register Now':""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  toggleIcon?: React.ReactNode;
  onToggle?: () => void;
}

const Input: React.FC<InputProps> = ({ label, icon, toggleIcon, onToggle, ...props }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E82F7] focus:border-transparent"
      />
      {toggleIcon && onToggle && (
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {toggleIcon}
        </button>
      )}
    </div>
  </div>
);

export default Auth;
