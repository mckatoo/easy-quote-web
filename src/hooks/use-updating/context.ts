import { createContext } from "react"

type UpdatingContextProps = {
  updating: boolean,
  setUpdating: (updating: boolean) => void
} | null

export const UpdatingContext = createContext<UpdatingContextProps>(null)

