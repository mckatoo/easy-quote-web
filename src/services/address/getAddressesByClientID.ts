import api from "../service/api"

export type AddressResponse = {
  number: string | null;
  id: number;
  cep: string | null;
  street: string | null;
  district: string | null;
  city: string | null;
  uf: string | null;
  clientId: number;
}
export const getAddressByClientIDService = async (id: string) => {
  try {
    const response = await api({
      method: 'GET',
      endpoint: `address/client_id/${id}`
    })
    const addresses: AddressResponse[] = await response.json()
    return {
      status: response.status,
      body: addresses
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
