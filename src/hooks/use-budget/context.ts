import { createContext } from "react"
import type { Budget } from "../../services/budget"

type BudgetContextProps = {
  budget?: Budget
  setBudget: (budget?: Budget) => void
} | null

export const BudgetContext = createContext<BudgetContextProps>(null)

