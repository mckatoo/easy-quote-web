import { useEffect, useState, type JSX } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Statusbar } from "../components/Statusbar";
import { useSettings } from "../hooks/use-settings";
import { AppWrapper, Main, MainWrapper, SidebarWrapper } from "./styles";
import getAllSettings from "../services/system/settings/getAllSettings";

export const App = () => {
  const pageState = useState<JSX.Element>();
  const [currentPage, _] = pageState
  const { setSettings } = useSettings()

  async function loadSettings() {
    const settings = await getAllSettings()
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
