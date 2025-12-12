import { useEffect, useState, type JSX } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Statusbar } from "../components/Statusbar";
import { useSettings } from "../hooks/use-settings";
import { AppWrapper, Main, MainWrapper, SidebarWrapper } from "./styles";

export const App = () => {
  const pageState = useState<JSX.Element>();
  const [currentPage, _] = pageState
  const { setSettings } = useSettings()

  async function loadSettings() {
    const settings = await window.electron_ipc.settings.get_all()
    !!settings && setSettings(settings)
  }

  useEffect(() => {
    loadSettings()
  }, []);

  return (
    <AppWrapper>
      <SidebarWrapper>
        <Sidebar pageState={pageState} defaultPage="Orçamentos" />
        <MainWrapper>
          <Navbar />
          <Main>
            {currentPage}
          </Main>
        </MainWrapper>
      </SidebarWrapper>
      <Statusbar />
    </AppWrapper>
  )
}
