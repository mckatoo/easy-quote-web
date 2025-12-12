import { normalizePhoneNumber } from  "@mckatoo/utils"
import { Label, WrapperInput } from "../InputStyles"
import { Input } from "./styles"

type PhoneInputProps = {
  autoFocus?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  label?: string
  name: string
  required?: boolean
  disabled?: boolean
  horizontal?: boolean
  reverse?: boolean
  id?: string
  onChangeValue?: () => void
  state: [value: string, setValue: (value: string) => void]
}

export const PhoneInput = ({
  inputRef,
  autoFocus,
  label,
  state,
  required,
  horizontal,
  reverse,
  name,
  id,
  disabled,
  onChangeValue,
}: PhoneInputProps) => {
  const [value, setValue] = state

  return (
    <WrapperInput $reverse={reverse} $horizontal={horizontal}>
      {!!label &&
        <Label htmlFor={name} $isDisabled={disabled}>
          {label}{!!required && "*"}
        </Label>
      }
      <Input
        id={id || name}
        name={name || id}
        autoFocus={autoFocus}
        disabled={disabled}
        required={required}
        type="tel"
        ref={inputRef}
        placeholder="(00) 00000-0000"
        onChange={e => {
          setValue(normalizePhoneNumber(e.currentTarget.value))
          !!onChangeValue && onChangeValue()
        }}
        value={value}
      />
    </WrapperInput>
  )
}
