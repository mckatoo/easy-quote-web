import type { Address } from "."
import api from "../service/api"

export const createAddressService = async (address: Omit<Address, 'id'>) => {
  const { client_id, ...data } = address
  try {
    const response = await api({
      endpoint: 'address',
      method: 'POST',
      body: JSON.stringify({ ...data, clientId: +client_id })
    })
    const createdAddress = await response.json()
    if (!("id" in createdAddress)) throw new Error("Address ID not received");
    return {
      status: response.status,
      body: { id: createdAddress.id }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
