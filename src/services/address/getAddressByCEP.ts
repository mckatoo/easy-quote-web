export async function getAddressByCEP(cep: string, signal?: AbortSignal) {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal
    })
    if (response.status === 404) throw new Error("Locate not found");
    if (response.status !== 200) throw new Error("Unknown error");

    const { state, city, neighborhood, street } = await response.json()
    return {
      status: response.status,
      body: { state, city, district: neighborhood, street }
    }
  } catch (_error) {
    return {
      status: 500,
      error: "Endereço não encontrado."
    }
  }

}
