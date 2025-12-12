import api from "../service/api"


export const getVehicleByIDService = async (id: string) => {
  try {
    const response = await api({
      endpoint: `vehicle/id/${id}`,
      method: 'GET',
    })
    const { client, services, budgets, ...vehicle } = await response.json()
    return {
      status: response.status,
      body: {
        ...vehicle,
        id: vehicle.id,
        services,
        budgets
      }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }


}
