import { useContext } from "react";
import type { AuthContextType } from "../../context/Auth/Auth.provider";



export const useAuth = (): AuthContextType => useContext(AuthContext);
