import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabase: SupabaseClient = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function sessionToUser(session: Session | null): { user: User | null; token: string | null } {
  if (!session) return { user: null, token: null };
  const meta = session.user.user_metadata ?? {};
  return {
    user: {
      id: session.user.id,
      email: session.user.email ?? '',
      name: meta.name ?? meta.full_name ?? '',
      phone: meta.phone ?? '',
    },
    token: session.access_token,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const { user: u, token } = sessionToUser(session);
      setUser(u);
      setAccessToken(token);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const { user: u, token } = sessionToUser(session);
      setUser(u);
      setAccessToken(token);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<{ needsConfirmation: boolean }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
      },
    });

    if (error) throw new Error(error.message);

    // Session is returned immediately when email confirmation is disabled
    if (data.session) {
      const { user: u, token } = sessionToUser(data.session);
      setUser(u);
      setAccessToken(token);
      return { needsConfirmation: false };
    }

    // No session means Supabase sent a confirmation email
    return { needsConfirmation: true };
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Provide a friendlier message for the most common case
      if (error.message.toLowerCase().includes('email not confirmed')) {
        throw new Error('Please confirm your email before logging in. Check your inbox.');
      }
      throw new Error(error.message);
    }
    const { user: u, token } = sessionToUser(data.session);
    setUser(u);
    setAccessToken(token);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
