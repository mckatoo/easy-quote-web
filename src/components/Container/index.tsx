import { Label, ChildrenWrapper, Wrapper } from "./styles"

const color = {
  black: "#364153",
  white: "white"
} as const

type Color = keyof typeof color

type ContainerProps = {
  label?: string
  color?: Color
  borderDashed?: boolean
  children: React.ReactNode
}

export const Container = ({ children, label, color = 'black', borderDashed }: ContainerProps) => (
  <Wrapper $color={color} $dashed={borderDashed}>
    {!!label &&
      <Label $color={color}>{label}</Label>
    }
    <ChildrenWrapper $withLabel={!!label}>
      {children}
    </ChildrenWrapper>
  </Wrapper>
)
