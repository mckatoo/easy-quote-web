import { useEffect, useRef, useState } from "react";
import { CloseCircle } from "styled-icons/ionicons-solid";
import { Add } from "styled-icons/material";
import { useClient } from "../../hooks/use-client";
import type { Phone } from "../../services/phone";
import { createPhoneService } from "../../services/phone/createPhone";
import { deletePhoneService } from "../../services/phone/deletePhone";
import { getPhonesByClientIDService } from "../../services/phone/getPhonesByClientIDService";
import { PhoneInput } from "../PhoneInput";
import PhoneList from "../PhoneList";
import { AddPhoneButton, CloseButton, ListWrapper, Title, Wrapper } from "./styles";

type PhoneFormProps = {
  onClose: () => void
}

export default ({ onClose }: PhoneFormProps) => {
  const phoneInputRef = useRef<HTMLInputElement>(null)

  const [phones, setPhones] = useState<Omit<Phone, 'client_id'>[]>([]);
  const [phone, setPhone] = useState('')

  const { setClient, client } = useClient()

  const getPhones = async () => {
    if (!client?.id) return
    const { body } = await getPhonesByClientIDService(client.id)
    !!body && setPhones(body) && setClient({
      ...client,
      addresses: [],
      phones: [],
      vehicles: []
    })
  }
  const addPhone = async (e?: React.FormEvent) => {
    !!e && e.preventDefault()
    if (!client?.id || !phone.length) return
    await createPhoneService({
      client_id: client.id,
      number: phone
    })
    setPhone('')
    await getPhones()
    phoneInputRef.current?.focus()
  }
  const removePhone = async (phone_id: string) => {
    if (!client?.id || !+phone_id) return
    await deletePhoneService(phone_id)
    await getPhones()
  }

  useEffect(() => {
    client && getPhones()
  }, []);

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseCircle size={24} />
      </CloseButton>
      <Title>Telefones de {client?.name}</Title>
      <form onSubmit={addPhone}>
        <PhoneInput
          autoFocus
          required
          inputRef={phoneInputRef}
          name='phone'
          state={[phone, setPhone]}
        />
        <AddPhoneButton title="Adicionar Telefone" onClick={addPhone}>
          <Add size={24} />
        </AddPhoneButton>
      </form>
      <ListWrapper>
        <PhoneList phones={phones} onDeletePhone={removePhone} />
      </ListWrapper>
    </Wrapper>
  )
}