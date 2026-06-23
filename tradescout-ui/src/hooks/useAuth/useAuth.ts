import { useContext } from "react";
import {
  AuthContext,
  type AuthContextType,
} from "../../context/Auth/auth.context";

export const useAuth = (): AuthContextType => useContext(AuthContext);
