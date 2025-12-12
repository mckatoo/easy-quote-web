import type { ServiceResponse } from ".";
import api from "./api";

export const createServiceService = async (service: Omit<ServiceResponse, 'id'>) => {
  try {
    const { vehicle_id, budget_id, ...data } = service
    const response = await api({
      endpoint: 'service',
      method: 'POST',
      body: JSON.stringify({
        description: data.description,
        value: data.value * 100,
        vehicle_id: parseInt(vehicle_id),
        budget_id: parseInt(budget_id)
      })
    })
    const serviceCreated = await response.json()
    if (!("id" in serviceCreated)) throw new Error("Service ID not received");
    return {
      status: response.status,
      body: { id: serviceCreated.id.toString() }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
