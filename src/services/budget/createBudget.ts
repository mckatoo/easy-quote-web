import type { Budget } from ".";
import api from "../service/api";

export const createBudgetService = async (budget: Omit<Budget, 'id' | 'received_in'>) => {
  try {
    const { client_id, vehicle_id, services, ...data } = budget
    const response = await api({
      endpoint: 'budget',
      method: 'POST',
      body: JSON.stringify({
        client_id: +client_id,
        vehicle_id: +vehicle_id,
        services: services.map(service => ({
          ...service,
          value: service.value * 100
        })),
        ...data
      })
    })
    const createdBudget = await response.json()
    if (!("id" in createdBudget)) throw new Error("Budget ID not received");
    return {
      status: response.status,
      body: { id: `${createdBudget.id}` }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
