// // src/pages/UpdateProfile.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from '../api/axios';
// import Swal from 'sweetalert2';
// import {
//   User as UserIcon,
//   Phone,
//   MapPin,
//   Lock
// } from 'lucide-react';

// interface FormData {
//   name: string;
//   phone: string;
//   address: string;
//   oldPassword: string;
//   newPassword: string;
// }

// const UpdateProfile: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState<FormData>({
//     name: '',
//     phone: '',
//     address: '',
//     oldPassword: '',
//     newPassword: ''
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setForm(f => ({
//         ...f,
//         name: user.name,
//         phone: user.phone,
//         address: user.address
//       }));
//     }
//   }, [user]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.newPassword && !form.oldPassword) {
//       return Swal.fire({
//         icon: 'error',
//         title: 'Missing Current Password',
//         text: 'Please enter your current password to set a new one.'
//       });
//     }

//     setLoading(true);
//     try {
//       const payload: any = {
//         name: form.name,
//         phone: form.phone,
//         address: form.address
//       };
//       if (form.newPassword) {
//         payload.oldPassword = form.oldPassword;
//         payload.newPassword = form.newPassword;
//       }

//       const res = await axios.post('/user/update', payload);

//       await Swal.fire({
//         icon: 'success',
//         title: 'Profile Updated',
//         text: res.data.message || 'Your profile has been updated.'
//       });

//       setForm(f => ({ ...f, oldPassword: '', newPassword: '' }));
//       navigate('/profile');
//     } catch (err: any) {
//       console.error(err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text:
//           err.response?.data?.message ||
//           'Something went wrong. Please try again.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 text-center">
//           <div className="inline-block bg-white rounded-full p-3 mb-4 shadow">
//             <UserIcon className="h-10 w-10 text-indigo-600" />
//           </div>
//           <h1 className="text-2xl font-semibold text-white">
//             Edit Profile
//           </h1>
//           <p className="text-indigo-200 mt-1">
//             Update your account details
//           </p>
//         </div>

//         {/* Form */}
//         <form
//           className="space-y-6 px-8 pb-8 pt-4"
//           onSubmit={handleSubmit}
//         >
//           {/* Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Phone
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="phone"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label
//               htmlFor="address"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Address
//             </label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="address"
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           </div>

//           {/* Current Password */}
//           <div>
//             <label
//               htmlFor="oldPassword"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Current Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="oldPassword"
//                 type="password"
//                 name="oldPassword"
//                 value={form.oldPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           </div>

//           {/* New Password */}
//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="newPassword"
//                 type="password"
//                 name="newPassword"
//                 value={form.newPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//             <p className="text-sm text-gray-500 mt-1">
//               Leave blank to keep your current password.
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate('/profile')}
//               className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex-1 py-2 rounded-lg text-white transition ${
//                 loading
//                   ? 'bg-indigo-300 cursor-not-allowed'
//                   : 'bg-indigo-600 hover:bg-indigo-700'
//               }`}
//             >
//               {loading ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;



// src/pages/UpdateProfile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
  User as UserIcon,
  Phone,
  MapPin,
  Lock,
  Home,
  User
} from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  address: string;
  oldPassword: string;
  newPassword: string;
}

const UpdateProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    oldPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: user.name,
        phone: user.phone,
        address: user.address
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword && !form.oldPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Missing Current Password',
        text: 'Please enter your current password to set a new one.'
      });
    }

    setLoading(true);
    try {
      const payload: any = {
        name: form.name,
        phone: form.phone,
        address: form.address
      };
      if (form.newPassword) {
        payload.oldPassword = form.oldPassword;
        payload.newPassword = form.newPassword;
      }

      const res = await axios.post('/user/update', payload);

      await Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: res.data.message || 'Your profile has been updated.'
      });

      setForm(f => ({ ...f, oldPassword: '', newPassword: '' }));
      navigate('/profile');
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text:
          err.response?.data?.message ||
          'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 text-center">
          <div className="inline-block bg-white rounded-full p-3 mb-4 shadow">
            <UserIcon className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Edit Profile</h1>
          <p className="text-indigo-200 mt-1">Update your account details</p>
        </div>

        <form className="space-y-6 px-8 pb-8 pt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" />
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="oldPassword"
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to keep your current password.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-2 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <Home className="w-4 h-4 mr-2" /> Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 py-2 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <User className="w-4 h-4 mr-2" /> Profile
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 rounded-lg text-white transition ${
                loading
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
