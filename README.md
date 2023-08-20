# Electron 项目模板

[Electron 官方文档](https://www.electronjs.org/zh/)

## 开发环境

推荐配置 electron 镜像源，可以解决国内下载 electron 和 electron-forge 缓慢的问题

**.npmrc**文件添加下面配置

```
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
//electron_mirror=https://npm.taobao.org/mirrors/electron/
```

> 文件一般位于
>
> ```
> C:\Users\用户名\.npmrc
> ```

参考官方文档：[安装指导 - 自定义镜像和缓存](https://www.electronjs.org/zh/docs/latest/tutorial/installation#自定义镜像和缓存)

## 克隆项目

```
git clone https://github.com/lubo3395/template-electron.git

cd template-electron
```

## 安装依赖

```
npm install
```

## 运行项目

```
npm start
```

## 打包项目

使用 Electron Forge 打包

1、导入项目到 Forge (若已执行过则可跳过，直接执行 make 打包)

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

2、创建可分发版本

```
npm run make
```
