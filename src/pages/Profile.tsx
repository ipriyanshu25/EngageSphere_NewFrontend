// src/pages/Profile.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, LogOut, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-600 border-gray-300"></div>
      </div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
          <button
            onClick={() => {
              logout();
              navigate('/', { replace: true });
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Avatar & Name */}
        <div className="relative -mt-12 flex justify-center">
          <div className="bg-white rounded-full p-1 shadow-md">
            <div className="bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full p-4">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="text-center mt-2 mb-6 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Details */}
        <div className="px-6 space-y-4 pb-6">
          <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
            <Mail className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-gray-700 font-medium">Email</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
            <Phone className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-gray-700 font-medium">Phone</p>
              <p className="text-gray-600 text-sm">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-gray-700 font-medium">Address</p>
              <p className="text-gray-600 text-sm">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-gray-700 font-medium">Joined</p>
              <p className="text-gray-600 text-sm">{joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-3">
          <button
            onClick={() => navigate('/update')}
            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Edit2 className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;




// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   User,
//   Edit2,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Home
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// const Profile: React.FC = () => {
//   const { user, isAuthenticated, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       navigate('/login', { replace: true });
//     }
//   }, [loading, isAuthenticated, navigate]);

//   if (loading || !user) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-600 border-gray-300"></div>
//       </div>
//     );
//   }

//   const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

//         {/* Banner */}
//         <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-600 relative" />

//         {/* Avatar */}
//         <div className="relative -mt-12 flex justify-center">
//           <div className="bg-white rounded-full p-2 shadow-md">
//             <div className="bg-gradient-to-tr from-blue-500 to-indigo-700 rounded-full p-4">
//               <User className="w-12 h-12 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* User Name & Email */}
//         <div className="text-center mt-3 mb-6 px-6">
//           <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
//           <p className="text-gray-500">{user.email}</p>
//         </div>

//         {/* Info Cards */}
//         <div className="px-6 space-y-4 pb-6">
//           {[
//             {
//               label: 'Email',
//               value: user.email,
//               icon: <Mail className="w-5 h-5 text-indigo-500" />
//             },
//             {
//               label: 'Phone',
//               value: user.phone,
//               icon: <Phone className="w-5 h-5 text-green-500" />
//             },
//             {
//               label: 'Address',
//               value: user.address,
//               icon: <MapPin className="w-5 h-5 text-red-500" />
//             },
//             {
//               label: 'Joined',
//               value: joinedDate,
//               icon: <Calendar className="w-5 h-5 text-purple-500" />
//             }
//           ].map((item, index) => (
//             <div key={index} className="flex items-center space-x-4 bg-gray-100 rounded-xl p-4">
//               {item.icon}
//               <div>
//                 <p className="text-gray-700 font-medium">{item.label}</p>
//                 <p className="text-gray-600 text-sm">{item.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="px-6 pb-6 flex space-x-4">
//           <button
//             onClick={() => navigate('/update')}
//             className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center justify-center space-x-2"
//           >
//             <Edit2 className="w-5 h-5" />
//             <span>Edit Profile</span>
//           </button>
//           <button
//             onClick={() => navigate('/')}
//             className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition flex items-center justify-center space-x-2"
//           >
//             <Home className="w-5 h-5" />
//             <span>Go to Home</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
