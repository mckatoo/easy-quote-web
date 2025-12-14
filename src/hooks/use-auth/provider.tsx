import { useState } from "react"
import { AuthContext } from "./context"
import SignInPage from "../../pages/Auth/SignInPage"

type AuthProviderProps = {
  children: React.ReactElement
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')

  async function signIn(username: string, password: string) {
    setIsLoading(true)
    try {
      // Simulação de login (usuário: admin, senha: 1234)
      if (username === 'admin' && password === '1234') {
        setIsAuthenticated(true)
        setUsername(username)
      } else {
        throw new Error('Usuário ou senha incorretos')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setIsAuthenticated(false)
    setUsername('')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, username, signIn, signOut }}>
      {isAuthenticated ? children : <SignInPage />}
    </AuthContext.Provider>
  )
}
