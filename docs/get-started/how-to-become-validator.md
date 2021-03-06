# 如何运行一个验证人

DipperNetwork区块链网络需要一组验证人来维护网络的安全。 验证人的主要作用是通过参与网络共识，收集网络中的交易并打包新区块，以获得网络出块激励。
此外，验证人还将通过提案投票的形式参与链上治理，节点的投票权取决于其总魅力押token数量。

验证人节点的抵押分2部分：自身抵押 和 用户抵押， 其中 自身抵押:用户抵押 比例不能小于 1/20。（如一个验证人自身抵押20DIP，用户最多可向其抵押380DIP，总抵押量不可超过400DIP）

验证人离线不能正常工作，或者参与恶意投票，将会受到对应的惩罚。（验证人会被强制离线，同时所抵押的DIP部分会被Slash）

## 1. 安装并部署全节点

请首先按照[教程](./how-to-join-mainnet.md)，部署主网全节点，并且确保同步到了最新区块高度。

## 2. 设置dipcli环境变量

``` bash
dipcli config chain-id dipperhub
dipcli config output json
dipcli config indent true
dipcli config trust-node true
```

## 3.创建账号

```bash
# 示例 <> 中的内容需要根据情况替换，后面不再提示

dipcli keys add <key_name>
# 按照提示输入加密账号用的密码(后续执行各种交易都需要用该密码)，将命令返回的信息谨慎保存
```

## 4. 检查节点同步情况

只有当节点同步到最新区块后，才可能执行下一步操作，创建验证人。

执行如下命令，查看节点同步情况：
```bash
dipcli status | grep catching_up
```

如果返回```"catching_up": false```，表明已经同步到最新。

## 5.创建验证人

```bash
dipcli tx staking create-validator \
  --amount=10000000000pdip \
  --pubkey=$(dipd tendermint show-validator -o text) \
  --moniker=<validator_name> \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=$(dipcli keys show -a <key_name>) \
  --ip=<node_public_ip> \
  --node-id=<node ID> \
  --website=<validator website> \
  --details=<validator details> \
  --gas=200000

 e.g
dipcli tx staking create-validator \
  --amount=10000000000pdip \
  --pubkey=$(dipd tendermint show-validator -o text) \
  --moniker=DipperNetwork \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="100" \
  --from=DipperNetwork \
  --ip=xx.xx.xx.xx \
  --node-id=$(dipd tendermint show-node-id) \
  --website="http://www.dippernetwork.com" \
  --details="validator details xxx" \
  --gas=200000
```

```--moniker```：验证人节点名称

```--amount```：初始抵押token数量, 其中 ```1 dip = 1000 000 000 000 pdip```， 1 dip为 1个投票权(voting power)，抵押token数量至少需要 1 dip才能参与共识

```--commission-rate```：佣金提成的百分比，0.1即为10%。当别的用户委托DIP给验证人时，该委托部分所得奖励的10%归验证人所有

```--commission-max-rate```：佣金提成的上限

```commission-max-change-rate```：每次调整佣金百分比时的上限，比如，1%到2%，增长率100%，但反映到commission-rate上只有1个百分点

```--website```：验证人网站地址(可选)

```--details``` ：验证人详情描述(可选)

其中```--node-id```和```--ip```是可选参数， ```ip```是节点的外网ip地址，```node-id``` 可以通过命令行```dipd tendermint show-node-id```获得。 此2个参数，可公开一个可用的seed节点。

## 6.查询验证人列表

```bash
dipcli query staking validators

可以发现列表中新增加的验证人jackson

[
  {
    "operator_address": "dipvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "dipvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 0,
    "tokens": "10000",
    "delegator_shares": "10000000000.000000000000000000",
    "description": {
      "moniker": "jackson",
      "identity": "",
      "website": "",
      "details": ""
    },
    "unbonding_height": "0",
    "unbonding_time": "1970-01-01T00:00:00Z",
    "commission": {
      "commission_rates": {
        "rate": "0.100000000000000000",
        "max_rate": "0.200000000000000000",
        "max_change_rate": "0.010000000000000000"
      },
      "update_time": "2019-10-30T11:21:01.013731989Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "10000000000.000000000000000000"
  }
]

```

## 7.让刚创建的验证者出块

step5创建了验证人，此时其状态为0，0表示还没有绑定，因为没有抵押足够的pdip;（p表示pico 1p=10<sup>-12</sup>）
1000000000000pdip为1个voting power，voting power的最小单位为1，只有它>=1时候才能够变成绑定状态2，才能成为活跃验证者出块，因此至少还需要抵押990000000000pdip

