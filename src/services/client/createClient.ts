;
import { onlyDecimals } from "@mckatoo/utils";
import type { Client } from ".";
import api from "../service/api";


export const createClientService = async (client: Client) => {
  let data: any = { name: client.name }
  let field = 'cpf'
  const decimalOnly = onlyDecimals(client.cpf_cnpj)
  if (decimalOnly.length >= 12) field = 'cnpj'
  data[field] = client.cpf_cnpj
  try {
    const response = await api({
      endpoint: 'client',
      method: 'POST',
      body: JSON.stringify(data)
    })
    const createdClient = await response.json()
    if (!("id" in createdClient)) throw new Error("Client ID not received");
    return {
      status: response.status,
      body: { id: createdClient.id }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
