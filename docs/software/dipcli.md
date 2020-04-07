# dipcli命令行工具

```dipcli```命令行工具，主要用来做key管理，向区块链网络发送交易和查询数据。

本文档只列出了一些常用的命令行，更多命令行使用，请通过```dipcli -h```查阅。

## 查询

### 查询节点状态

```bash
dipcli status
```

### 查询账户地址余额

```bash
dipcli query account [address]
```

### 根据txHash查询交易

```bash
dipcli query tx [hash]
```

### 查询验证人列表

```bash
dipcli query staking validators
```

### 查询IPAL列表

```bash
dipcli query ipal list
```

## 交易

### 转帐

```bash
dipcli send --from <key name> --to=<account address> --chain-id=<chain-id> --amount=<amount>pdip --gas=200000 --gas-prices=1000.0pdip
```

其中，如果转账不带```--gas-prices```参数，默认的gasprices就为1000.0pdip，如手动指定gasprices，需要带上至少一位小数（最多12位）

了解更多有关手续费的详情，[点击这里](../advanced/Q&A.md#交易手续费)

## 验证人相关

### 创建验证人

创建验证人，参考[这里](../get-started/how-to-become-validator.md)

### 修改验证人

修改验证人参数，包括佣金比率、验证人节点名称、网站和描述信息等。

```
Usage:
dipcli tx staking edit-validator [flags]

Example:
dipcli tx staking edit-validator \
--commission-rate=<commission-rate> \
--identity=<identity> \
--moniker=<moniker> \
--node=<node public ip> \
--website=<webisite> \
--details=<details> 
```

### 向验证人委托

```bash
Usage:
dipcli tx staking delegate [validator-addr] [amount] [flags]

Example:
$ dipcli tx staking delegate dipvaloper1l2rsakp388kuv9k8qzq6lrm9taddae7fpx59wm <amount>pdip --from <mykey> --gas=200000 --gas-prices=1000.0pdip
```

### 解委托

即取回委托，从验证人中解委托一定数量的shares

```bash
Usage:
dipcli tx staking unbond [validator-addr] [amount] [flags]

Example:
$ dipcli tx staking unbond dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj 100pdip --from mykey

```

### 取回奖励

从指定验证人中取回奖励，如果是验证人本身，可同时取回佣金

```bash
Example:
$ dipcli tx distr withdraw-rewards dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey


# 验证人取回奖励和佣金
$ dipcli tx distr withdraw-rewards dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey --commission
```

### 取回所有奖励

```bash
Usage:
  dipcli tx distribution withdraw-all-rewards [flags]

Example:
$ dipcli tx distr withdraw-all-rewards --from mykey
```

### 解禁验证人

验证人离线被禁闭后，可通过```unjail```命令解禁，重新上线

```bash
Usage:
dipcli tx slashing unjail [flags]

Example:
$ <appcli> tx slashing unjail --from mykey
```

## 钱包key管理

### 创建新地址

本地创建一个新地址，其中私钥加密保存

```bash
dipcli keys add <name> [flags]
```

### 查看本地key

查看本地所有的key

```bash
dipcli keys list
```

### 查看单个key信息

```bash
dipcli keys show <name> [flags]
```

### key导出

```bash
dipcli keys export <name> [flags]
```

### key导入

```bash
dipcli keys import <name> <keyfile> [flags]
```
