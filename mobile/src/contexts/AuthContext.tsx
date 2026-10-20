import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import type { Profile, UserRole } from '../types/database';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRetailer: boolean;
  isAdmin: boolean;
  isWarehouse: boolean;
  signInWithPassword: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithPhoneOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch full profile from public.profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('[Auth] Error fetching profile:', error.message);
        setProfile(null);
      } else {
        setProfile(data as Profile);
      }
    } catch (err) {
      console.warn('[Auth] Unexpected error fetching profile:', err);
      setProfile(null);
    }
  };

  useEffect(() => {
    // 1. Check active session on startup
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        }
      } catch (err) {
        console.warn('[Auth] Error getting initial session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // 2. Subscribe to auth changes (token refresh, sign out, sign in)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  const signInWithPassword = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      // Determine if identifier is an email or phone number
      const isEmail = identifier.includes('@');
      const credentials = isEmail
        ? { email: identifier, password }
        : { phone: identifier, password };

      const { error } = await supabase.auth.signInWithPassword(credentials as any);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed. Please check credentials.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPhoneOtp = async (phone: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'OTP request failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'OTP verification failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const role = profile?.role ?? null;
  const isAuthenticated = !!session && !!user;
  const isRetailer = role === 'retailer';
  const isAdmin = role === 'admin';
  const isWarehouse = role === 'warehouse';

  const contextValue = useMemo(
    () => ({
      session,
      user,
      profile,
      role,
      isLoading,
      isAuthenticated,
      isRetailer,
      isAdmin,
      isWarehouse,
      signInWithPassword,
      signInWithPhoneOtp,
      verifyPhoneOtp,
      signOut,
      refreshProfile,
    }),
    [session, user, profile, role, isLoading, isAuthenticated, isRetailer, isAdmin, isWarehouse]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
