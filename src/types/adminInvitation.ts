export interface CreateAdminInvitationInput {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AcceptAdminInvitationInput {
  token: string;
  password: string;
}