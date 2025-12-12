import { useEffect, useState, type InputHTMLAttributes } from "react"
import { Label, Wrapper } from "./styles"

type CheckboxInputProps = {
  onCheck?: (status: boolean) => void
  isChecked?: boolean
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  value?: string | ReadonlyArray<string> | number
} & InputHTMLAttributes<HTMLInputElement>

export const CheckboxInput = ({
  onCheck,
  isChecked = false,
  label,
  labelFor = '',
  labelColor = 'white',
  value,
  ...props
}: CheckboxInputProps) => {
  const id = `id-${props.name}`
  const [checked, setChecked] = useState(isChecked)

  const onChange = () => {
    const status = !checked
    setChecked(status)

    !!onCheck && onCheck(status)
  }

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked]);

  return (
    <Wrapper>
      <input
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label &&
        <Label htmlFor={id}>{label}</Label>
      }
    </Wrapper>
  )
}