可以用自己的账号给自己抵押，也可以让别的账号给自己的验证者抵押
如何用别的账号为自己抵押，[点击这里](../software/dipcli.md)

这里需要用到步骤4中jackson账号对应的验证人地址operator_address: dipvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e

### 7.1 如何查看operator_address

#### 方法1：通过区块链浏览器查看

#### 方法2：通过dipcli查看

执行以下命令
```
dipcli keys show <key-name> --bech val

e.g
dipcli keys show DipperNetwork --bech val
```
回传的"address"字段即为operator_address。

### 7.2 抵押990000000000pdip

```bash
dipcli tx staking delegate <address-validator-operator> 990000000000pdip --from=<key name> --gas=<gas>

e.g.:
dipcli tx staking delegate dipvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e 990000000000pdip --from=DipperNetwork --gas=200000 --gas-prices=1000.0pdip

```

其中，如果转账不带```--gas-prices```参数，默认的gasprices就为1000.0pdip，如手动指定gasprices，需要带上至少一位小数（最多12位）

了解更多有关手续费的详情，[点击这里](../advanced/Q&A.md)

## 8.再次确认验证人状态为活跃验证人

```bash
dipcli query staking validators

[
  {
    "operator_address": "dipvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "dipvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000000000.000000000000000000",
    "description": {
      "moniker": "jackson",
      "identity": "",
      "website": "",
      "details": ""
    },
    "unbonding_height": "0",
    "unbonding_time": "1970-01-01T00:00:00Z",
    "commission": {
      "commission_rates": {
        "rate": "0.100000000000000000",
        "max_rate": "0.200000000000000000",
        "max_change_rate": "0.010000000000000000"
      },
      "update_time": "2019-10-30T11:21:01.013731989Z"
    },
    "min_self_delegation": "100",
    "self_delegation": "510000000000.000000000000000000"
  },
  {
    "operator_address": "dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "consensus_pubkey": "dipvalconspub1zcjduepq3zr5cyenfyz8qprts7344nl8gclm3st669hyrhgy9gae7l8ajuus5uttte",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
    "description": {
      "moniker": "local-dip",
      "identity": "",
      "website": "",
      "details": ""
    },
    "unbonding_height": "0",
    "unbonding_time": "1970-01-01T00:00:00Z",
    "commission": {
      "commission_rates": {
        "rate": "0.100000000000000000",
        "max_rate": "0.200000000000000000",
        "max_change_rate": "0.100000000000000000"
      },
      "update_time": "2019-10-30T08:10:34.407927185Z"
    },
    "min_self_delegation": "1",
    "self_delegation": "1000000.000000000000000000"
  }
]

# 可以看到新增加验证人jackson的status变成2，成为活跃验证人，可通过区块浏览器查看出块情况
```
## 9. 如何解绑
委托给验证的人token, 可以通过```unbond``` 命令可以取回

```
dipcli tx staking unbond <validator-addr> <amountToUnbond> --from <mykey> --gas <gasPrice> --gas-prices <gasPrice>

e.g.
dipcli tx staking unbond dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj 10000000000000pdip --from DipperNetwork --gas=200000 --gas-prices=1000.0pdip
```

请注意```validator-addr```是验证人的operator_address.  更多关于验证人解绑、取回奖励和佣金，点击[这里](../software/dipcli.md#解委托)


## 10. 关于验证人出块奖励和离线惩罚

验证人长期在线并参与网络共识，会得到对应比例的奖励。出块奖励取决于网络每年的通胀系统和当前验证人总质押toke的比重。


针对活跃验证人异常行为，区块链网络会将其设置为jail状态，并削减一定比例的质押token。异常行为主要有2种：

#### 1. 长时间不参与网络共识

在固定时间窗口```signed_blocks_window```内，验证人的缺块数目比例大于```min_signed_per_window```，则以```slash_fraction_downtime```比例惩罚验证人的绑定的token,并将其置为jail状态。直到jail时间超过```downtime_jail_duration```，才能通过unjail命令解除jail。

默认参数如下:

```
signed_blocks_window: 34560
min_signed_per_window: 70%
slash_fraction_downtime: 0.03%
downtime_jail_duration: 36小时
```

#### 2. 恶意投票

共识过程中发起相互矛盾的投票, 即验证人对同一高度同一Round区块进行不同签名。

双签的惩罚默认参数:

```
slash_fraction_double_sign: 1%
```

## 更多资源

* 部署节点监控工具，点击[这里](../software/monitor.md)
* 查看常见问题，点击[这里](../advanced/Q&A.md)
* 测试区块浏览器地址： <https://explorer.dippernetwork.com>
* 申请测试token，点击[这里](testcoin.md)