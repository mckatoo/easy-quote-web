import { DeleteForever } from "styled-icons/material";
import type { Phone } from "../../services/phone";
import { Table, Td, Th } from "../TableStyles";

type PhoneListProps = {
  phones: Omit<Phone, 'client_id'>[] | string[]
  onDeletePhone?: (phoneID: string) => Promise<void>
}

export default ({ phones, onDeletePhone }: PhoneListProps) => (
  <Table id="phones-list">
    <thead>
      <tr>
        <Th scope="col">Telefone</Th>
        <Th scope="col" $size="48px" $center>
          <span className="sr-only">Delete</span>
        </Th>
      </tr>
    </thead>
    <tbody>
      {phones.map((phone, index) => {
        const number = typeof phone === 'string' ? phone : phone.number
        const id = typeof phone === 'string' ? phone + '' : phone.id + ''
        if (!number) return
        return <tr key={index}>
          <Td title={number}>
            {number}
          </Td>
          <Td>
            <span
              onClick={() => !!onDeletePhone && onDeletePhone(id)}
              title='Excluir'
            >
              <DeleteForever size={24} />
            </span>
          </Td>
        </tr>
      })}
    </tbody>
  </Table>
)