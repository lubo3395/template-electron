/*
 * 主菜单模块
 */

const { Menu, dialog } = require("electron");

const mainMenu = (win) => {
    return Menu.buildFromTemplate([
        {
            label: "运行",
            submenu: [
                {
                    label: "重新加载",
                    accelerator: "F5",
                    click: () => {
                        win.webContents.reload();
                    },
                },
            ],
        },
        {
            label: "编辑",
            submenu: [
                {
                    label: "撤销",
                    role: "undo",
                },
                {
                    label: "重做",
                    role: "redo",
                },
                {
                    label: "复制",
                    role: "copy",
                },
                {
                    label: "粘贴",
                    role: "paste",
                },
            ],
        },
        {
            label: "操作",
            submenu: [
                {
                    label: "DevTools",
                    role: "toggleDevTools",
                    accelerator: "F12",
                },
                {
                    label: "全屏切换",
                    role: "togglefullscreen",
                    accelerator: "F11",
                },
                {
                    label: "最小化",
                    role: "minimize",
                },
            ],
        },
        {
            label: "帮助",
            submenu: [
                {
                    label: "关于",
                    click: () => {
                        const answers = ["很好", "不错", "非常好"];
                        dialog
                            .showMessageBox({
                                title: "关于软件",
                                message: "软件改进意见",
                                detail: "给软件评分",
                                buttons: answers,
                            })
                            .then((result) => {
                                console.log(`用户选择了 ${answers[result.response]}`);
                            });
                    },
                    accelerator: "Shift+Alt+G",
                },
                {
                    label: "菜单1",
                    submenu: [
                        {
                            label: "子菜单1",
                        },
                    ],
                },
            ],
        },
    ]);
};

const createMenu = (win) => {
    Menu.setApplicationMenu(mainMenu(win));
};

module.exports = createMenu;
