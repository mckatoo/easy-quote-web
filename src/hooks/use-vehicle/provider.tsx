import { useState } from "react"
import type { VehicleWithClient } from "../../services/vehicles"
import { VehicleContext } from "./context"

type VehicleProviderProps = {
  children: React.ReactElement
}

export const VehicleProvider = ({ children }: VehicleProviderProps) => {
  const [vehicle, setVehicle] = useState<VehicleWithClient>()

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle }}>
      {children}
    </VehicleContext.Provider>
  )
}
