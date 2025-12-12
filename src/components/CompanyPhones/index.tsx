import { useRef, useState } from "react"
import { Add, CloseCircle } from "styled-icons/ionicons-solid"
import { PhoneInput } from "../PhoneInput"
import PhoneList from "../PhoneList"
import { SelectInput } from "../SelectInput"
import { TextInput } from "../TextInput"
import { CloseButton, PhoneListWrapper, Title, Wrapper } from "./styles"

type CompanyPhones = {
  onClose: () => void
  phones: string[]
  onDeletePhone?: (phoneID: string) => void
  onAddPhone?: (phone?: { number: string, type: string }) => void
}

const phoneTypeOptions = [
  { label: "Fone", value: "Fone" },
  { label: "What", value: "What" },
  { label: "Cel", value: "Cel" },
  { label: "Outro", value: "Outro" }
]

export const CompanyPhones = ({ onClose, phones, onDeletePhone, onAddPhone }: CompanyPhones) => {
  const phoneTypeRef = useRef<HTMLSelectElement>(null)

  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState(phoneTypeOptions[0].value);
  const [otherPhoneType, setOtherPhoneType] = useState('');

  function resetForm() {
    setPhone('')
    setPhoneType(phoneTypeOptions[0].value)
    setOtherPhoneType('')
    phoneTypeRef.current?.focus()
  }
  async function deletePhone(phoneID: string) {
    !!onDeletePhone && onDeletePhone(phoneID)
  }
  async function addPhone() {
    !!onAddPhone && onAddPhone({ number: phone, type: otherPhoneType.length ? otherPhoneType : phoneType })
    resetForm()
  }

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseCircle size={24} />
      </CloseButton>
      <Title>Telefones</Title>
      <form onSubmit={e => {
        e.preventDefault()
        addPhone()
      }}>
        {phoneType === "Outro"
          ? <TextInput
            name="other_phone_type"
            state={[otherPhoneType, setOtherPhoneType]}
          />
          : <SelectInput
            ref={phoneTypeRef}
            name="phone_type"
            title="Tipo de Telefone"
            options={phoneTypeOptions}
            value={phoneType}
            onChangeValue={setPhoneType}
          />
        }
        <PhoneInput
          autoFocus
          required
          name='phone'
          state={[phone, setPhone]}
        />
        <span
          title="Adicionar Telefone"
          onClick={addPhone}>
          <Add size={24} />
        </span>
      </form>
      <PhoneListWrapper>
        <PhoneList phones={phones} onDeletePhone={deletePhone} />
      </PhoneListWrapper>
    </Wrapper>
  )
}