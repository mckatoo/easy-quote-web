import api from "../service/api"


export const deleteBudgetService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `budget/id/${id}`,
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
