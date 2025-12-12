import { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import { CloseCircle } from "styled-icons/ionicons-solid";
import { BudgetForm } from "../../components/BudgetForm";
import { BudgetReport } from "../../components/BudgetReport";
import { BudgetsList } from "../../components/BudgetsList";
import { Button } from "../../components/Button";
import { useBudget } from "../../hooks/use-budget";
import { useClient } from "../../hooks/use-client";
import { useVehicle } from "../../hooks/use-vehicle";
import type { BudgetResponse } from "../../services/budget";
import { listBudgetsService } from "../../services/budget/listBudgets";
import searchBudgetByClientName from "../../services/budget/searchBudgetByClientName";
import { BudgetListWrapper, BudgetReportWrapper, CloseWrapper, Content, FormWrapper, Page, ReportWrapper, TableContainer, Title, Wrapper } from "./styles";

export const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
  const [showFooter, setShowFooter] = useState(true);
  const { setVehicle, vehicle } = useVehicle()
  const { budget, setBudget } = useBudget()
  const { setClient } = useClient()

  const printRef = useRef<HTMLDivElement>(null);
  const printBudgetReport = useReactToPrint({ contentRef: printRef });

  const getBudgets = async (cursor?: number) => {
    const { body } = await listBudgetsService({
      cursor: cursor || 0,
      take: 10
    })
    const updatedBudgets = !cursor ? [...body] : [...budgets, ...body]
    setBudgets(updatedBudgets)
    setShowFooter(updatedBudgets.length > 9 ? true : false)
  }
  function loadMoreBudgets() {
    const cursor = +budgets[budgets.length - 1]?.id || 0
    getBudgets(cursor)
  }
  async function searchForClientName(clientName: string) {
    if (!clientName.length) {
      getBudgets()
      return
    }
    const { body } = await searchBudgetByClientName(clientName)
    setBudgets([...body])
    setShowFooter(false)
  }
  const closeBudgetReport = () => {
    setBudget()
    setClient()
    setVehicle()
  }

  useEffect(() => {
    getBudgets()
  }, []);
  useEffect(() => {
    document.getElementsByName('service')[0]?.focus()
  }, [budget?.id]);
  useEffect(() => {
    if (!budget?.id)
      document.getElementsByName('service')[0]?.focus()
  }, [vehicle?.id]);

  return (
    <Page>

      <Title>
        Orçamentos
      </Title>

      <Wrapper>
        <Content>
          <FormWrapper>
            <BudgetForm
              onAddService={getBudgets}
            />
            <Button
              type="button"
              disabled={!budget?.services.length}
              label="Imprimir"
              onClick={() => printBudgetReport()}
            />
          </FormWrapper>
          <TableContainer>
            {!!budget &&
              <ReportWrapper ref={printRef}>
                <BudgetReportWrapper>
                  <CloseWrapper onClick={closeBudgetReport}>
                    <CloseCircle size="24" />
                  </CloseWrapper>
                  <BudgetReport />
                </BudgetReportWrapper>
              </ReportWrapper>
              ||
              <BudgetListWrapper>
                <BudgetsList
                  budgets={budgets}
                  onDeleteBudget={() => {
                    getBudgets()
                  }}
                  loadMoreBudgets={loadMoreBudgets}
                  visibleFooter={showFooter}
                  searchForCustomerName={searchForClientName}
                />
              </BudgetListWrapper>
            }
          </TableContainer>
        </Content>
      </Wrapper>
    </Page >
  )
}

