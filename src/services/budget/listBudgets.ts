import type { BudgetResponse } from "."
import type { Client } from "../client"
import type { ServiceResponse } from "../service"
import api from "../service/api"
import type { Vehicle } from "../vehicles"

type Budget = {
  id: number
  clientId: number
  client: Client
  date: Date
  services: ServiceResponse[]
  vehicleId: number
  vehicle: Vehicle
  value: number
  receivedIn: Date | null
}
type ListBudgetsArgs = {
  cursor?: number
  take?: number
}

export const listBudgetsService = async (args?: ListBudgetsArgs) => {
  const response = await api({
    endpoint: 'budget',
    method: 'GET',
    queryParams: args
  })
  const data: Budget[] = await response.json()
  const body: BudgetResponse[] = data.map(budget => ({
    id: budget.id.toString(),
    client_id: budget.clientId.toString(),
    client: budget.client,
    date: new Date(budget.date),
    services: budget.services.map(service => ({
      ...service,
      value: parseFloat((service.value / 100).toFixed(2))
    })),
    vehicle_id: budget.vehicleId.toString(),
    vehicle: budget.vehicle,
    value: parseFloat((budget.value / 100).toFixed(2)),
    received_in: !!budget.receivedIn ? new Date(budget.receivedIn) : undefined
  }))

  return {
    status: response.status,
    body
  }
}
