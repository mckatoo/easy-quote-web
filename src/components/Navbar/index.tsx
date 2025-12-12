import { UserDropdown } from "../UserDropdown"
import { Nav, SignInButton, Title, UserInfo } from "./styles"

type NavbarType = {
  username?: string
  login?: () => void
  logout?: () => void
}

export const Navbar = ({ username = '', login, logout }: NavbarType) => (
  <Nav>
    <Title>
      Sistema de Orçamentos
    </Title>
    {!!login &&
      <UserInfo>
        {!username.length ? (
          <SignInButton onClick={login}>Entrar</SignInButton>
        ) : (
          <UserDropdown username={`Olá ${username}!`} logout={logout} />
        )}
      </UserInfo>
    }
  </Nav>
)
