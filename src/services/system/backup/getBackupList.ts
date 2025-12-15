import isElectron from "../isElectron"

export default async () => {
    const backupList = isElectron()
        ? await window.electron_ipc.get_backup_list()
        : localStorage.getItem('easy-quote-backup-list');

    return JSON.parse(JSON.stringify(backupList));
}