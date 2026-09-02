export type AdminRole = "Admin";

export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AdminRole;
}

export interface PublicAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
}

export interface CreateAdminInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: AdminRole;
}