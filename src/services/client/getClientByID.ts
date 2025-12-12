import api from "../service/api"

export const getClientByIDService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `client/id/${id}`,
      method: 'GET',
    })
    const client = await response.json()

    return {
      status: response.status,
      body: {
        id: client.id,
        name: client.name,
        cpf_cnpj: client.cpf || client.cnpj,
        addresses: client.addresses,
        phones: client.phones,
        vehicles: client.vehicles
      }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
