// src/contexts/AuthContext.tsx (profile fetch removed)
// ----------------------------------------------------
// This version eliminates all network calls to /user/profile (GET & POST)
// and derives authentication state from the presence of a stored token.
// If your /user/login endpoint returns user info, we hydrate from that; if not,
// we create a minimal placeholder user so downstream components that expect
// a non-null `user` don't explode. Adjust as needed.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { post } from '../api/axios'; // removed unused `get`

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// Helper: build a safe fallback user if the server doesn't return one.
const buildFallbackUser = (userId: string, email: string): User => ({
  id: userId,
  name: email.split('@')[0] ?? 'User',
  email,
  phone: '',
  address: '',
  createdAt: new Date().toISOString(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: read token from storage only (no /user/profile call)
  useEffect(() => {
    const t = localStorage.getItem('engagesphere_token');
    const email = localStorage.getItem('engagesphere_email'); // optional convenience
    const userId = localStorage.getItem('userId');

    if (t) {
      setToken(t);
      // If we previously stored lightweight user data, hydrate it; else null.
      if (userId && email) {
        setUser(buildFallbackUser(userId, email));
      }
    }
    setLoading(false);
  }, []);

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      await post('/user/register', data);
      // Immediately log the user in after successful registration.
      return await login(data.email, data.password);
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Expect at least token + userId. Server MAY return user payload; handle gracefully.
      const resp = await post<{
        token: string;
        userId: string;
        user?: Partial<User>;
      }>('/user/login', { email, password });

      const { token: t, userId, user: serverUser } = resp;
      localStorage.setItem('engagesphere_token', t);
      localStorage.setItem('userId', userId);
      localStorage.setItem('engagesphere_email', email);
      setToken(t);

      if (serverUser) {
        // Merge minimal required fields; fall back if missing.
        const hydrated: User = {
          id: serverUser.id ?? userId,
          name: serverUser.name ?? email.split('@')[0] ?? 'User',
          email: serverUser.email ?? email,
          phone: serverUser.phone ?? '',
          address: serverUser.address ?? '',
          createdAt: serverUser.createdAt ?? new Date().toISOString(),
        };
        setUser(hydrated);
      } else {
        setUser(buildFallbackUser(userId, email));
      }

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('engagesphere_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('engagesphere_email');
    setUser(null);
    setToken(null);
  };

  const ctxValue: AuthContextType = {
    user,
    isAuthenticated: Boolean(token),
    register,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};
