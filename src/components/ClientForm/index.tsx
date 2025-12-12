import { normalizeCnpjNumber, normalizeCPFNumber, onlyDecimals } from "@mckatoo/utils";
import { useEffect, useRef, useState } from "react";
import { CloseCircle } from "styled-icons/ionicons-solid";
import { useClient } from "../../hooks/use-client";
import type { RequiredAddress } from "../../services/address";
import { createAddressService } from "../../services/address/createAddress";
import { getAddressByCEP } from "../../services/address/getAddressByCEP";
import { createClientService } from "../../services/client/createClient";
import { getClientByCNPJService } from "../../services/client/getClientByCNPJ";
import { updateClientService } from "../../services/client/updateClient";
import { createPhoneService } from "../../services/phone/createPhone";
import { Button } from "../Button";
import { Container } from "../Container";
import { Loading } from "../Loading";
import { PhoneInput } from "../PhoneInput";
import { TextInput } from "../TextInput";
import { AddressLine, AddressWrapper, Animate, CEPWrapper, CloseButton, CNPJWrapper, ErrorWrapper, Form, FormContent, FormTitle, FormWrapper, FullWidth, NumberAddressWrapper, PersonalIdentity, StateWrapper, Wrapper } from "./styles";


type ClientFormProps = {
  isModal?: boolean
  onSaveClient?: () => void
  onClose?: () => void
  setClientID?: (clientID: string) => void
}

