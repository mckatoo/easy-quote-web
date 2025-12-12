import api from "../service/api"


export const deletePhoneService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `phone/id/${id}`,
      method: 'DELETE'
    })
    return {
      status: response.status,
      body: {}
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
