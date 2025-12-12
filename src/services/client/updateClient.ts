;
import { onlyDecimals } from "@mckatoo/utils";
import type { Client } from ".";
import api from "../service/api";

export const updateClientService = async (client: Required<Client>) => {
  let data: any = { name: client.name }
  let field = 'cpf'
  if (client.cpf_cnpj) {
    const decimalOnly = onlyDecimals(client.cpf_cnpj)
    if (decimalOnly.length >= 12) field = 'cnpj'
    data[field] = client.cpf_cnpj
  }
  try {
    const response = await api({
      endpoint: `client/id/${client.id}`,
      method: 'PUT',
      body: JSON.stringify(data)
    })
    const updateStatus = response.status
    if (updateStatus !== 204) throw new Error("Client ID not received");
    return {
      status: response.status,
      body: { id: client.id }
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }

}
