export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  status: "New" | "Read";
  createdAt: Date;
  updatedAt: Date;
}