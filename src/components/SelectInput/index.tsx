import type { JSX } from "react"
import { Label, Select, Wrapper, WrapperSelect } from "./styles"

type Option = {
  value: string
  label: string
}
type SeletecInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
  onChangeValue?: (value: string) => void
  actionElement?: JSX.Element
  labelToLeft?: boolean
  placeholder?: string
  ref?: React.Ref<HTMLSelectElement>
}

export const SelectInput = ({
  label,
  options,
  onChangeValue,
  actionElement,
  labelToLeft = false,
  placeholder,
  ref,
  ...props
}: SeletecInputProps) => (
  <Wrapper $labelToLeft={labelToLeft}>
    {!!label &&
      <Label htmlFor={props.id ?? props.name} $isDisabled={props.disabled}>
        {label}{!!props.required && "*"}
      </Label>
    }
    <WrapperSelect>
      <Select
        {...props}
        ref={ref}
        id={props.id ?? props.name}
        onChange={e => {
          !!onChangeValue && onChangeValue(e.currentTarget.value)
        }}
      >
        {!!placeholder &&
          <option value="">{placeholder}</option>
        }
        {options.map((option, index) =>
          <option key={index} value={option.value}>{option.label}</option>
        )}
      </Select>
      {!!actionElement && actionElement}
    </WrapperSelect>
  </Wrapper>
)