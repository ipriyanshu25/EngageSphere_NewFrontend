import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from '../api/axios';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface User {
  id       : string;
  name     : string;
  email    : string;
  phone    : string;
  address  : string;
  createdAt: string;
}

interface RegisterData {
  name    : string;
  email   : string;
  phone   : string;
  address : string;
  password: string;
}

interface AuthContextType {
  user           : User | null;
  token          : string | null;
  isAuthenticated: boolean;
  loading        : boolean;
  /* actions */
  login    : (email: string, password: string) => Promise<boolean>;
  register : (data: RegisterData) => Promise<boolean>;
  logout   : () => void;
  setUser  : React.Dispatch<React.SetStateAction<User | null>>; // new
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

const buildFallbackUser = (userId: string, email: string): User => ({
  id       : userId,
  name     : email.split('@')[0] ?? 'User',
  email,
  phone    : '',
  address  : '',
  createdAt: new Date().toISOString(),
});

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user,  setUser ] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* 1. Hydrate token & lightweight user on mount */
  useEffect(() => {
    const storedToken  = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedEmail  = localStorage.getItem('email');

    if (storedToken) {
      setToken(storedToken);
      if (storedUserId && storedEmail) {
        setUser(buildFallbackUser(storedUserId, storedEmail));
      }
    }
    setLoading(false);
  }, []);

  /* 2. REGISTER (auto‑login) */
  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      await axios.post('/user/register', data);
      return await login(data.email, data.password);
    } catch {
      return false;
    }
  };

  /* 3. LOGIN */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const resp = await axios.post<{
        token : string;
        userId: string;
        user ?: Partial<User>;
      }>('/user/login', { email, password });

      const { token: t, userId, user: serverUser } = resp.data;

      localStorage.setItem('token',  t);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email',  email);

      setToken(t);

      if (serverUser && serverUser.name) {
        setUser({
          id       : userId,
          name     : serverUser.name,
          email    : serverUser.email   ?? email,
          phone    : serverUser.phone   ?? '',
          address  : serverUser.address ?? '',
          createdAt: serverUser.createdAt ?? new Date().toISOString(),
        });
      } else {
        setUser(buildFallbackUser(userId, email));
      }
      return true;
    } catch {
      return false;
    }
  };

  /* 4. LOGOUT */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    setUser(null);
    setToken(null);
  };

  /* 5. Context Value */
  const ctxValue: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    login,
    register,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {children}
    </AuthContext.Provider>
  );
};
