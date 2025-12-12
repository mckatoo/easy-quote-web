import api from "../service/api"


export const deleteAddressService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `address/id/${id}`,
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
