
# API 参考

```dipcli``` 开启rest-server后，浏览器访问 ```http://127.0.0.1:1317/swagger-ui/``` 可以看到所有的REST APIs

```bash
# 开启 rest-server
dipcli rest-server --node=http://127.0.0.1:26657
```

## 常用 API

### 查询节点信息

request：

```bash
curl http://127.0.0.1:1317/node_info
```

response：

```json
{
  "node_info": {
    "protocol_version": {
      "p2p": "7",
      "block": "10",
      "app": "0"
    },
    "id": "32d9a41f23c27d7e7b51b6ab7f6d30ba53319e31",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "dip-chain",
    "version": "0.32.8",
    "channels": "4020212223303800",
    "moniker": "local-dip",
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://127.0.0.1:26657"
    }
  },
  "application_version": {
    "name": "dip",
    "server_name": "dipd",
    "client_name": "dipcli",
    "version": "1.0.11-192-gfa5a542",
    "commit": "fa5a542a4af5493d45c3934a3c6e8e41cb724c98",
    "build_tags": "netgo",
    "go": "go version go1.13.5 darwin/amd64"
  }
}
```

### 查询节点同步状态

request:

```bash
curl http://127.0.0.1:1317/syncing
```

response:

```json
{
  "syncing": false   // true表示节点正在追赶最新区块，false表示节点已经处于最新区块状态
}
```

### 获取最新区块

request:

```bash
curl http://rpc.dippernetwork.com/blocks/latest
```

response:

```json
{
  "block_meta": {
    "block_id": {
      "hash": "D1DCF02C7BEB781E532BF02E5964EB2B13FFF6C334DDD3FC9F0320CF5293DEFB",
      "parts": {
        "total": "1",
        "hash": "E7233052B3DE6B99677FF48EC5B610D4D288ED5F65D2CFC14B96388441DA190D"
      }
    },
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "dip-chain",
      "height": "964",
      "time": "2020-01-08T06:48:04.491292Z",
      "num_txs": "0",
      "total_txs": "6",
      "last_block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "last_commit_hash": "6991E025A3AF65D7D444E354EAA6AD6F2454E93D9D029602D659E15928BF11F5",
      "data_hash": "",
      "validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "next_validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "1146068A69F9F0FC77B2BDD121A445D25705059F2F8A68D4E4688B5B9D8D0AD9",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "dip-chain",
      "height": "964",
      "time": "2020-01-08T06:48:04.491292Z",
      "num_txs": "0",
      "total_txs": "6",
      "last_block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "last_commit_hash": "6991E025A3AF65D7D444E354EAA6AD6F2454E93D9D029602D659E15928BF11F5",
      "data_hash": "",
      "validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "next_validators_hash": "C414E30D196E83F711DCB8161748563A1D968EC51C48F3D20141D20FE3657788",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "1146068A69F9F0FC77B2BDD121A445D25705059F2F8A68D4E4688B5B9D8D0AD9",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE"
    },
    "data": {
      "txs": null
    },
    "evidence": {
      "evidence": null
    },
    "last_commit": {
      "block_id": {
        "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
        "parts": {
          "total": "1",
          "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
        }
      },
      "precommits": [
        {
          "type": 2,
          "height": "963",
          "round": "0",
          "block_id": {
            "hash": "787390598CF683E7B1AE1E438AAD286D436F52F06C79AC459C4375E6C14628BE",
            "parts": {
              "total": "1",
              "hash": "83E6CD2DB4FCE014E38CF1BEAA3746A2A7F9D92A8093BBD9B3FF14BB78A10E32"
            }
          },
          "timestamp": "2020-01-08T06:48:04.491292Z",
          "validator_address": "A8FDB9C6D29B83E04EF9990107799BB598DBF3EE",
          "validator_index": "0",
          "signature": "utrPds1hjv5VBpfJZzZu0B4Rmz44AnWLgI4X63slekly+Z+qwuziC//rmtIUvhDAsD4A1bfMN2EgjVk/wOv4Cg=="
        }
      ]
    }
  }
}
```

### 获取指定高度的区块

参数说明：
| 参数名称 | 类型 | 说明 |
| ------- | --- | --- |
| height | int | 指定区块高度 |

request:

```bash
curl http://rpc.dippernetwork.com/blocks/{height}
```

response 同上

### 获取最新的验证人集合

