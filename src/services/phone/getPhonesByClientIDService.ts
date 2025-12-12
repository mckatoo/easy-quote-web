
import type { Phone } from "."
import api from "../service/api"

export const getPhonesByClientIDService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `phone/client_id/${id}`,
      method: 'GET',
    })
    const json: any[] = await response.json()
    const data: Required<Phone>[] = json.map(phone => ({
      id: phone.id.toString(),
      number: phone.number,
      client_id: phone.client_id + ''
    }))
    return {
      status: response.status,
      body: data
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
