# Msgs 消息结构

Message 用来封装在交易结构中，表示不同的交易类型。一笔交易中，可包含多个Msgs。

Message的定义位于各个模块的```types/msgs.go```中，比如转账的```Message``` [定义](https://github.com/Dipper-Labs/Dipper-Protocol/blob/master/app/v0/bank/internal/types/msgs.go#L17)

```go
// MsgSend - high level transaction of the coin module
type MsgSend struct {
    FromAddress sdk.AccAddress `json:"from_address" yaml:"from_address"`
    ToAddress   sdk.AccAddress `json:"to_address" yaml:"to_address"`
    Amount      sdk.Coins      `json:"amount" yaml:"amount"`
}
```

## 已定义Msgs类型示例

### 转帐

```json
{
  "type": "dip/MsgSend",
  "value": {
    "from_address": "dip1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4",
    "to_address": "dip1s260x9plzxxxp6c0g2zs2pfc9q65947kj0a5lq",
    "amount": [
      {
        "denom": "pdip",
        "amount": "2000000000000000"
      }
    ]
  }
}
```

### 创建验证人

```json
{
    "type": "dip/MsgCreateValidator",
    "value": {
        "description": {
            "moniker": "lucy",
            "identity": "",
            "website": "",
            "details": ""
        },
        "commission": {
            "rate": "0.100000000000000000",
            "max_rate": "0.200000000000000000",
            "max_change_rate": "0.010000000000000000"
        },
        "min_self_delegation": "100",
        "delegator_address": "dip1sdh9efnf2tjcatcytcrllexsrmwze4acwh8ulr",
        "validator_address": "dipvaloper1sdh9efnf2tjcatcytcrllexsrmwze4ac4knwv0",
        "pubkey": "dipvalconspub1zcjduepq7furf7y824vpxlu6jhd4d9u35hwax70pef99d8kleuutn662htlsrfw0rg",
        "value": {
            "denom": "pdip",
            "amount": "10000000000000000"
        }
    }
}
```

### 更新验证人

```json
{
  "type": "dip/MsgEditValidator",
  "value": {
    "Description": {
      "moniker": "moniker",
      "identity": "[do-not-modify]",
      "website": "http://www.website.com",
      "details": "validator details"
    },
    "address": "dipvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2",
    "commission_rate": null,
    "min_self_delegation": null
  }
}
```

### 合约交易

```json
{
  "type": "dip/MsgContract",
  "value": {
    "from": "dip1s260x9plzxxxp6c0g2zs2pfc9q65947kj0a5lq",
    "to": "dip10zw6tps30qqy809a9e9rch5nzvfq3sdcgrg3r7",
    "payload": "5fb8c733123456781234567812345678123456781234567812345678123456781234567800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a",
    "amount": {
      "denom": "pdip",
      "amount": "100000000000000"
    }
  }
}
```

### 抵押/委托

```json
{
  "type": "dip/MsgDelegate",
  "value": {
    "delegator_address": "dip13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
    "validator_address": "dipvaloper1ngm3k874204rwz23m46wqhlv8w9vyjtd9yqm7x",
    "amount": {
      "denom": "pdip",
      "amount": "200000000000"
    }
  }
}
```

### 解除抵押/解除委托

```json
{
  "type": "dip/MsgUndelegate",
  "value": {
    "delegator_address": "dip13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e",
    "validator_address": "dipvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4",
    "amount": {
      "denom": "pdip",
      "amount": "100"
    }
  }
}
```

### 取回收益

```json
{
  "type": "dip/MsgWithdrawDelegationReward",
  "value": {
    "delegator_address": "dip17kfmq49p6vth0y83t4dwlpurdy70wgampcevhx",
    "validator_address": "dipvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2"
  }
}
```

### 验证人取回佣金

```json
{
  "type": "dip/MsgWithdrawValidatorCommission",
  "value": {
    "validator_address": "dipvaloper17kfmq49p6vth0y83t4dwlpurdy70wgam6ed7y2"
  }
}
```

### 发起提案

```json
{
  "type": "dip/MsgSubmitProposal",
  "value": {
    "content": {
      "type": "dip/ParameterChangeProposal",
      "value": {
        "title": "Slashing Params Change",
        "description": "Update signed_blocks_window",
        "changes": [
          {
            "subspace": "slashing",
            "key": "signed_blocks_window",
            "value": "5000"
          }
        ]
      }
    },
    "initial_deposit": [],
    "proposer": "dip13dwwe6pv92ve9uy8k2u7006a9fd9jwc6gzqx0e"
  }
}
```

### 验证人解除禁闭

```json
{
  "type": "dip/MsgUnjail",
  "value": {
    "address": "dipvaloper13dwwe6pv92ve9uy8k2u7006a9fd9jwc6nr55u4"
  }
}
```
