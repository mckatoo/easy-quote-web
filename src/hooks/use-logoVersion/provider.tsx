import { useState } from "react"
import { LogoVersionContext } from "./context"

type LogoVersionProviderProps = {
  children: React.ReactElement
}

export const LogoVersionProvider = ({ children }: LogoVersionProviderProps) => {
  const [logoVersion, setLogoVersion] = useState(Date.now())

  function refreshLogoVersion() {
    setLogoVersion(Date.now())
  }

  return (
    <LogoVersionContext.Provider value={{ logoVersion, refreshLogoVersion }}>
      {children}
    </LogoVersionContext.Provider>
  )
}
