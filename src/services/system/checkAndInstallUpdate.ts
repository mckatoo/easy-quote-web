import isElectron from "./isElectron"

export default async () => {
    isElectron() && await window.electron_ipc.check_install_update()
}