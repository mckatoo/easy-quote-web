import { useEffect, useState } from 'react';
import { ClientForm } from '../../components/ClientForm';
import { ClientList } from '../../components/ClientList';
import TextSearch from '../../components/TextSearch';
import { useClient } from '../../hooks/use-client';
import type { ClientResponse } from '../../services/client';
import { listClientsService } from '../../services/client/listClients';
import searchClientByName from '../../services/client/searchClientByName';
import { FormWrapper, ListWrapper, Main, SearchWrapper, Title, Wrapper, WrapperListWithSearch } from './styles';

export const ClientsPage = () => {
  const [clients, setClients] = useState<ClientResponse[]>([])
  const [showFooter, setShowFooter] = useState(true);
  const { setClient } = useClient()

  async function fetchClients(cursor?: number) {
    const { body } = await listClientsService({
      cursor: cursor || 0,
      take: 10
    })
    const moreClients: ClientResponse[] = body.map(client => ({
      ...client,
      addresses: [],
      phones: [],
      vehicles: []
    }))
    const updatedClients = !cursor ? moreClients : [...clients, ...moreClients]
    setClients(updatedClients)
    setShowFooter(updatedClients.length > 9 ? true : false)
  }
  function loadMoreClients() {
    const cursor = +clients[clients.length - 1]?.id || +clients[0]?.id
    fetchClients(cursor)
  }
  async function searchForName(name: string) {
    if (!name.length) {
      fetchClients()
      return
    }
    const { body } = await searchClientByName(name)
    const currentClients: ClientResponse[] = body.map(client => ({
      ...client,
      addresses: [],
      phones: [],
      vehicles: []
    }))
    setClients(currentClients)
    setShowFooter(false)
  }

  useEffect(() => {
    fetchClients()
  }, []);

  return (
    <Wrapper>
      <Title>
        Clientes
      </Title>

      <Main>
        <FormWrapper>
          <ClientForm
            onSaveClient={() => {
              fetchClients()
              setClient()
            }}
          />
        </FormWrapper>

        <WrapperListWithSearch>
          <SearchWrapper>
            <TextSearch
              title='Procurar por nome do cliente'
              placeholder='Procurar por cliente'
              name='nameForSearch'
              searchFunction={searchForName}
            />
          </SearchWrapper>
          <ListWrapper>
            <ClientList
              clients={clients}
              onDeleteClick={fetchClients}
              loadMoreClients={loadMoreClients}
              visibleFooter={showFooter}
            />
          </ListWrapper>
        </WrapperListWithSearch>
      </Main>
    </Wrapper >
  )
}
