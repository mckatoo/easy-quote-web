import type { Phone } from "."
import api from "../service/api"

export const createPhoneService = async (phone: Omit<Phone, 'id'>) => {
  const { client_id, ...data } = phone
  try {
    const response = await api({
      endpoint: 'phone',
      method: 'POST',
      body: JSON.stringify({ ...data, clientId: +client_id })
    })
    const createdPhone = await response.json()
    if (!("id" in createdPhone)) throw new Error("Phone ID not received");
    return {
      status: response.status,
      body: { id: createdPhone.id }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
