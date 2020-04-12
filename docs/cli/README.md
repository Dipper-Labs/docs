# 转账

## * 查询转账前余额

```bash
dipcli query account dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
```

response:

```json
{
  "type": "dip/Account",
  "value": {
    "address": "dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "pdip",
        "amount": "100000000"
      }
    ],
    "public_key": null,
    "account_number": "1",
    "sequence": "0"
  }
}

```bash
dipcli query account dip19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
```

帐户不存在：
```json
ERROR: {"codespace":"sdk","code":9,"message":"account dip19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 does not exist"}
```

## * 转账

```bash
dipcli send --from dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm --to dip19gs3mav6jtln6clwfneg296shz09xtcun2pjw7 --amount 10pdip

或者
dipcli send --from $(dipcli keys show alice -a) --to $(dipcli keys show jackson -a) --amount 10pdip
```

## * 查询转账后余额

```bash
dipcli query account dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm
或者
dipcli query account $(dipcli keys show alice -a)


{
  "type": "dip/Account",
  "value": {
    "address": "dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
    "coins": [
      {
        "denom": "pdip",
        "amount": "99999990"
      }
    ],
    "public_key": {
      "type": "tendermint/PubKeySecp256k1",
      "value": "A3MzhC3AHSdUw1UyNLLnrXcpvaAT+yNKOGbAjOvlZ8B5"
    },
    "account_number": "1",
    "sequence": "1"
  }
}

dipcli query account dip19gs3mav6jtln6clwfneg296shz09xtcun2pjw7
或者
dipcli query account $(dipcli keys show jackson -a)

{
  "type": "dip/Account",
  "value": {
    "address": "dip19gs3mav6jtln6clwfneg296shz09xtcun2pjw7",
    "coins": [
      {
        "denom": "pdip",
        "amount": "10"
      }
    ],
    "public_key": null,
    "account_number": "8",
    "sequence": "0"
  }
}
```
