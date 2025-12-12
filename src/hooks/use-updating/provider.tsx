import { useState } from "react"
import { UpdatingContext } from "./context"

type UpdatingProviderProps = {
  children: React.ReactElement
}

export const UpdatingProvider = ({ children }: UpdatingProviderProps) => {
  const [updating, setUpdating] = useState(false);

  return (
    <UpdatingContext.Provider value={{updating, setUpdating}}>
      {children}
    </UpdatingContext.Provider>
  )
}
