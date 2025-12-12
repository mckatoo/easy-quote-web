import { useContext } from "react";
import { LogoVersionContext } from "./context";

export function useLogoVersion() {
  const context = useContext(LogoVersionContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
