import { formatDateForBrowser } from "@mckatoo/utils";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PersonAdd } from "styled-icons/bootstrap";
import { Calendar } from "styled-icons/boxicons-solid";
import { TaskListSquareAdd } from "styled-icons/fluentui-system-regular";
import { useBudget } from "../../hooks/use-budget";
import { useClient } from "../../hooks/use-client";
import { useVehicle } from "../../hooks/use-vehicle";
import type { Budget } from "../../services/budget";
import { createBudgetService } from "../../services/budget/createBudget";
import { getBudgetByVehicleIDService } from "../../services/budget/getBudgetByVehicleIDService";
import type { Client } from "../../services/client";
import { getClientByIDService } from "../../services/client/getClientByID";
import { listClientsService } from "../../services/client/listClients";
import { createServiceService } from "../../services/service/createService";
import type { Vehicle } from "../../services/vehicles";
import { getVehiclesByClientIDService } from "../../services/vehicles/getVehiclesByClientID";
import { ClientForm } from "../ClientForm";
import { Container } from "../Container";
import { NumberInput } from "../NumberInput";
import { SelectInput } from "../SelectInput";
import { TextInput } from "../TextInput";
import { VehicleForm } from "../VehicleForm";
import { AddClient, AddService, AddServiceWrapper, AuxFormWrapper, DateInput, DateLabel, DateWrapper, ErrorWrapper, FieldFullWrapper, FieldWrapper, FormLine, FormMain, ServiceContainer, ValueRow, ValueWrapper, VehicleWrapper } from "./styles";

type BudgetFormProps = {
  onAddService?: () => void
}

