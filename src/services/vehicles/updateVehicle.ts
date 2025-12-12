import type { Vehicle } from ".";
import api from "../service/api";


export const updateVehicleService = async (vehicle: Vehicle) => {
  try {
    const response = await api({
      endpoint: 'vehicle/id',
      method: 'PUT',
      body: JSON.stringify(vehicle)
    })
    const createdVehicle = await response.json()
    if (!("id" in createdVehicle)) throw new Error("Vehicle ID not received");
    return {
      status: response.status,
      body: { id: createdVehicle.id }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
