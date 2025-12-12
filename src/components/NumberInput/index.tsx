import { toMonetaryValue } from "@mckatoo/utils"
import { Input, Label, WrapperInput } from "../InputStyles"

type InputProps = {
  inputRef?: React.Ref<HTMLInputElement>
  label?: string
  name: string
  required?: boolean
  disabled?: boolean
  autoFocus?: boolean
  monetary?: boolean
  horizontal?: boolean
  reverse?: boolean
  id?: string
  state: [value: string, setValue: (value: string) => void]
}

export const NumberInput = ({
  inputRef,
  label,
  state,
  required,
  autoFocus,
  monetary = false,
  name,
  horizontal,
  reverse,
  id,
  disabled,
}: InputProps) => {
  const [value, setValue] = state

  return (
    <WrapperInput $reverse={reverse} $horizontal={horizontal}>
      {!!label &&
        <Label htmlFor={name}>
          {label}{!!required && "*"}
        </Label>
      }
      <Input
        id={id || name}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        type="number"
        ref={inputRef}
        step={monetary ? "0.01" : "1"}
        onChange={e => {
          const value = e.currentTarget.value
          if (!monetary) {
            setValue(value)
            return
          }
          const formatedValue = toMonetaryValue(value)
          setValue(formatedValue)
        }}
        value={value}
      />
    </WrapperInput>
  )
}
