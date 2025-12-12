import { useEffect, useRef, useState } from 'react';
import { Import } from 'styled-icons/boxicons-regular';
import { DeleteForever } from 'styled-icons/material';
import { Table, Td, Th, Tr } from './styles';

export type Backup = {
  date: string
  path: string
}
type BackupListProps = {
  backups: Backup[]
  onDeleteClick?: (path: string) => void
  onRestoreClick?: (path: string) => void
}

export const BackupList = ({ onDeleteClick, backups, onRestoreClick }: BackupListProps) => {
  const tableRef = useRef<HTMLTableElement>(null)

  const [backupList, setBackupList] = useState<Backup[]>([]);

  useEffect(() => {
    setBackupList(backups)
  }, [backups]);

  function deleteBackup(path: string) {
    !!onDeleteClick && onDeleteClick(path)
  }
  function restoreBackup(path: string) {
    !!onRestoreClick && onRestoreClick(path)
  }

  return (
    <>
      <Table ref={tableRef}>
        <thead>
          <tr>
            <Th scope="col" $width='144px'>
              Data e Hora
            </Th>
            <Th scope="col">
              Caminho
            </Th>
            <Th scope="col" $center $width='96px'>
              <span>Apagar/Restaurar</span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {backupList.map((backup, index) =>
            <Tr key={index}>
              <Td scope="row">
                {backup.date}
              </Td>
              <Td title={backup.path} $withEllipsis>
                {backup.path}
              </Td>
              <Td>
                <span
                  onClick={() => deleteBackup(backup.path)}
                  title='Excluir Backup'>
                  <DeleteForever size={24} />
                </span>
                <span
                  title='Restaurar Backup'
                  onClick={() => restoreBackup(backup.path)}
                >
                  <Import size={24} />
                </span>
              </Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </>
  )
}
