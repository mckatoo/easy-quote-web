import { createContext } from "react"
import type { VehicleWithClient } from "../../services/vehicles"

type VehicleContextProps = {
  vehicle?: VehicleWithClient,
  setVehicle: (client?: VehicleWithClient) => void
} | null

export const VehicleContext = createContext<VehicleContextProps>(null)

