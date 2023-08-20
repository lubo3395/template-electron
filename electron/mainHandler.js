const { app, ipcMain, dialog, shell } = require("electron");
const fs = require("fs");
const path = require("path");

module.exports = function handler(win) {
    // 在文件资源管理器中显示
    ipcMain.handle("open-in-explorer", (event) => {
        console.log(`\n\n ----- open-in-explorer ----- \n\n`);
        return new Promise((resolve) => {
            try {
                // 获取 Electron 应用的根目录，包括打包后的路径
                const appPath = app.isPackaged ? path.dirname(app.getPath("exe")) : __dirname;
                // 构建文件路径
                const dirPath = path.join(appPath, "downloaded_images");
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                shell.openPath(dirPath);
                resolve({ code: 0, appPath, dirPath, msg: "success" });
            } catch (error) {
                resolve({ code: 1, appPath, dirPath, error });
            }
        });
    });
    // 在默认浏览器中打开url
    ipcMain.handle("open-in-browser", async (event, url) => {
        console.log(`\n\n ----- open-in-browser ----- \n\n`);
        if (url) {
            return shell.openExternal(url);
        } else {
            return new Promise((resolve) => {
                resolve("缺少url");
            });
        }
    });
    // 选择文件夹路径
    ipcMain.handle("select-folder", async (event) => {
        console.log(`\n\n ----- select-folder ----- \n\n`);
        return new Promise((resolve) => {
            dialog
                .showOpenDialog({
                    // properties: ["openFile", "openDirectory"],
                    properties: ["openDirectory"],
                })
                .then((result) => {
                    console.log(result.filePaths);
                    resolve(result.filePaths);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(err);
                });
        });
    });
};
