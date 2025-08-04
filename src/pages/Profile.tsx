import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Edit2,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';
import { AxiosError } from 'axios';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface ProfileData {
  userId    : string;
  name      : string;
  email     : string;
  phone     : string;
  address   : string;
  createdAt : string;
  updatedAt?: string;
}

/* Response envelope: { data: { …profile } } */
interface GetByIdResponse {
  data: ProfileData;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const Profile: React.FC = () => {
  const {
    user,
    token,
    isAuthenticated,
    logout,
    loading: authLoading,
  } = useAuth();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const navigate = useNavigate();

  /* -------------------------------------------------------------- */
  /* 1. Redirect unauthenticated users once auth state resolved     */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  /* -------------------------------------------------------------- */
  /* 2. Fetch profile once authenticated                            */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (authLoading || !isAuthenticated || !token || !user?.id) return;

    (async () => {
      try {
        const { data } = await axios.post<GetByIdResponse>(
          '/user/getById',
          { userId: user.id },                               // body
          { headers: { Authorization: `Bearer ${token}` } } // config
        );

        setProfile(data.data); // <‑— unwrap `data`
      } catch (err) {
        const axiosErr = err as AxiosError<any>;

        if (axiosErr.response?.status === 401 || axiosErr.response?.status === 403) {
          logout();
          navigate('/login', { replace: true });
          return;
        }

        setError(axiosErr.response?.data?.message || axiosErr.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isAuthenticated, token, user, logout, navigate]);

  /* -------------------------------------------------------------- */
  /* 3.  LOADING / ERROR STATES                                     */
  /* -------------------------------------------------------------- */
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-600 border-gray-300" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
        <p className="text-red-600 mb-4">{error || 'Could not load profile.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /* 4.  MAIN PROFILE VIEW                                          */
  /* -------------------------------------------------------------- */
  const joinedDate  = new Date(profile.createdAt).toLocaleDateString('en-US', {
    year : 'numeric',
    month: 'long',
    day  : 'numeric',
  });

  const updatedDate = profile.updatedAt
    ? new Date(profile.updatedAt).toLocaleDateString('en-US', {
        year : 'numeric',
        month: 'short',
        day  : 'numeric',
      })
    : null;

  /* Static colour map to satisfy Tailwind’s JIT compiler  */
  const colourMap: Record<string, string> = {
    indigo: 'indigo',
    green : 'green',
    red   : 'red',
    purple: 'purple',
    gray  : 'gray',
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
          <button
            onClick={() => { logout(); navigate('/', { replace: true }); }}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Avatar & Name */}
        <div className="relative -mt-16 flex justify-center">
          <div className="bg-white rounded-full p-1 shadow-md">
            <div className="bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full p-5">
              <UserIcon className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 mb-8 px-6">
          <h1 className="text-3xl font-semibold text-gray-800">{profile.name}</h1>
          <p className="text-indigo-500 font-medium">{profile.email}</p>
          {updatedDate && (
            <p className="text-xs text-gray-400 mt-1">Last updated · {updatedDate}</p>
          )}
        </div>

        {/* Detail cards */}
        <div className="px-6 space-y-5 pb-6">
          {[
            { icon: Mail,     title: 'Email',   value: profile.email,                      color: 'indigo' },
            { icon: Phone,    title: 'Phone',   value: profile.phone   || 'Not provided', color: 'green'  },
            { icon: MapPin,   title: 'Address', value: profile.address || 'Not provided', color: 'red'    },
            { icon: Calendar, title: 'Joined',  value: joinedDate,                         color: 'purple' },
          ].map(({ icon: Icon, title, value, color }) => (
            <div
              key={title}
              className={`flex items-center space-x-4 bg-${colourMap[color]}-50 rounded-lg p-4`}
            >
              <Icon className={`w-6 h-6 text-${colourMap[color]}-500`} />
              <div>
                <p className={`text-${colourMap[color]}-600 font-medium`}>{title}</p>
                <p className="text-gray-600 text-sm break-all">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-3">
          <button
            onClick={() => navigate('/update')}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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
