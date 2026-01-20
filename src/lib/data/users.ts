import { User } from "@/lib/types";

export const users: User[] = [
  {
    id: "EMP001",
    email: "john.doe@company.com",
    firstName: "John",
    lastName: "Doe",
    role: "employee",
  },
  {
    id: "EMP002",
    email: "jane.smith@company.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "admin",
  },
  {
    id: "EMP003",
    email: "alice.johnson@company.com",
    firstName: "Alice",
    lastName: "Johnson",
    role: "admin",
  },
];

// Demo credentials for MVP
export const demoUsers = [
  {
    email: "employee@company.com",
    password: "password123", // Demo only - not used in production
    role: "employee",
    name: "Demo Employee",
  },
  {
    email: "admin@company.com",
    password: "admin123", // Demo only - not used in production
    role: "admin",
    name: "Demo Admin",
  },
];

export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function validateDemoCredentials(
  email: string,
  password: string
): { valid: boolean; user?: (typeof demoUsers)[0] } {
  const demoUser = demoUsers.find((u) => u.email === email && u.password === password);
  return {
    valid: !!demoUser,
    user: demoUser,
  };
}
