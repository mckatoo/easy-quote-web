import { createContext } from "react"

type AuthContextProps = {
  isAuthenticated: boolean
  isLoading: boolean
  username: string
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
} | null

export const AuthContext = createContext<AuthContextProps>(null)

