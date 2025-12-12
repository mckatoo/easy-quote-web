import type { PaginationArgs } from ".."
import api from "../service/api"

type ClientResponse = {
  id: number
  name: string
  cpf?: string
  rg?: string
  cnpj?: string
}

export default async (name: string, args?: PaginationArgs) => {
  const response = await api({
    endpoint: `client/name/${name}`,
    method: 'GET',
    queryParams: args
  })
  const data: ClientResponse[] = await response.json()

  return {
    status: response.status,
    body: data.map(client => ({
      id: client.id + '',
      name: client.name,
      cpf_cnpj: client.cpf || client.cnpj || ''
    }))
  }
}