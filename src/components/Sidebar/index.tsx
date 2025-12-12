import { useEffect, useState, type JSX, type ReactNode } from "react";
import { Report } from "styled-icons/boxicons-solid";
import { Person, Settings } from "styled-icons/ionicons-solid";
import { useBudget } from "../../hooks/use-budget";
import { useClient } from "../../hooks/use-client";
import { useVehicle } from "../../hooks/use-vehicle";
import { BudgetsPage } from "../../pages/Budgets";
import { ClientsPage } from "../../pages/Clients";
import { SettingsPage } from "../../pages/Settings";
import { Logo } from "../Logo";
import { Aside, Item, LogoWrapper, Ul, Wrapper } from "./styles";

export type SidebarItemType = {
  name: string
  icon: ReactNode
  page: JSX.Element
}

type SidebarProps = {
  pageState: [JSX.Element | undefined, React.Dispatch<React.SetStateAction<JSX.Element | undefined>>]
  defaultPage?: "Clientes" | "Orçamentos"
}

export const Sidebar = ({ pageState, defaultPage }: SidebarProps) => {
  const sideBarItems: SidebarItemType[] = [
    { name: "Clientes", icon: <Person />, page: <ClientsPage /> },
    { name: "Orçamentos", icon: <Report />, page: <BudgetsPage /> },
    { name: "Configurações", icon: <Settings />, page: <SettingsPage /> },
  ]
  const currentPage: SidebarItemType | undefined = sideBarItems.find(item => item.name === defaultPage)

  const [_, setCurrentPage] = pageState
  const [activeItem, setActiveItem] = useState<string>(currentPage?.name ?? sideBarItems[0].name);

  const { setBudget } = useBudget()
  const { setClient } = useClient()
  const { setVehicle } = useVehicle()

  async function load(page: JSX.Element) {
    setBudget()
    setClient()
    setVehicle()
    setCurrentPage(page)
  }

  useEffect(() => {
    load(currentPage?.page ?? sideBarItems[0].page)
  }, []);

  return (
    <Aside>
      <Wrapper>
        <LogoWrapper>
          <a href="https://lucar.com.br" target="_blank">
            <Logo />
          </a>
        </LogoWrapper>
        <Ul>
          {
            sideBarItems.map((item, key) => (
              <Item
                $active={activeItem === item.name}
                key={key}
                onClick={() => {
                  load(item.page)
                  setActiveItem(item.name)
                }}
              >
                <div>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Item >
            ))
          }
        </Ul>
      </Wrapper>
    </Aside >
  )
}
