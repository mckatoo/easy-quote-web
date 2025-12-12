
import type { Vehicle } from "."
import api from "../service/api"


export const getVehiclesByClientIDService = async (client_id: string) => {
  try {
    const response = await api({
      endpoint: `vehicle/client_id/${client_id}`,
      method: 'GET',
    })
    const data: Required<Vehicle>[] = await response.json()

    return {
      status: response.status,
      body: data
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}