export const BudgetForm = ({
  onAddService
}: BudgetFormProps) => {
  const now = Date.now()

  const [error, setError] = useState('')
  const [date, setDate] = useState(formatDateForBrowser(new Date(now)))
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const [clients, setClients] = useState<Required<Client>[]>([]);
  const [vehicles, setVehicles] = useState<Required<Vehicle>[]>([]);
  const [vehicleFormVisible, setVehicleFormVisible] = useState(false);
  const [clientFormVisible, setClientFormVisible] = useState(false);
  const [addedService, setAddedService] = useState(false);

  const { vehicle, setVehicle } = useVehicle()
  const { setBudget, budget } = useBudget()
  const { setClient, client } = useClient()

  async function getVehiclesByClientID() {
    if (!!client?.id) {
      const { body } = await getVehiclesByClientIDService(client.id)
      setVehicles(body ?? [])
    } else {
      setVehicles([])
    }
  }
  async function getClients() {
    const { body } = await listClientsService({ cursor: -1, take: -1 })
    setClients(body)
  }
  async function addService() {
    if (!vehicle?.id) throw new Error('Vehicle not found')
    const newBudget = {
      client_id: client?.id ?? '',
      date: new Date(date + 'T00:00:00-03:00'),
      vehicle_id: vehicle.id,
      value: 0,
      services: []
    }
    let budgetID = budget?.id
    if (!budgetID) {
      const budgetResponse = await createBudgetService(newBudget)
      if (budgetResponse.error || !budgetResponse.body) {
        setError(`Fail on create the budget: ${budgetResponse.error}`)
        return
      }
      budgetID = budgetResponse.body.id
      setBudget({
        id: budgetResponse.body.id,
        ...newBudget
      })
    }

    const serviceResponse = await createServiceService({
      description: serviceDescription,
      value: +serviceValue,
      vehicle_id: vehicle.id,
      budget_id: budgetID
    })
    if (serviceResponse.error || !serviceResponse.body) {
      setError(`Fail on create the service: ${serviceResponse.error}`)
      return
    }
    const service = {
      id: serviceResponse.body?.id,
      value: +serviceValue,
      description: serviceDescription,
      budget_id: budget?.id ?? '',
      vehicle_id: vehicle.id
    }
    !!setBudget && setBudget({
      id: budgetID,
      ...newBudget,
      services: !budget ? [service] : [...budget.services, service]
    })
    setServiceDescription('')
    setServiceValue("")
    setAddedService(true)

    !!onAddService && onAddService()
  }
  function addClient() {
    setClient()
    setClientFormVisible(!clientFormVisible)
  }
  const clear = () => {
    setBudget()
    setClient()
    setVehicle()
    setVehicles([])
  }
  async function haveBudget(vehicleID: string): Promise<Budget | undefined> {
    const { body: budget } = await getBudgetByVehicleIDService(vehicleID)
    return budget
  }
  async function onChangeVehicle(vehicleID: string) {
    setError('')
    if (vehicleID === '-1') {
      setVehicle()
      setVehicleFormVisible(true)
      return
    }
    if (+vehicleID > 0 && !!client) {
      const selectedVehicle = vehicles.find(v => String(v.id) === String(vehicleID))
      if (!selectedVehicle) {
        setVehicle()
        return
      }
      setVehicle({
        ...selectedVehicle,
        client
      })
      const budget = await haveBudget(vehicleID)
      console.log('budget ===>', budget)
      if (!!budget) {
        const confirmed = await window.electron_ipc.choice(
          'Este veículo tem orçamento à receber.\n O que deseja fazer?',
          ['Modificar último orçamento', 'Novo orçamento']
        )
        if (confirmed === 'Modificar último orçamento') {
          setBudget(budget)
          return
        }
        return
      }
    }
  }
  async function onChangeClient(clientID: string) {
    if (+clientID < 1) {
      clear()
      return
    }

    const { body: client, error: clientServiceError } = await getClientByIDService(clientID)
    if (clientServiceError) {
      setError(clientServiceError.toString())
      clear()
      return
    }
    !!client && setClient(client)
  }

  useEffect(() => {
    getClients()
  }, [])
  useEffect(() => {
    (async () => {
      if (!client?.id) {
        clear()
        return
      }
      const { body: vehicles, error: vehiclesServiceError } = await getVehiclesByClientIDService(client.id)
      if (vehiclesServiceError) {
        setError(vehiclesServiceError.toString())
        setVehicles([])
        return
      }
      !!vehicles && setVehicles(vehicles)
      !budget && document.getElementsByName('vehicle')[0].focus()
    })()
  }, [client]);
  useEffect(() => {
    if (addedService) {
      document.getElementsByName('service')[0].focus()
      setAddedService(false)
    }
  }, [addedService]);
  useEffect(() => {
    Promise.resolve(setTimeout(() => setError(''), 5000))
  }, [error]);

  return (
    <>
      {!!error.length &&
        <ErrorWrapper>
          <span>{error}</span>
        </ErrorWrapper>
      }
      <form onSubmit={e => {
        e.preventDefault()
        addService()
      }}>
        <input type="submit" hidden />
        <FormMain>
          <FormLine>
            <FieldWrapper>
              <DateWrapper>
                <DateLabel htmlFor="date">Data</DateLabel>
                <DatePicker
                  selected={new Date(date)}
                  id="date"
                  onChange={date => { !!date && setDate(formatDateForBrowser(date)) }}
                  autoFocus
                  customInput={
                    <DateInput>
                      <span>
                        {date ? new Date(date).toLocaleDateString() : "Selecione uma data"}
                      </span>
                      <Calendar size={20} />
                    </DateInput>
                  }
                />
              </DateWrapper>
            </FieldWrapper>
            <FieldFullWrapper>
              <SelectInput
                label="Cliente"
                options={[
                  { value: "", label: "Escolha um cliente..." },
                  ...clients
                    .toSorted((a, b) => ((a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : 0))
                    .map(client => ({ value: client.id, label: client.name }))
                ]}
                value={client?.id ?? '0'}
                onChangeValue={onChangeClient}
                title={client?.name}
                name="client"
                actionElement={
                  <AddClient title="Adicionar Cliente" onClick={addClient}>
                    <PersonAdd size={24} />
                  </AddClient>
                }
              />
            </FieldFullWrapper>
          </FormLine>
          <FieldWrapper>
            <Container borderDashed color="white">
              <VehicleWrapper>
                <SelectInput
                  disabled={!(client?.id && +client.id > 0)}
                  required
                  label="Veículo"
                  placeholder="Escolha um veículo"
                  options={[
                    { value: "-1", label: "Cadastrar novo veículo" },
                    ...vehicles.map(vehicle => ({
                      value: vehicle.id,
                      label: `${vehicle.model}/${vehicle.brand} ${vehicle.year} ${vehicle.plate}`
                    }))
                  ]}
                  value={vehicle?.id ?? '0'}
                  onChangeValue={onChangeVehicle}
                  name="vehicle"
                />
              </VehicleWrapper>
            </Container>

            <Container borderDashed color="white">
              <ServiceContainer>
                <TextInput id="service"
                  name="service"
                  label="Serviço"
                  state={[serviceDescription, setServiceDescription]}
                  disabled={!vehicle?.id}
                  required
                />
                <div style={{ display: "flex" }}>
                  <ValueWrapper>
                    <ValueRow>
                      <NumberInput
                        id="service-price"
                        name="service-price"
                        label="Valor"
                        monetary
                        state={[serviceValue, setServiceValue]}
                        disabled={!vehicle?.id || !serviceDescription.length}
                        required
                      />
                      <AddServiceWrapper>
                        <AddService
                          $disabled={!vehicle?.id || !serviceDescription.length}
                          title="Adicionar Serviço ao Orçamento"
                          onClick={addService}
                        >
                          <TaskListSquareAdd size={24} />
                        </AddService>
                      </AddServiceWrapper>
                    </ValueRow>
                  </ValueWrapper>
                </div>
              </ServiceContainer>
            </Container>
          </FieldWrapper>
        </FormMain>
      </form>

      {
        clientFormVisible &&
        <AuxFormWrapper>
          <ClientForm
            isModal={true}
            onClose={() => setClientFormVisible(false)}
            onSaveClient={async () => {
              getClients()
              setClientFormVisible(false)
            }}
          />
        </AuxFormWrapper>
      }

      {vehicleFormVisible &&
        <AuxFormWrapper>
          <VehicleForm
            isModal={true}
            onClose={() => setVehicleFormVisible(false)}
            onSaveVehicle={() => {
              getVehiclesByClientID()
              setVehicleFormVisible(false)
            }}
          />
        </AuxFormWrapper>
      }
    </>
  )
}
