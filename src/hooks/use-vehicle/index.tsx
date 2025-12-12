import { useContext } from "react"
import { VehicleContext } from "./context";


export function useVehicle() {
  const context = useContext(VehicleContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
