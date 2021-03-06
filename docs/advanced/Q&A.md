# 常见问题

## 概念

### 验证人

DipperNetwork区块链网络需要一组验证人来维护网络的安全。 验证人的主要作用是通过参与网络共识，收集网络中的交易并打包新区块，以获得网络出块激励。
此外，验证人还将通过提案投票的形式参与链上治理，节点的投票权取决于其总质押token数量。

如何创建验证人，点击[这里](../get-started/how-to-become-validator.md)

### 质押

DipperNetwork区块链网络是基于BPoS共识算法的，网络中验证人的投票权取决于其总质押的token数量。 验证人可以将自身的token委托给自己，用户可将自已钱包的token委托给指定的验证人，也可以自己创建一个验证人然后委托给自己。

如何质押，点击[这里](../get-started/how-to-delegate.md)

### 交易手续费

DipperNetwork 网络中发起交易，需要支付一定的交易手续费。

交易手续费 = Gas * GasPrice，其中Gas表示交易实际消耗的Gas数量, GasPrice为单位Gas价格。 一笔交易实际需要的Gas数量，代表了网络执行该交易时需要的资源多少，主要指计算、存储操作消耗。 GasPrice由用户指定，并且验证人节点可以自主配置其能接受的minimum-gas-prices(默认为1000.0pdip)。

在使用```dipcli```命令行工具发送交易时，可使用```--gas```指定交易的gas limit，如果交易执行实际消耗超过用户指定的gas limit，则交易失败，手续费不返还； 如果交易执行实际消耗未超过用户指定的gas limit，则剩余的gas会返还。 可使用```--gas-prices```指定交易的GasPrice，如果GasPrice低于网络中验证人所能接受的minimus-gas-prices，则交易会被丢弃，不被转发/打包。

如果不想通过```--gas```指定交易的gas limit，可通过```--gas auto``` 自动指定，dipcli会预估交易gas；通常情况下，交易实际消耗的gas会大于预估，为了避免out of gas，建议同时带上```--gas-adjustment```参数，建议```--gas-adjustment=1.5```。

请注意：在设定```--gas-prices```时，请至少带一位小数，最多12位小数（如1000.0、1100.0）。输入整数是无效的。

如何发起一笔交易？点击[这里](../software/dipcli.md#交易)

### 关于DIP token

DIP 是DipperNetwork网络中的token，最小单位为pdip， 换算关系如下：

```javascript
    1 DIP = 10^12 pdip
```

## 节点运维

### 如何停止节点程序

停止后台程序，可执行如下命令：

```bash
# 停止dipd
kill -9 $(pgrep dipd)

# 停止 dipcli
kill -9 $(pgrep dipcli)
```

### 如何重启节点程序

重启节点，可执行如下命令：

```bash
kill -9 $(pgrep dipd)
kill -9 $(pgrep dipcli)

nohup dipd start 1>dipd.out 2>&1 &
nohup dipcli rest-server 1>cli.out 2>&1 &
```

### 如何备份验证人节点

建议备份<your_custom_path>/.dipd/config目录，其中config目录下的priv_validator_key.json 为验证人节点私钥。 请妥善保安验证人节点私钥，丢失后将无法恢复。

### 私链启动失败

本地搭建私有链，执行```dipd start```失败，控制台显示

```javascript
ERROR: error during handshake: error on replay: validator set is nil in genesis and still empty after InitChain
```

解决方法：确保创建初始验证人时，保证抵押 >= 1 DIP (即10^12 pdip)