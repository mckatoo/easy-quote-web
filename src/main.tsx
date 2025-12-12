import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BudgetProvider } from './hooks/use-budget/provider'
import { ClientProvider } from './hooks/use-client/provider'
import { SettingsProvider } from './hooks/use-settings/provider'
import { UpdatingProvider } from './hooks/use-updating/provider'
import { VehicleProvider } from './hooks/use-vehicle/provider'
import './index.css'
import { LogoVersionProvider } from './hooks/use-logoVersion/provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LogoVersionProvider>
      <SettingsProvider>
        <UpdatingProvider>
          <BudgetProvider>
            <VehicleProvider>
              <ClientProvider>
                <App />
              </ClientProvider>
            </VehicleProvider>
          </BudgetProvider>
        </UpdatingProvider>
      </SettingsProvider>
    </LogoVersionProvider>
  </StrictMode>,
)
