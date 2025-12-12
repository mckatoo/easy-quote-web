import api from "../service/api"


export const deleteVehicleService = async (vehicle_id: string) => {
    try {
        const response = await api({
            endpoint: `vehicle/id/${vehicle_id}`,
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
