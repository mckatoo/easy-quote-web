import { stringToMoney } from "@mckatoo/utils";
import { upperCaseDeep } from "@mckatoo/utils";
import type { JSX } from "react";
import { useBudget } from "../../hooks/use-budget";
import { useClient } from "../../hooks/use-client";
import { useSettings } from "../../hooks/use-settings";
import { useVehicle } from "../../hooks/use-vehicle";
import { deleteService } from "../../services/service/deleteService";
import getServicesByBudgetID from "../../services/service/getServicesByBudgetID";
import { Budget, BudgetBody, CompanyInfo, FooterWrapper, Header, Line, Separator, Td1, Td2, Td3, TdRemove, TextStyle, TextXLStyle, Th1, Th2, Th3, TitleWrapper, TotalWrapper, Wrapper } from "./styles";
import { Logo } from "../Logo";

type BudgetReportProps = {
  onRemoveService?: () => void
}

export const BudgetReport = ({ onRemoveService }: BudgetReportProps) => {
  const { budget, setBudget } = useBudget()
  const { client } = useClient()

  const { vehicle: _vehicle } = useVehicle()
  const { settings } = useSettings()

  const vehicle = !!_vehicle ? upperCaseDeep(_vehicle) : undefined
  const address = client?.addresses[0]
  const phones = client?.phones.map(phone => phone.number).toString()
  const total = budget?.services.reduce((acc, service) => acc + service.value, 0).toString()

  async function removeService(serviceID: string) {
    const { error, status } = await deleteService(serviceID)
    if (!!error || status !== 204) {
      console.error('Erro ao remover o serviço:', (error || 500))
      return
    }
    if (!budget?.id) throw new Error("Não há orçamento selecionado.");

    const { body: updatedServices, ...servicesResponse } = await getServicesByBudgetID(budget.id)
    if (!!servicesResponse.error || servicesResponse.status !== 200)
      throw new Error("");

    !!budget
      ? setBudget({
        ...budget,
        services: updatedServices || []
      })
      : setBudget()
    !!onRemoveService && onRemoveService()
  }

  return (
    <Wrapper id="budget-report">
      <Header>
        <CompanyInfo>
          {settings?.company &&
            <>
              <h1>{settings?.company.name}</h1>
              <Logo />
              <Text>{settings.company.address.street}</Text>
              <Text>{settings.company.address.neighborhood} - {settings.company.address.city}/{settings.company.address.state}</Text>
              {settings.company.phones.map((phone, index) => (
                <Text key={index}>{phone}</Text>
              ))}
            </>
          }
          {!!budget?.date &&
            <TextXL>EMISSÃO: {budget.date.toLocaleDateString('pt-br')}</TextXL>
          }
        </CompanyInfo>

        <BudgetBody>
          <Line />
          <TitleWrapper>
            <TextXL>O R Ç A M E N T O</TextXL>
          </TitleWrapper>
          <Line />

          <Budget>
            {!!budget?.id &&
              <TextXL>COD: {budget.id}</TextXL>
            }

            <Line />
            {!!(client?.id && client.name) &&
              <TextXL>{client.id} - {client.name}</TextXL>
            }
            {!!(address?.street && address.city && address.uf) && <>
              <TextXL>End: {address.street}, {address.number || 'S/N'}</TextXL>
              <TextXL>Bairro: {address.district}</TextXL>
              <TextXL>Cidade: {address.city}</TextXL>
            </>}
            {!!phones?.length &&
              < TextXL > Fone: {phones}</TextXL>
            }
            {!!vehicle &&
              <TextXL>Veículo: {vehicle.brand}/{vehicle.model}{vehicle.year ? ` - ${vehicle.year} ` : ''}</TextXL>
            }
            <Line />

            <TextXL>SERVIÇOS</TextXL>

            <Line />
            <table>
              <thead>
                <tr>
                  <Th1 scope="col">
                    <TextXL>Código</TextXL>
                  </Th1>
                  <Th2 scope="col">
                    <TextXL>Descrição</TextXL>
                  </Th2>
                  <Th3 scope="col">
                    <TextXL>Valor</TextXL>
                  </Th3>
                </tr>
              </thead>
              <tbody>
                {!!budget?.services?.length && budget.services.map((service) => {
                  return service.id ? (
                    <tr key={service.id}>
                      <Td1>
                        <TextXL>
                          {service.id}
                        </TextXL>
                      </Td1>
                      <Td2>
                        <div>
                          <span>
                            <TextXL>
                              {service.description}
                            </TextXL>
                          </span>
                          <Separator />
                        </div>
                      </Td2>
                      <Td3>
                        <TextXL>
                          {stringToMoney(service.value.toString())}
                        </TextXL>
                      </Td3>
                      <TdRemove onClick={() => removeService(service.id)}>
                        <TextXL>
                          ❌
                        </TextXL>
                      </TdRemove>
                    </tr>
                  ) : null
                })}
              </tbody>
            </table>
            <Line />
            {!!total &&
              <TotalWrapper>
                <TextXL>TOTAL:</TextXL>
                <TextXL>
                  {
                    stringToMoney(total)
                  }
                </TextXL>
              </TotalWrapper>
            }
            <Line />
          </Budget>
          <FooterWrapper>
            <TextXL>Ass: _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</TextXL>
            <TextXL>{client?.name ?? ''}</TextXL>
            <Text>Reconheço e pagarei a dívida acima</Text>
          </FooterWrapper>
        </BudgetBody>
      </Header>
    </Wrapper >
  )
}

type LineProps = {
  children: JSX.Element | string[] | string
}
const Text = ({ children }: LineProps) => <TextStyle>{children}</TextStyle>
const TextXL = ({ children }: LineProps) => <TextXLStyle>{children}</TextXLStyle>