export const ClientForm = ({
  isModal = false,
  onSaveClient,
  onClose,
  setClientID,
}: ClientFormProps) => {
  const abortCNPJ = new AbortController()
  const { signal: cnpj_cancel } = abortCNPJ
  const abortCEP = new AbortController()
  const { signal: cep_cancel } = abortCEP

  const nameInputRef = useRef<HTMLInputElement>(null)
  const numberInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [loadingCNPJ, setLoadingCNPJ] = useState(false);
  const [name, setName] = useState('')
  const [cpf_cnpj, setCPFCnpj] = useState('')
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [uf, setUf] = useState('')
  const [number, setNumber] = useState('')
  const [phone, setPhone] = useState('');
  const [labelButton, setLabelButton] = useState<'Salvar' | 'Atualizar'>('Salvar');
  const { client, setClient } = useClient()

  async function close() {
    !!onClose && onClose()
  }
  function clear() {
    setName('')
    setCPFCnpj('')
    setCep('')
    setStreet('')
    setCity('')
    setUf('')
    setNumber('')
    setDistrict('')
    setPhone('')
    document.getElementsByName('cpf_cnpj')[0].focus()
  }
  async function saveAddress(clientID: string) {
    if (!cep.length && !street.length && !city.length && !uf.length) return
    const newAddress = {
      client_id: clientID,
      cep: cep,
      street, city, uf, number, district
    }
    const { error, body } = await createAddressService(newAddress)
    !!(error instanceof Error) && setError(error.message)
    return body?.id
  }
  async function savePhone(clientID: string) {
    const newPhone = {
      client_id: clientID,
      number: phone
    }
    const { error, body } = await createPhoneService(newPhone)
    !!(error instanceof Error) && setError(error.message)
    return body?.id
  }
  async function save() {
    setLoading(true)

    const { status, body } = !client?.id
      ? await createClientService({
        name, cpf_cnpj
      })
      : await updateClientService({
        id: client.id, name, cpf_cnpj
      })
    if (!(+status === 201 || +status === 204)) {
      setError(JSON.stringify(body))
      setTimeout(() => {
        setError('')
      }, 3000)
      setLoading(false)
      return
    }
    const clientID = body?.id || client?.id
    const addressID = await saveAddress(clientID)
    const phoneID = await savePhone(clientID)
    const newAddress = {
      id: addressID, cep, city, client_id: clientID, district, street, uf, number
    }
    const addresses: RequiredAddress[] = !!client?.addresses.length
      ? [...client.addresses, newAddress]
      : [newAddress]
    setClient({
      id: clientID,
      name,
      cpf_cnpj,
      addresses,
      phones: !!phoneID ? [{
        id: phoneID,
        client_id: clientID,
        number: phone
      }] : [],
      vehicles: []
    })
    clear()
    !!onSaveClient && onSaveClient()
    !!setClientID && setClientID(`${body?.id}`)

    setLoading(false)
  }
  async function getAddress() {
    setLoadingCEP(true)
    const { body, error } = await getAddressByCEP(cep, cep_cancel)
    if (!body) {
      !!error && setError(error)
      setLoadingCEP(false)
      return
    }
    setStreet(body.street)
    setCity(body.city)
    setUf(body.state)
    setDistrict(body.district)
    numberInputRef.current?.focus()

    setLoadingCEP(false)
  }
  async function getCNPJInfo(cnpj: string) {
    setLoadingCNPJ(true)
    const { body, error } = await getClientByCNPJService(cnpj, cnpj_cancel)
    if (!body) {
      !!error && setError(error)
      setLoadingCNPJ(false)
      return
    }
    setName(body.name)
    nameInputRef.current?.focus()

    setLoadingCNPJ(false)
  }

  useEffect(() => {
    Promise.resolve(
      setTimeout(() => {
        setError('')
      }, 3000)
    )
  }, [error]);
  useEffect(() => {
    if (!client) {
      clear()
      return
    }
    setName(client.name)
    setCPFCnpj(client.cpf_cnpj)
    if (!!client.id)
      setLabelButton('Atualizar')
    else
      setLabelButton('Salvar')
  }, [client]);
  useEffect(() => {
    const decimals = onlyDecimals(cep)
    if (decimals.length > 7) {
      getAddress()
    }
  }, [cep])
  useEffect(() => {
    const decimals = onlyDecimals(cpf_cnpj + '')
    const isCNPJ = decimals.length > 13
    if (isCNPJ) {
      setCPFCnpj(normalizeCnpjNumber(decimals + ''))
      getCNPJInfo(decimals + '')
      return
    }
    setCPFCnpj(normalizeCPFNumber(decimals + ''))
  }, [cpf_cnpj]);

  return (
    <>
      {isModal &&
        <CloseButton onClick={close}>
          <CloseCircle size={24} />
        </CloseButton>
      }

      <Wrapper $isModal={isModal}>
        {!!error?.length && <ErrorWrapper $isModal={isModal}>
          <span>{error}</span>
        </ErrorWrapper>}
        <Loading isModal loading={loading || loadingCEP || loadingCNPJ} />
        <FormWrapper $isModal={isModal}>
          {!!isModal && <FormTitle>Cadastro de Clientes</FormTitle>}
          <Form $isModal={isModal} onSubmit={element => {
            save()
            element.preventDefault()
          }}
          >
            <input type="submit" hidden />
            <FormContent>
              <PersonalIdentity $loadingCNPJ={loadingCNPJ}>
                <CNPJWrapper>
                  <TextInput
                    label="CPF/CNPJ"
                    autoFocus
                    id="cpf_cnpj"
                    name="cpf_cnpj"
                    state={[cpf_cnpj, setCPFCnpj]}
                  />
                </CNPJWrapper>

                <FullWidth>
                  <TextInput
                    onChangeValue={() => name.length > 0 && abortCNPJ.abort()}
                    required
                    label="Nome"
                    inputRef={nameInputRef}
                    id="name"
                    name="name"
                    state={[name, setName]}
                  />
                </FullWidth>
              </PersonalIdentity>
              <Animate $isAnimated={loadingCEP}>
                <Container color="white" borderDashed>
                  <AddressWrapper>
                    <AddressLine>
                      <CEPWrapper>
                        <TextInput
                          label="Cep"
                          name="cep"
                          state={[cep, setCep]}
                        />
                      </CEPWrapper>
                      <FullWidth>
                        <TextInput
                          onChangeValue={() => street.length > 0 && abortCEP.abort()}
                          name="street"
                          label="Rua"
                          state={[street, setStreet]}
                        />
                      </FullWidth>
                    </AddressLine>
                    <AddressLine>
                      <NumberAddressWrapper>
                        <TextInput
                          inputRef={numberInputRef}
                          name="number"
                          label="Número"
                          state={[number, setNumber]}
                        />
                      </NumberAddressWrapper>
                      <FullWidth>
                        <TextInput
                          name="district"
                          label="Bairro"
                          state={[district, setDistrict]}
                        />
                      </FullWidth>
                    </AddressLine>
                    <AddressLine>
                      <TextInput
                        name="city"
                        label="Cidade"
                        state={[city, setCity]}
                      />
                      <StateWrapper>
                        <TextInput
                          name="uf"
                          label="Estado"
                          state={[uf, setUf]}
                        />
                      </StateWrapper>
                      <PhoneInput
                        name="phone"
                        label="Telefone"
                        horizontal={false}
                        state={[phone, setPhone]}
                      />
                    </AddressLine>
                  </AddressWrapper>
                </Container>
              </Animate>
            </FormContent>
            <Button label={labelButton} disabled={!name.length} />
          </Form>
        </FormWrapper>
      </Wrapper>
    </>
  )
}
