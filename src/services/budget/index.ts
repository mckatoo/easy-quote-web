import type { Client } from "../client"
import type { ServiceResponse } from "../service"
import type { Vehicle } from "../vehicles"


export type Budget = {
  id: string
  date: Date,
  services: ServiceResponse[]
  client_id: string
  vehicle_id: string
  value: number
  received_in?: Date
}

export type BudgetResponse = {
  client: Client
  vehicle: Vehicle
  services: ServiceResponse[]
} & Budget

