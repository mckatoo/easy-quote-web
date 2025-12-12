import api from "./api"


export const deleteService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `service/id/${id}`,
      method: 'DELETE',
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
