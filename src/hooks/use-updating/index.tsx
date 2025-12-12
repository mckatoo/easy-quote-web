import { useContext } from "react"
import { UpdatingContext } from "./context";

export function useUpdating() {
  const context = useContext(UpdatingContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
