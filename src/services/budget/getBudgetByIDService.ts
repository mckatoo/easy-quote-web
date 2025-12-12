type BudgetResponse = {
  date: Date;
  client: {
    name: string;
    id: number;
    cpf?: string;
    rg?: string;
    cnpj?: string;
  };
  id: number;
  value: number;
  receivedIn?: Date;
  services: {
    id: number;
    value: number;
    vehicleId: number;
    description: string;
    budgetId: number;
  }[];
}

export const getBudgetByIDService = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/budget/id/${id}`, {
      method: 'GET',
    })
    const data: BudgetResponse = await response.json()
    return {
      status: response.status,
      body: data
    }
  } catch (error) {
    return {
      status: 500,
      error
    }
  }
}
