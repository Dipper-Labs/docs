# Transaction Structure
A transaction on the DipperNetwork chain mainly includes type, msg, fee, signatures, and memo, of which type, fee, signatures, and memo are common to different transaction types, and the difference lies in the content of msg.
```json
{
	"type": "dip / StdTx", // transaction type, will be dip / StdTx
	"value": {// transaction value
	"msg": [], // msg array
	"fee": {}, // transaction fee
	"signatures": [], // transaction signature, one-to-one correspondence with msg
	"memo": "" // memo attached to the transaction
  }
}
```

For transaction fees, please refer to [here](./Q&A.md#Transaction-fees).


Structure of the transfer transaction:
```json
{
	"type": "dip / StdTx", // transaction type, will be dip / StdTx
	"value": {
		"msg": [{// msg structure of transfer
		"type": "dip / MsgSend", // msg type of transfer
		"value": {// msg value of the transfer
		"from_address": "dip13f5tmt88z5lkx8p45hv7a327nc0tpjzlwsq35e", // transferor's address
		"to_address": "dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm", // Transferee's address
		"amount": [{// number of assets to transfer
					"denom": "pdip",
					"amount": "1"
				}]
			}
		}],
		"fee": {// transaction fees
			"amount": [{
				"denom": "pdip",
				"amount": "1000000000"
			}],
			"gas": "100000" // maximum gas amount setted by the transaction
		},
		"signatures": [{// transaction signature
			"pub_key": {
				"type": "tendermint/PubKeySecp256k1",
				"value": "AjJLEV6oaYKEzpplQfoxeSo1YbVftXH6jTEqUTNv3gaj"
			},
			"signature": "fVKrW3Zo+YRSo4NjmpEXxBRGIgZErlFN5ZyTbRBfcwQPtu5t/NKqZaCcpkaDPS/V0SREmXU+Ce5i6bSYRR9ssA=="
		}],
		"memo": "" // memo attached to the transaction
	}
}
```

The DipperNetwork chain contains a variety of msg types. For details, please refer to the github source code. The definition of various msg structures is located in each msg.go file in the modules directory.