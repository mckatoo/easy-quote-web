import { useEffect, useState } from "react"
import { DeleteForever } from "styled-icons/material"
import { useClient } from "../../hooks/use-client"
import { useVehicle } from "../../hooks/use-vehicle"
import type { Vehicle } from "../../services/vehicles"
import { deleteVehicleService } from "../../services/vehicles/deleteVehicle"
import { getVehiclesByClientIDService } from "../../services/vehicles/getVehiclesByClientID"
import { VehicleForm } from "../VehicleForm"
import { FormWrapper, Title, Wrapper } from "./styles"
import { Table, TableWrapper, Td, Th } from "../TableStyles"

type VehicleOfClientProps = {
  onClose?: () => void
}

export default ({ onClose }: VehicleOfClientProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { setClient, client } = useClient()
  const { setVehicle } = useVehicle()

  async function deleteVehicle(vehicleID: string) {
    const vehicle = vehicles.find(v => (v.id + '') === (vehicleID + ''))
    const confirmed = await window.electron_ipc.confirm(`Deseja remover o veículo ${vehicle?.brand}/${vehicle?.model} de placa ${vehicle?.plate}?`)
    if (!confirmed) return
    await deleteVehicleService(vehicleID)
    !!client && getVehiclesByClientID(client.id)
    setVehicle()
  }
  async function getVehiclesByClientID(client_id: string) {
    !!client && setClient({
      ...client,
      addresses: [],
      phones: [],
      vehicles: []
    })
    const { body } = await getVehiclesByClientIDService(client_id)
    !!body && setVehicles(body)
  }
  async function saveVehicle() {
    !!client && getVehiclesByClientID(client?.id)
  }

  useEffect(() => {
    !!client?.id && getVehiclesByClientID(client?.id)
  }, []);

  return <Wrapper>
    <Title>Veículos de {client?.name}</Title>
    <FormWrapper>
      <VehicleForm
        onClose={onClose}
        onSaveVehicle={saveVehicle}
      />
    </FormWrapper>
    <TableWrapper>
      <Table id="vehicles-list">
        <thead>
          <tr>
            <Th scope="col">Marca</Th>
            <Th scope="col">Modelo</Th>
            <Th $size="40px" $center scope="col">Ano</Th>
            <Th $size="50px" $center scope="col">Placa</Th>
            <Th $size="48px" $center scope="col">
              <span className="sr-only">Edit</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => {
            return (
              <tr key={index}>
                <Td title={vehicle.brand}>
                  {vehicle.brand}
                </Td>
                <Td title={vehicle.model} $withEllipsis>
                  {vehicle.model}
                </Td>
                <Td title={vehicle.year + ''}>
                  {vehicle.year}
                </Td>
                <Td title={vehicle.plate}>
                  {vehicle.plate}
                </Td>
                <Td>
                  <span
                    onClick={() => !!vehicle.id && deleteVehicle(vehicle.id + '')}
                    title='Excluir'
                  >
                    <DeleteForever size={24} />
                  </span>
                </Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  </Wrapper>
}