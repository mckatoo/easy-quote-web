export const getClientByCNPJService = async (cnpj: string, signal?: AbortSignal) => {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal
    })
    if (response.status === 404) throw new Error("Locate not found");
    if (response.status !== 200) throw new Error("Unknown error");

    const { nome_fantasia, descricao_identificador_matriz_filial } = await response.json()
    return {
      status: response.status,
      body: { name: nome_fantasia, matriz: descricao_identificador_matriz_filial === "MATRIZ" }
    }
  } catch (error) {
    if (error instanceof DOMException)
      return {
        status: 499,
        error: "Requisição cancelada pelo usuário."
      }
    return {
      status: 500,
      error: "CNPJ não encontrado."
    }
  }
}
