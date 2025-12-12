import { StyledButton } from "./styles";

type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ label, ...props }: ButtonProps) => (
  <StyledButton {...props}>
    {label}
  </StyledButton>
)