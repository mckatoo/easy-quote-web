import { Input, Label, WrapperInput } from '../InputStyles'

type TextInputProps = {
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
} & React.InputHTMLAttributes<HTMLInputElement>

export const TextInput = ({
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
  ...props
}: TextInputProps) => {
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
        type="text"
        ref={inputRef}
        onChange={e => {
          setValue(e.currentTarget.value)
          !!onChangeValue && onChangeValue()
        }}
        value={value}
        {...props}
      />
    </WrapperInput>
  )
}