request:

```bash
curl http://127.0.0.1:1317/validatorsets/latest
```

response:

```json
{
  "height": "0",
  "result": {
    "block_height": "959100",
    "validators": [
      {
        "address": "dipvalcons1zu8m6mmt53n4pr5twwlmw2c5lasv9w5yqx3vvr",
        "pub_key": "dipvalconspub1zcjduepqdkjkn8kt4wtwd3j6mtl4rxxjp0al353hdrfne66rsmcpd2q837xq5nnfjp",
        "proposer_priority": "13325070",
        "voting_power": "10000000"
      },
      {
        "address": "dipvalcons1t5gu4fg6jm3zxr2ytw5k6azj3rflx399eztgv3",
        "pub_key": "dipvalconspub1zcjduepqmuwh6n4z00c30njm7935hwl3vqzrdkrzw48fjkdlhxgkhh4s6p8qupd7au",
        "proposer_priority": "5587140",
        "voting_power": "10"
      },
      {
        "address": "dipvalcons16qd3q96uzau9lzup9gtl0g5e3py8t5q0z0m4gr",
        "pub_key": "dipvalconspub1zcjduepqnnex0jl2whugnzmr84kytykykqjd0807ncjqdkqkhkkyr7g0e7fspcfqn6",
        "proposer_priority": "4114340",
        "voting_power": "9902960"
      },
      {
        "address": "dipvalcons1m88754ad97scehy6kkjqa5d6pws88fpxfegzft",
        "pub_key": "dipvalconspub1zcjduepq36m84fazfs0q8rc7mj4xy5zw7psmxtrefpagy40y0nmx45px98cqwchwh2",
        "proposer_priority": "-19693618",
        "voting_power": "5498351"
      },
      {
        "address": "dipvalcons1mf5czylhw3zcv4nhhnd0xrtwn2ah0mvasr4f0k",
        "pub_key": "dipvalconspub1zcjduepqjgta0rptwln6jz0rz4kw6cnhcm5g4wr9epm9spkcertkq5ty88nqe329lx",
        "proposer_priority": "-3332930",
        "voting_power": "10000000"
      }
    ]
  }
}
```

### 通过交易hash查询交易

request:

```bash
curl http://127.0.0.1:1317/txs/{txhash}
```

response:

```json
{
  "height": "959150",
  "txhash": "5E53D158DF0B117B2ED07211F8ADA27369A47C3341EF34B1F96070E0F681BF78",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ],
  "gas_wanted": "200000",
  "gas_used": "40551",
  "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "send"
        },
        {
          "key": "sender",
          "value": "dip1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4"
        },
        {
          "key": "module",
          "value": "bank"
        }
      ]
    },
    {
      "type": "transfer",
      "attributes": [
        {
          "key": "recipient",
          "value": "dip19vnsnnseazkyuxgkt0098gqgvfx0wxmv96479m"
        },
        {
          "key": "amount",
          "value": "20000000pdip"
        }
      ]
    }
  ],
  "tx": {
    "type": "dip/StdTx",
    "value": {
      "msg": [
        {
          "type": "dip/MsgSend",
          "value": {
            "from_address": "dip1qnazcenn7v5rdq02grglquc5kd3y4dh985rau4",
            "to_address": "dip19vnsnnseazkyuxgkt0098gqgvfx0wxmv96479m",
            "amount": [
              {
                "denom": "pdip",
                "amount": "20000000"
              }
            ]
          }
        }
      ],
      "fee": {
        "amount": [
          {
            "denom": "pdip",
            "amount": "200"
          }
        ],
        "gas": "200000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A41jr9C+YQtzn3YxgYcB6/V9SeViUSyg1SI7TMFV+cSJ"
          },
          "signature": "hmYV0VQy38yQ2odp83g7Zq+tMicvnYgP7Uy2SnXoUGd/iFugdMwSc5+azWkKkkVQxrWdBy0n8Bn3iAvc0bR/ig=="
        }
      ],
      "memo": "for test"
    }
  },
  "timestamp": "2020-01-08T07:00:45Z"
}
```

### 广播交易
  
