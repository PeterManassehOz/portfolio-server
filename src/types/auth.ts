import type { AdminRole } from "./admin.js";

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  role: AdminRole;
}

export interface LoginResponse {
  token: string;
  admin: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: AdminRole;
  };
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}