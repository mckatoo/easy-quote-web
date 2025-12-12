import type { RequiredAddress } from "../address"
import type { Client } from "../client"
import type { Phone } from "../phone"

export type Vehicle = {
  id?: string
  plate?: string
  brand: string
  model: string
  year?: number
}

export type VehicleResponse = {
  id: number
  brand: string
  model: string
  plate?: string | null
  year?: number | null
  clientId: number
}

export type VehicleWithClient = {
  client: {
    addresses: RequiredAddress[] | []
    phones: Phone[] | []
  } & Required<Client>
} & Vehicle
