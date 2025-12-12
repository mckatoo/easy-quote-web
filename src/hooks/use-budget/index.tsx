import { useContext } from "react"
import { BudgetContext } from "./context"


export function useBudget() {
  const context = useContext(BudgetContext)
  if (!context)
    throw new Error("Out of context");
  return context
}