```bash
curl -X POST "http://127.0.0.1:1317/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

## 合约相关API

### 查询合约代码

request:

```bash
curl http://localhost:1317/vm/code/dip19lhydp6k59c66x2vp3h4ua8r8535uh6dlmex6y
```

response:

```json
{
  "height": "1460",
  "result": "608060405234801561001057600080fd5b50600436106100a95760003560e01c80636b520757116100715780636b5207571461016e5780639cc7f7081461018c578063a17a9e66146101ce578063aef52a2c14610210578063cc445d4e1461022e578063dac0eb071461025c576100a9565b80631e1ed70b146100ae578063300308ba146100e65780633033413b146100f05780634903b0d11461010e5780635d33a27f14610150575b600080fd5b6100e4600480360360408110156100c457600080fd5b81019080803590602001909291908035906020019092919050505061028a565b005b6100ee6102a6565b005b6100f86102b0565b6040518082815260200191505060405180910390f35b61013a6004803603602081101561012457600080fd5b81019080803590602001909291905050506102b6565b6040518082815260200191505060405180910390f35b6101586102ce565b6040518082815260200191505060405180910390f35b6101766102d4565b6040518082815260200191505060405180910390f35b6101b8600480360360208110156101a257600080fd5b81019080803590602001909291905050506102dd565b6040518082815260200191505060405180910390f35b6101fa600480360360208110156101e457600080fd5b81019080803590602001909291905050506102fa565b6040518082815260200191505060405180910390f35b610218610315565b6040518082815260200191505060405180910390f35b61025a6004803603602081101561024457600080fd5b810190808035906020019092919050505061031b565b005b6102886004803603602081101561027257600080fd5b8101908080359060200190929190505050610329565b005b8060036000848152602001908152602001600020819055505050565b6064600081905550565b60005481565b60036020528060005260406000206000915090505481565b60015481565b60008054905090565b600060036000838152602001908152602001600020549050919050565b60008160008082825401925050819055506000549050919050565b60025481565b806001540160008190555050565b60016002540160028190555061033e816102fa565b6001600082825401925050819055505056fea26469706673582212207339ae9e785d6abe064a41bdebda6eb72d116c63a4382c77d452d75c3a7f4fa664736f6c63430006000033"
}
```

### 预估交易费用/调用合约方法

调用```estimate_gas``` API接口，可同时获取合约交易消耗的gas和合约方法的返回值，其中返回的gas只是预估值，真正发起链上记账时，建议适当上调，避免Out of Gas错误。

#### 创建合约

预估创建合约交易的gas，需要向接口post一个如下的结构体：

```json
{
	"from": "dip13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "",
	"payload": "608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029",
	"amount": {
		"denom": "pdip",
		"amount": "0"
	}
}
```

其中from为交易发起的合约地址，to为空, payload为合约代码的十六进制形式，amount为向合约发送的资产数量。

可通过```dipcli```构造payload，，如下构造一个创建合约的交易消息，不做签名

```bash
dipcli vm create --code_file=./demo/demo.bc \
--from $(dipcli keys show -a alice) --amount=0pdip \
--gas=1000000 --generate-only
```


request:

```bash
curl -X POST localhost:1317/vm/estimate_gas -d '
{
	"from": "dip13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "",
	"payload": "608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029",
	"amount": {
		"denom": "pdip",
		"amount": "0"
	}
}'
```

response:

```bash
{
  "height": "473",
  "result": {
    "Gas": "240517",
    "Res": "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029"
  }
}

# Gas为预估的费用
# Res为创建合约的返回值，即所部署的合约代码
```

#### 调用合约

调用合约的payload要根据调用方法的abi来构造，可参考代码 https://github.com/Dipper-Labs/Dipper-Protocol/blob/develop/modules/vm/client/cli/query.go 的GetCmdQueryCallFee函数

request:

```bash
curl -X POST localhost:1317/vm/estimate_gas -d '
{
	"from": "dip13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e",
	"to": "dip1k2npq7lgmha23wy7e2swu2hqwta3fpt6agk47h",
	"payload": "70a082310000000000000000000000000000000000000000000000000000000000000000",
	"amount": {
		"denom": "pdip",
		"amount": "1000000"
	}
}'
```

response:

```json
{
  "height": "298",
  "result": {
    "Gas": "14924",
    "Res": "0000000000000000000000000000000000000000000000000000000000000001"
  }
}

# Gas为预估的费用
# Res为调用方法的返回值
```

其中post_data及payload的生成 ，可以借助dipcli工具，参考[这里](./contract.md##调用智能合约)
