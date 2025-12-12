import type { ServiceResponse } from "."
import api from "./api"

export const getServicesByClientIDService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `service/client_id/${id}`,
      method: 'GET',
    })
    const json: any[] = await response.json()
    const data: ServiceResponse[] = json.map(service => ({
      id: service.id.toString(),
      description: service.description,
      value: parseFloat((service.value / 100).toFixed(2)),
      vehicle_id: service.vehicleId.toString(),
      budget_id: service.budgetId.toString()
    }))
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
