
import type { Budget } from "."
import type { ServiceResponse } from "../service"
import api from "../service/api"

export const getBudgetByVehicleIDService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `budget/vehicle_id/${id}`,
      method: 'GET',
    })
    const { vehicleId, clientId, receivedIn, date, id: budgetID, value, services } = await response.json()
    const data: Budget = {
      id: budgetID.toString(),
      vehicle_id: vehicleId,
      client_id: clientId,
      received_in: receivedIn,
      date: new Date(date),
      value: parseFloat((value / 100).toFixed(2)),
      services: services.map((service: ServiceResponse) => ({
        ...service,
        value: parseFloat((service.value / 100).toFixed(2)),
      }))
    }
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
