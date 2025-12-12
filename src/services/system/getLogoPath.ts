import isElectron from "./isElectron"

export default async () => {
  const logoPath = isElectron()
    ? await window.electron_ipc.get_logo_path() 
    : new URL('./logo.svg', import.meta.url).href
  
  return logoPath
}