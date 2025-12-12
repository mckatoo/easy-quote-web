import type { RequiredAddress } from "../address"
import type { Phone } from "../phone"
import type { Vehicle } from "../vehicles"

export type Client = {
  id?: string
  name: string
  cpf_cnpj: string
}

export type ClientResponse = {
  addresses: RequiredAddress[],
  phones: Required<Phone>[],
  vehicles: Required<Vehicle>[]
} & Required<Client>
