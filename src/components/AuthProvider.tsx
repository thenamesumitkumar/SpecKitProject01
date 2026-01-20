"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { User, AuthContext as AuthContextType } from "@/lib/types";
import { getCurrentUser, createSession, logout as logoutUser, validateCredentials } from "@/lib/utils/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from session on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const validation = validateCredentials(email, password);
      if (!validation.valid || !validation.user) {
        throw new Error("Invalid email or password");
      }

      const session = createSession(validation.user);
      setUser(session.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
