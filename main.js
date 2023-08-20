const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const mainHandler = require("./electron/mainHandler");
const createMenu = require("./electron/mainMenu");
const createTray = require("./electron/mainTray");

let mainWin = null;
let openDevTools = 0; // 打开开发者工具
const ICON = nativeImage.createFromPath(path.resolve(__dirname, "./electron/icon.ico"));

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "./public/preload.js"),
        },
        // frame: false, // 无边框窗口 也会隐藏标题栏
        // titleBarStyle: "hidden", // 隐藏标题栏
        // transparent: true, // 透明的窗口 最大化按钮会失效
        // show: false, // 隐藏窗口 一般配合ready-to-show事件使用
        backgroundColor: "#fff",
        icon: ICON,
    });
    mainWin = win;

    // 主进程事件监听
    mainHandler(win);

    win.loadFile("./public/index.html");

    // win.once("ready-to-show", () => {
    //     win.show();
    // });

    //
    const contents = win.webContents;
    if (openDevTools) {
        contents.openDevTools(); // 开发者工具
    }

    // win.setIgnoreMouseEvents(true); // 点击穿透

    win.on("close", (e) => {
        console.log("win close");
        e.preventDefault();
        win.hide();
    });
};

app.whenReady().then(() => {
    createWindow();

    // 顶部主菜单
    createMenu(mainWin);
    // 托盘图标
    createTray(mainWin);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    console.log(`window-all-closed`);
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("before-quit", (e) => {
    console.log(`app before-quit`);
});
app.on("will-quit", (e) => {
    console.log(`app will-quit`);
});
