export type Address = {
  id?: string
  cep?: string
  street?: string
  number?: string
  district?: string
  city?: string
  uf?: string
  client_id: string
}

type AddressWithoutNumber = Omit<Address, 'number'>
export type RequiredAddress = { number?: string } & Required<AddressWithoutNumber>
