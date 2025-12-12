import { useContext } from "react"
import { ClientContext } from "./context";


export function useClient() {
  const context = useContext(ClientContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
