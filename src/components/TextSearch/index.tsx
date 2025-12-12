import { useState, type InputHTMLAttributes } from "react"
import { Search } from "styled-icons/material"
import { Input, Label, Wrapper } from "./styles"

type TextSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  searchFunction: (value: string) => void
  autoFocus?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  name: string
  required?: boolean
  disabled?: boolean
  id?: string
  label?: string
  onChangeValue?: () => void
}

export default ({
  searchFunction,
  inputRef,
  autoFocus,
  required,
  name,
  id,
  disabled,
  onChangeValue,
  label,
  ...props
}: TextSearchProps) => {
  const [value, setValue] = useState('')

  return (
    <Wrapper>
      {!!label &&
        <Label htmlFor={name}>
          {label}{!!required && "*"}
        </Label>
      }
      <Input
        type="text"
        id={id || name}
        name={name || id}
        autoFocus={autoFocus}
        disabled={disabled}
        required={required}
        ref={inputRef}
        onChange={e => {
          setValue(e.currentTarget.value)
          !!onChangeValue && onChangeValue()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            searchFunction(value);
          }
        }}
        value={value}
        {...props}
      />
      <Search
        onClick={() => searchFunction(value)}
        size={32}
      />
    </Wrapper>
  )
}