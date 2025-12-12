import { normalizeCepNumber, onlyDecimals } from "@mckatoo/utils"
import { useEffect, useRef, useState } from "react"
import { CloseCircle } from "styled-icons/ionicons-solid"
import { DeleteForever } from "styled-icons/material"
import { createAddressService } from "../../services/address/createAddress"
import { deleteAddressService } from "../../services/address/deleteAddress"
import { getAddressByCEP } from "../../services/address/getAddressByCEP"
import { getAddressByClientIDService, type AddressResponse } from "../../services/address/getAddressesByClientID"
import { Button } from "../Button"
import { TextInput } from "../TextInput"
import { CepInputWrapper, CloseWrapper, ErrorWrapper, Form, FormLine, FormMain, FormWrapper, FullWidth, LoadingWrapper, Main, Table, TableWrapper, Td, Th, Title, Wrapper } from "./styles"

type AddressFormProps = {
  clientId: string
  clientName?: string
  onSave?: () => void
  closeFn?: () => void
}

export const AddressForm = ({
  clientId,
  clientName,
  onSave,
  closeFn
}: AddressFormProps) => {
  const numberRef = useRef<HTMLInputElement>(null)
  const cepInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);

  async function deleteAddress(address_id: string) {
    const address = addresses.find(a => +a.id === +address_id)
    const confirmed = await window.electron_ipc.confirm(`Deseja remover o endereço de cep ${address?.cep} do cliente ${clientName}?`)
    if (!confirmed) return
    setLoading(true)
    await deleteAddressService(address_id)
    getAddressesByClientID()
    setLoading(false)
  }
  async function getAddress() {
    setLoading(true)
    const { body, error } = await getAddressByCEP(cep)
    if (!body) {
      !!error && setError(error.toString())
      setLoading(false)
      return
    }
    setStreet(body.street)
    setCity(body.city)
    setUf(body.state)
    setDistrict(body.district)
    numberRef.current?.focus()

    setLoading(false)
  }
  async function save() {
    setLoading(true)

    const { error } = await createAddressService({
      client_id: clientId,
      cep: cep.toString(),
      street, city, uf, number, district
    })
    !!(error instanceof Error) && setError(error.message)
    setCep('')
    setStreet('')
    setCity('')
    setUf('')
    setNumber('')
    setDistrict('')
    getAddressesByClientID()

    !!onSave && onSave()
    cepInputRef.current?.focus()

    setLoading(false)
  }
  async function getAddressesByClientID() {
    setLoading(true)
    const { body } = await getAddressByClientIDService(clientId)
    !!body && setAddresses(body)
    setLoading(false)
  }
  function onSubmitAddress(element: React.FormEvent<HTMLFormElement>) {
    save()
    element.preventDefault()
  }

  useEffect(() => {
    getAddressesByClientID()
  }, []);
  useEffect(() => {
    const decimals = onlyDecimals(cep)
    if (decimals.length > 7) {
      getAddress()
    }
  }, [cep])
  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 3000)
  }, [error]);

  return (
    <Wrapper>
      <CloseWrapper onClick={closeFn}>
        <CloseCircle size={24} />
      </CloseWrapper>
      <Main>
        {!!error?.length &&
          <ErrorWrapper>
            <span>{error}</span>
          </ErrorWrapper>
        }
        {!!loading &&
          <LoadingWrapper>
            <style>
              {`
                svg > path {
                  transform-origin: center;
                }
              `}
            </style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="currentColor" stroke="currentColor" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"><animateTransform attributeName="transform" calcMode="spline" dur="2" keySplines="0 0 1 1" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0;120" /></path></svg>
          </LoadingWrapper>
        }
        <FormWrapper>
          <Form onSubmit={onSubmitAddress}>
            {!!clientName?.length && <Title>Endereços de {clientName}</Title>}
            <input type="submit" hidden />
            <FormMain>
              <FormLine>
                <CepInputWrapper>
                  <TextInput
                    autoFocus
                    inputRef={cepInputRef}
                    label="Cep"
                    required
                    name="cep"
                    state={[cep, setCep]}
                  />
                </CepInputWrapper>
                <TextInput
                  name="street"
                  label="Rua"
                  state={[street, setStreet]}
                />
                <FullWidth>
                  <TextInput
                    inputRef={numberRef}
                    name="number"
                    label="Número"
                    state={[number, setNumber]}
                  />
                </FullWidth>
              </FormLine>
              <FormLine>
                <TextInput
                  name="city"
                  label="Cidade"
                  state={[city, setCity]}
                />
                <FullWidth>
                  <TextInput
                    name="uf"
                    label="Estado"
                    state={[uf, setUf]}
                  />
                </FullWidth>
              </FormLine>
            </FormMain>
            <Button
              type='submit'
              disabled={!street.length || !city.length || !district.length || !uf.length}
              label="Salvar"
            />
          </Form>
          <TableWrapper>
            <Table id="addresses-list">
              <thead>
                <tr>
                  <Th scope="col" $size="96px">CEP</Th>
                  <Th scope="col">Rua</Th>
                  <Th scope="col" $size="96px">Cidade/UF</Th>
                  <Th scope="col" $size="48px">
                    <span className="sr-only">Edit</span>
                  </Th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address, index) => {
                  const cep = normalizeCepNumber(address.cep + '')
                  const streetWithNumber = address.street + '' + (!!address.number && `, ${address.number}`)
                  const cityWithState = address.city + '/' + address.uf?.toUpperCase()
                  return <tr key={index}>
                    <Td title={cep}>
                      {cep}
                    </Td>
                    <Td title={streetWithNumber} $withEllipsis>
                      {streetWithNumber}
                    </Td>
                    <Td title={cityWithState}>
                      {cityWithState}
                    </Td>
                    <Td>
                      <span
                        onClick={() => !!address.id && deleteAddress(address.id + '')}
                        title='Excluir'
                      >
                        <DeleteForever size={24} />
                      </span>
                    </Td>
                  </tr>
                })}
              </tbody>
            </Table>
          </TableWrapper>
        </FormWrapper >
      </Main>
    </Wrapper>
  )
}
