import isElectron from "../isElectron"

export default async (): Promise<CustomSettings> => {
    const settings = isElectron()
        ? await window.electron_ipc.settings.get_all()
        : localStorage.getItem('easy-quote-settings');
    
    return JSON.parse(JSON.stringify(settings));
}