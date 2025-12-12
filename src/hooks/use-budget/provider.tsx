import { useState } from "react"
import type { Budget } from "../../services/budget"
import { BudgetContext } from "./context"

type BudgetProviderProps = {
  children: React.ReactElement
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [budget, setBudget] = useState<Budget>()

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}
