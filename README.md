# 整合MCL和Mirai-ts为一体的TS开发QQBot应用

## 使用指南

- win版
### 环境准备
| 环境      | 版本 |
|---------|----|
| Java    | 17 |
| Node.js | 18 |


### 使用教程
```shell
cd mcl

./mcl-installer-ae9f946-windows-x86.exe
```

确保插件没有漏的

| 插件列表 |
|------|
|[AutoMute-0.0.3.mirai2.jar](mcl%2Fplugins%2FAutoMute-0.0.3.mirai2.jar)|
|[fix-protocol-version-1.13.0.mirai2.jar](mcl%2Fplugins%2Ffix-protocol-version-1.13.0.mirai2.jar)|
|[mirai-api-http-2.9.1.mirai2.jar](mcl%2Fplugins%2Fmirai-api-http-2.9.1.mirai2.jar)|
|[mcl-addon-2.1.1.jar](mcl%2Fplugins%2Fmcl-addon-2.1.1.jar)|
|[mirai-login-solver-sakura-0.0.12.mirai2.jar](mcl%2Fplugins%2Fmirai-login-solver-sakura-0.0.12.mirai2.jar)|
修改[AutoLogin.yml](mcl%2Fconfig%2FConsole%2FAutoLogin.yml)(mcl/config/Console/AutoLogin.yml)
```yaml
accounts: 
  - # 账号, 现只支持 QQ 数字账号
    account: 1234567890
    password: 
      # 密码种类, 可选 PLAIN 或 MD5
      kind: PLAIN
      # 密码内容, PLAIN 时为密码文本, MD5 时为 16 进制
      value: 123123123
    # 账号配置. 可用配置列表 (注意大小写):
    # protocol: ANDROID_PHONE / ANDROID_PAD / ANDROID_WATCH / MACOS / IPAD
    # device: device.json
    # enable: true
    # heartbeatStrategy: STAT_HB / REGISTER / NONE
    configuration: 
      protocol: ANDROID_PAD # 目前仅可用
      device: device.json
      enable: true
      heartbeatStrategy: STAT_HB
```
修改api setting
```yaml
## 配置文件中的值，全为默认值

## 启用的 adapter, 内置有 http, ws, reverse-ws, webhook
adapters:
  - http
  - ws

## 是否开启认证流程, 若为 true 则建立连接时需要验证 verifyKey
## 建议公网连接时开启
enableVerify: true
verifyKey: 1234567890

## 开启一些调式信息
debug: false

## 是否开启单 session 模式, 若为 true，则自动创建 session 绑定 console 中登录的 bot
## 开启后，接口中任何 sessionKey 不需要传递参数
## 若 console 中有多个 bot 登录，则行为未定义
## 确保 console 中只有一个 bot 登陆时启用
singleMode: false

## 历史消息的缓存大小
## 同时，也是 http adapter 的消息队列容量
cacheSize: 4096

## adapter 的单独配置，键名与 adapters 项配置相同
adapterSettings:
  ## 详情看 http adapter 使用说明 配置
  http:
    host: localhost
    port: 8080
    cors: [*]

  ## 详情看 websocket adapter 使用说明 配置
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1

```

启动mcl
```shell
./mcl.cmd
```
### 前端步骤
安装依赖
```shell
npm install
```

```shell
npm run serve
```

