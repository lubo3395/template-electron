const path = require("path");

const ICON = path.resolve(__dirname, "./electron/icon.ico");

module.exports = {
    packagerConfig: {
        name: "ElectronApp",
        asar: true,
        icon: ICON,
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                // 要用作应用程序图标的ICO文件的URL（显示在“控制面板”>“程序和功能”中）。
                // iconUrl: ICON,
                // 要用作生成的Setup.exe的图标的ICO文件
                // setupIcon: ICON,
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                // options: {
                //     icon: ICON,
                // },
            },
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
    ],
    // 设置打包输出位置 => /out/dist
    // buildIdentifier: "dist",
};
