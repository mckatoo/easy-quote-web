import { useRef, useState } from 'react';
import { DownArrow, LocationPlus, Phone as PhoneIcon, UpArrow } from 'styled-icons/boxicons-solid';
import { VehicleCar } from 'styled-icons/fluentui-system-filled';
import { DeleteForever } from 'styled-icons/material';
import { useClient } from '../../hooks/use-client';
import { useVehicle } from '../../hooks/use-vehicle';
import type { ClientResponse } from '../../services/client';
import { deleteClientService } from '../../services/client/deleteClient';
import { AddressForm } from '../AddressForm';
import PhoneForm from '../PhoneForm';
import VehiclesOfClient from '../VehiclesOfClient';
import { ButtonLoadMore, ButtonScroolTo, Table, Td, Th, Z20 } from './styles';

type ClientListProps = {
  clients: ClientResponse[]
  onDeleteClick?: () => void
  loadMoreClients?: () => void
  visibleFooter?: boolean
}

export const ClientList = ({ onDeleteClick, clients, loadMoreClients, visibleFooter = false }: ClientListProps) => {
  const tableRef = useRef<HTMLTableElement>(null)

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showPhones, setShowPhones] = useState(false);
  const { setClient, client } = useClient()
  const { setVehicle } = useVehicle()

  function clear() {
    setVehicle()
    setClient()
  }
  async function removeClient(id: string) {
    const client = clients.find(client => +client.id === +id)
    const confirmed = await window.electron_ipc.confirm(`Deseja remover o cliente ${client?.name}?`)
    if (!confirmed) return
    await deleteClientService(id)
    setClient()
    !!onDeleteClick && onDeleteClick()
  }
  function editClick(client: ClientResponse) {
    !client?.id
      ? setClient()
      : setClient(client)
  }
  function showVehiclesOfClient(client: ClientResponse) {
    setClient(client)
    setShowVehicles(true)
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
    <>
      <Table id="client-list">
        <thead>
          <tr>
            <Th scope="col">
              Nome
            </Th>
            <Th scope="col">
              CPF/CNPJ
            </Th>
            <Th scope="col" $size='164px'>
              <span className='sr-only'>Edit</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) =>
            <tr key={index}>
              <th
                scope="row"
                onClick={() => editClick({
                  ...client,
                  phones: [],
                  vehicles: [],
                  addresses: []
                })}>
                {client.name}
              </th>
              <Td>
                {client.cpf_cnpj}
              </Td>
              <Td $isLast>
                <span
                  onClick={() => removeClient(client.id)}
                  title='Excluir'>
                  <DeleteForever size={24} />
                </span>
                <span
                  title='Telefones'
                  onClick={() => {
                    setClient({
                      ...client,
                      addresses: [],
                      phones: [],
                      vehicles: []
                    })
                    setShowPhones(true)
                  }}
                >
                  <PhoneIcon size={24} />
                </span>
                <span
                  title='Endereços'
                  onClick={() => {
                    setClient({
                      id: client.id,
                      name: client.name,
                      cpf_cnpj: client.cpf_cnpj,
                      addresses: [],
                      phones: [],
                      vehicles: []
                    })
                    setShowAddressForm(true)
                  }}
                >
                  <LocationPlus size={24} />
                </span>
                <span
                  title='Veículos'
                  onClick={() => showVehiclesOfClient(client)}
                >
                  <VehicleCar size={24} />
                </span>
              </Td>
            </tr>
          )}
        </tbody>
        {visibleFooter &&
          <tfoot>
            <tr>
              <td colSpan={3}>
                <div>
                  <ButtonScroolTo
                    title="Ir para o final da tabela"
                    onClick={scrollToBottom}
                  >
                    <DownArrow />
                  </ButtonScroolTo>
                  <ButtonLoadMore
                    onClick={loadMoreClients}
                    title="Carregar mais clientes"
                  >
                    Carregar mais clientes
                  </ButtonLoadMore>
                  <ButtonScroolTo
                    title='Ir para o começo da tabela'
                    onClick={scrollToTop}
                  >
                    <UpArrow />
                  </ButtonScroolTo>
                </div>
              </td>
            </tr>
          </tfoot>
        }
      </Table>
      {showPhones &&
        <Z20>
          <PhoneForm
            onClose={() => {
              clear()
              setShowPhones(false)
            }}
          />
        </Z20>
      }
      {showAddressForm &&
        <Z20>
          <AddressForm
            clientName={client?.name}
            clientId={client?.id + ''}
            closeFn={() => {
              clear()
              setShowAddressForm(false)
            }}
          />
        </Z20>
      }
      {showVehicles && client &&
        <Z20>
          <VehiclesOfClient
            onClose={() => {
              clear()
              setShowVehicles(false)
            }}
          />
        </Z20>
      }
    </>
  )
}
