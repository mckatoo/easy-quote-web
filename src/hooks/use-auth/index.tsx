import { useContext } from "react";
import { AuthContext } from "./context";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Out of context");
  return context
}
