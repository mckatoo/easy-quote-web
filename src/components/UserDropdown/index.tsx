import { useState } from 'react';
import { Button, Item, Wrapper, WrapperList } from './styled';

type UserDropdownProps = {
  username: string
  logout?: () => void
}

export const UserDropdown = ({ username, logout }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Button $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{username}</span>
        <svg
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          strokeWidth="4.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </Button>
      {isOpen && (
        <WrapperList>
          <ul>
            <Item>
              Perfil
            </Item>
            <Item
              onClick={logout}
            >
              Sair
            </Item>
          </ul>
        </WrapperList>
      )}
    </Wrapper>
  );
};

