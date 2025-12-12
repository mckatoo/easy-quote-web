import api from "../service/api"


export const deleteClientService = async (client_id: string) => {
    try {
        const response = await api({
            endpoint: `client/id/${client_id}`,
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
