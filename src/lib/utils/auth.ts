import { User } from "@/lib/types";
import { validateDemoCredentials } from "@/lib/data/users";

const SESSION_KEY = "hr_payroll_session";

export interface Session {
  user: User;
  loginTime: string;
  expiryTime: string;
}

/**
 * Validate credentials (MVP implementation with demo users)
 */
export function validateCredentials(
  email: string,
  password: string
): { valid: boolean; user?: User } {
  const validation = validateDemoCredentials(email, password);

  if (validation.valid && validation.user) {
    // Create a user object from demo user
    const user: User = {
      id: email.split("@")[0].toUpperCase(),
      email,
      firstName: validation.user.name.split(" ")[0],
      lastName: validation.user.name.split(" ")[1] || "",
      role: validation.user.role as "employee" | "admin" | "hr",
    };
    return { valid: true, user };
  }

  return { valid: false };
}

/**
 * Create and store session
 */
export function createSession(user: User): Session {
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

  const session: Session = {
    user,
    loginTime: now.toISOString(),
    expiryTime: expiryTime.toISOString(),
  };

  // Store in localStorage (MVP - not secure, Phase 2 will use secure cookies)
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

/**
 * Get current user from session
 */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionStr);

    // Check if session expired
    if (new Date(session.expiryTime) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

/**
 * Get current session
 */
export function getSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }

  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionStr);

    // Check if session expired
    if (new Date(session.expiryTime) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === "admin" || user?.role === "hr";
}

/**
 * Logout user
 */
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Refresh session expiry time
 */
export function refreshSession(): void {
  const session = getSession();
  if (session) {
    const newSession = createSession(session.user);
    // Session is already stored
  }
}
