import { twoDigits } from '@mckatoo/utils';
import { useRef, useState } from 'react';
import { Cash } from 'styled-icons/bootstrap';
import { DownArrow, LocationPlus, Phone, UpArrow } from 'styled-icons/boxicons-solid';
import { DeleteForever } from 'styled-icons/material';
import { useBudget } from "../../hooks/use-budget";
import { useClient } from "../../hooks/use-client";
import { useVehicle } from "../../hooks/use-vehicle";
import type { Budget, BudgetResponse } from '../../services/budget';
import { deleteBudgetService } from '../../services/budget/deleteBudget';
import { getBudgetByIDService } from '../../services/budget/getBudgetByIDService';
import { getClientByIDService } from "../../services/client/getClientByID";
import { getVehicleByIDService } from "../../services/vehicles/getVehicleByID";
import { AddressForm } from '../AddressForm';
import { CheckboxInput } from "../CheckboxInput";
import { Container } from "../Container";
import PhoneForm from '../PhoneForm';
import TextSearch from '../TextSearch';
import { ButtonLoadMore, ButtonScrollTo, Filters, OnlyToReceive, PerCustomer, Table, TableWrapper, Td, Th, Wrapper } from './styles';

type BudgetsListProps = {
  budgets: BudgetResponse[]
  onDeleteBudget?: () => void
  loadMoreBudgets?: () => void
  visibleFooter?: boolean
  searchForCustomerName: (name: string) => void
}

export const BudgetsList = ({
  budgets,
  onDeleteBudget,
  loadMoreBudgets,
  visibleFooter,
  searchForCustomerName
}: BudgetsListProps) => {
  const tableRef = useRef<HTMLTableElement>(null)

  const [onlyToReceive, setOnlyToReceive] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPhones, setShowPhones] = useState(false);
  const { setBudget } = useBudget()
  const { setClient, client } = useClient()
  const { setVehicle } = useVehicle()

  const ICON_SIZE = 22

  function clear() {
    setClient()
    setBudget()
    setVehicle()
  }
  async function deleteBudget(budgetID: string) {
    const { body: budget } = await getBudgetByIDService(budgetID)
    if (!budget?.client.id) throw new Error("Budget not found");
    const confirmed = await window.electron_ipc.confirm(`Deseja remover o orçamento do cliente ${budget.client?.name}?`)
    if (!confirmed) return
    await deleteBudgetService(budgetID)
    !!onDeleteBudget && onDeleteBudget()
  }
  async function selectBudget(budget: Budget) {
    const { body: client } = await getClientByIDService(budget.client_id)
    const { body: vehicle } = await getVehicleByIDService(budget.vehicle_id)
    if (!client || !vehicle) throw new Error("Unknown Client or Vehicle");
    setBudget(budget)
    setClient(client)
    setVehicle(vehicle)
  }
  function scrollToTop() {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  function scrollToBottom() {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector('tbody tr:last-child');
      if (lastRow) {
        lastRow.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
    }
  };

  return (
    <Wrapper>
      <div>
        <Container color="white" borderDashed label="Filtros" >
          <Filters>
            <OnlyToReceive>
              <CheckboxInput
                name="filter"
                label="Somente hà receber"
                onCheck={setOnlyToReceive}
              />
            </OnlyToReceive>
            <PerCustomer>
              <TextSearch
                placeholder='Buscar por nome de cliente'
                title="Por Cliente"
                name="byCustomerName"
                searchFunction={searchForCustomerName}
              />
            </PerCustomer>
          </Filters>
        </Container>
      </div>

      <TableWrapper>
        <Table id="budgets_list" ref={tableRef}>
          <thead>
            <tr>
              <Th scope="col">
                Cliente
              </Th>
              <Th scope="col">
                Recebido em
              </Th>
              <Th scope="col">
                Valor
              </Th>
              <Th scope="col" $isLast>
                <span>Edit</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => {
              if ((onlyToReceive && !!budget.received_in)) return
              return (
                <tr key={index}>
                  <th
                    onClick={() => selectBudget(budget)}
                    title="Click para editar"
                    scope="row">
                    {budget.client.name}
                  </th>
                  <Td>
                    {!!budget.received_in && `${twoDigits(budget.received_in.getDate())}/${twoDigits(budget.received_in.getMonth() + 1)}/${budget.received_in.getFullYear()}`}
                  </Td>
                  <Td>
                    {budget.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Td>
                  <Td $isLast>
                    <div>
                      <span
                        id={`${budget.id}-delete`}
                        title='Excluir'
                        onClick={() => deleteBudget(budget.id)}
                      >
                        <DeleteForever size={ICON_SIZE} />
                      </span>
                      <span
                        id={`${budget.id}-phones`}
                        title='Telefones'
                        onClick={() => {
                          setClient({
                            ...budget.client,
                            id: budget.client_id,
                            addresses: [],
                            phones: [],
                            vehicles: []
                          })
                          setShowPhones(true)
                        }}
                      >
                        <Phone size={ICON_SIZE} />
                      </span>
                      <span
                        id={`${budget.id}-addresses`}
                        title='Endereços'
                        onClick={() => {
                          setClient({
                            ...budget.client,
                            id: budget.client_id,
                            addresses: [],
                            phones: [],
                            vehicles: []
                          })
                          setShowAddressForm(true)
                        }}
                      >
                        <LocationPlus size={ICON_SIZE} />
                      </span>
                      <span
                        id={`${budget.id}-receive`}
                        title='Receber Agora'
                      >
                        <Cash size={ICON_SIZE} />
                      </span>
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
          {visibleFooter &&
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <div>
                    <ButtonScrollTo
                      title="Ir para o final da tabela"
                      onClick={scrollToBottom}
                    >
                      <DownArrow />
                    </ButtonScrollTo>
                    <ButtonLoadMore
                      onClick={loadMoreBudgets}
                      title="Carregar mais clientes"
                    >
                      Carregar mais clientes
                    </ButtonLoadMore>
                    <ButtonScrollTo
                      title='Ir para o começo da tabela'
                      onClick={scrollToTop}
                    >
                      <UpArrow />
                    </ButtonScrollTo>
                  </div>
                </td>
              </tr>
            </tfoot>
          }
        </Table>
        {!!showAddressForm &&
          <AddressForm
            clientName={client?.name}
            clientId={client?.id + ''}
            closeFn={() => {
              clear()
              setShowAddressForm(false)
            }}
          />
        }
        {showPhones &&
          <PhoneForm
            onClose={() => {
              clear()
              setShowPhones(false)
            }}
          />
        }
      </TableWrapper>
    </Wrapper>
  )
}
