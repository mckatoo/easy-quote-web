import api from "../service/api";

export default async () => {
    try {
        const response = await api({
            endpoint: 'auth/google',
            method: 'GET'
        })
        const { status, body } = await response.json();
        if (status !== 200) throw new Error("Unauthorized");
        return {
            status,
            body
        }
    } catch (error) {
        if (error instanceof Error)
            return {
                status: 500,
                error
            }
    }
}