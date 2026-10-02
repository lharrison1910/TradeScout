import type { Business } from "./Business";

export interface User {
  id: number;
  email: string;
  password: string;
  authProvider: string;
  name: string;
  termsAccepted: boolean;
  businesses: Business[];
}
