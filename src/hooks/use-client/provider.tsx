import { useState } from "react"
import type { ClientResponse } from "../../services/client"
import { ClientContext } from "./context"

type ClientProviderProps = {
  children: React.ReactElement
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [client, setClient] = useState<ClientResponse>()

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  )
}
