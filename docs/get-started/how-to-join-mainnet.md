# 如何加入主网

本文档介绍如何部署一个主网全节点。

## 1. 安装dip节点程序

当前最新主网版本为: **mainnet-v1.0.1**

* 如果你还没有安装dip节点程序，请点击[这里](../software/how-to-install.md)安装最新版本程序。

* 如果你已经安装过dip节点，确认程序已升级为[最新版本](./../software/how-to-install.md#最新版本)。执行如下命令，查看你的程序版本:

```bash
dipd version
dipcli version
```

## 2. 节点设置

初次部署节点程序，需要先初始化配置：

* **初始化节点配置**：

```bash
# 作法：
# dipd init <your_custom_name> --chain-id dipperhub
# 示例:
dipd init mynode --chain-id dipperhub
```

上述命令会初始化验证人和节点配置文件，默认的home目录为```~/```，如果需要设定home目录，可以带上```--home=<your_custom_path>```


* **下载主网genesis文件和配置文件**：

```bash
# 下载主网genesis文件
wget https://raw.githubusercontent.com/Dipper-Labs/mainnet/master/config/genesis.json -O  ~/.dipd/config/genesis.json
# 下载主网config文件
wget https://raw.githubusercontent.com/Dipper-Labs/mainnet/master/config/config.toml -O  ~/.dipd/config/config.toml
```

## 2. 启动节点，同步区块

```bash
# 后台运行dipd
nohup dipd start 1>dipd.out 2>&1 &
```

::: warning 提示
dipd start 默认日志级别是info， 如果需要查看debug日志，可以带上--log_level "*:debug"执行：

nohup dipd start --log_level "*:debug" 1>dipd.out 2>&1 &
:::

上述命令将dipd进程运行在后台 ，并将控制台输出重定向到dipd.out文件。

* 如果需要启动rest-server， 执行如下命令：

先设置一下dipcli环境

```bash
dipcli config chain-id dip-testnet
dipcli config output json
dipcli config indent true
dipcli config trust-node true
```

后台运行dipcli，开启rest server

```bash
nohup dipcli rest-server 1>cli.out 2>&1 &
```

关于```dipcli```客户端更多使用方法，参考[这里](../software/dipcli.md)

## 4. 查看节点同步状态

打开一个新的终端，查看节点状态：

```bash
curl http://127.0.0.1:26657/status
```

输出如下：

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "1bff9bb3c0adec73c13ee54041f69cf3baf7aaf0", //节点id
      "listen_addr": "tcp://0.0.0.0:26656", // 节点p2p连接监听地址
      "network": "dipperhub", //chain-id
      "version": "0.32.9",
      "channels": "4020212223303800",
      "moniker": "dip-official", // 节点名称
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": { //当前节点信息
      "latest_block_hash": "AF0EC818F18B263391266B452FE6C568CCFC3DF2FB918F1D5094A106D463AE06",
      "latest_app_hash": "527ECDCDC6B0C64A292190C40EDF703C337D13358673E743CF2F9ACC86133AEC",
      "latest_block_height": "7",// 当前节点同步到的最新区块高度 
      "latest_block_time": "2020-04-07T09:04:41.491430278Z",//最新区块时间
      "catching_up": false
    },
    "validator_info": {// 验证人信息
      "address": "781968683509187C056CFB7EBD2375C53102970E",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "q/himf30ufy1IObAytG9cK8xQ/ENXu9FhyP7mlSeWgM="
      },
      "voting_power": "1"
    }
  }
}
```

**检查是否同步完成**

当节点同步到的区块高度和区块浏览器上一致时，表示节点已经同步完成，此时一个全节点就部署完成了。

之后你可以使用dipcli的各项指令，点击[这里](../software/dipcli.md)

**全节点同步到最新区块高度后**，你可以开始创建主网验证人，点击[这里](./how-to-become-validator.md)

## 更多资源

* 部署节点监控工具，点击[这里](../software/monitor.md)
* 查看常见问题，点击[这里](../advanced/Q&A.md)
* 主网区块浏览器地址： <https://explorer.dippernetwork.com/>