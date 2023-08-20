const { contextBridge, shell } = require("electron");
const { ipcRenderer } = require("electron/renderer");

const versions = {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
};

contextBridge.exposeInMainWorld("ipc", {
    versions,
    openInExplorer: () => ipcRenderer.invoke("open-in-explorer"),
    selectFolder: () => ipcRenderer.invoke("select-folder"),
    openInBrowser: (url) => ipcRenderer.invoke("open-in-browser", url),
});
