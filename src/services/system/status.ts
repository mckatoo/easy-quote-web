import api from "../service/api";

export async function getApiVersion() {
  try {
    const response = await api({
      endpoint: '/',
      method: 'GET',
    })
    if (response.status === 404) throw new Error("Locate not found");
    if (response.status !== 200) throw new Error("Unknown error");

    const { version } = await response.json()
    return {
      status: response.status,
      body: { version }
    }
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getAppVersion() {
  if (!!window.electron_ipc) {
    const version = await window.electron_ipc.app.get_version()
    return version;
  }
  return 'unknown';
}
