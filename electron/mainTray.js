const { app, Tray, Menu, nativeImage, Notification } = require("electron");
const path = require("path");

let tray;

const NOTIFICATION_TITLE = "♥有新消息♥";
const NOTIFICATION_BODY = "Notification from the Main process";

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
}

function createTray(win) {
    const icon = nativeImage.createFromPath(path.resolve(__dirname, "./icon.ico"));
    tray = new Tray(icon);
    tray.on("click", function () {
        // showNotification();
    });
    tray.on("double-click", () => {
        win.show();
    });
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "显示/隐藏界面",
            click: () => {
                if (win.isVisible() && !win.isMinimized()) {
                    win.hide();
                } else {
                    win.show();
                }
            },
        },
        {
            label: "退出",
            click: () => {
                app.exit();
            },
        },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("Electron模板程序 - Power by lubo");
    tray.setTitle("Electron模板程序");
}
module.exports = createTray;
