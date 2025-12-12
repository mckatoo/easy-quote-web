import { createContext } from "react"
import type { ClientResponse } from "../../services/client"

type ClientContextProps = {
  client?: ClientResponse,
  setClient: (client?: ClientResponse) => void
} | null

export const ClientContext = createContext<ClientContextProps>(null)

