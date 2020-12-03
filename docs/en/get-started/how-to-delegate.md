# How to delegate to a validator

It is assumed here that you have deployed and synchronized the nodes of the  testnet network.

How to join the testnet, click [here](how-to-join-testnet.md)。

## Create a new wallet

If you already have a wallet, you can skip this step

```bash
dipcli keys add jackson

override the existing name jackson [y/N]: y
Enter a passphrase to encrypt your key to disk:
Repeat the passphrase:
{
  "name": "jackson",
  "type": "local",
  "address": "dip1l3c8k72wwt5fps9fs7h4tfdz9352m6dlsspdh5",
  "pubkey": "dippub1addwnpepqt48jfuqrqy9n7d7vr6wvudq4nxrmupem8lw6t23k255j3mexgu0q3l6wuq",
  "mnemonic": "hair quantum left artwork save have egg runway spider virtual execute found seed link betray woman tongue check short load mutual razor dish asthma"
}
```

## Obtain test Token

Obtain test Token, refer to [here](./testcoin.md)

## delegation

### Query validator list

```bash
dipcli query staking validators

response:
[
  {
    "operator_address": "dipvaloper18q4pv9qvmqx7dcd2jq3dl3d0755urk8300709e",
    "consensus_pubkey": "dipvalconspub1zcjduepqua3tt6kl7v7sd558m24fj3s039fhmsxcv9fc49rqn0uwcuelvrmsdp3hwt",
    "jailed": false,
    "status": 2,
    "tokens": "1000000",
    "delegator_shares": "1000000.000000000000000000",
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
    "self_delegation": "510000.000000000000000000"
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
```

* You can also check the validator based on the address of the validator

```bash
# Query corresponding validator information according to operator_address(The address queried in this example is dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z)
# usage: dipcli query staking validator  <validatorAddress>
dipcli query staking validator dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z

response:
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
```

### Delegate to validator

```bash
# There are 2 types of commission: self-delegation and user delegation
# usage: dipcli tx staking delegate <validatorAddress> <amountToBond> --from <delegatorKeyName> 

# Use alice account
dipcli tx staking delegate dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z 6000000pdip --from  $(dipcli keys show alice -a)

response:
{
  "chain_id": "dip-devnet",
  "account_number": "1",
  "sequence": "3",
  "fee": {
    "amount": [],
    "gas": "200000"
  },
  "msgs": [
    {
      "type": "dip/MsgDelegate",
      "value": {
        "delegator_address": "dip13lmppkumkmf6699q4gpukg8fz5pf2lgzm8mfsm",
        "validator_address": "dipvaloper1l3c8k72wwt5fps9fs7h4tfdz9352m6dlt34lyc",
        "amount": {
          "denom": "pdip",
          "amount": "6000000"
        }
      }
    }
  ],
  "memo": ""
}

confirm transaction before signing and broadcasting [y/N]: y
Password to sign with 'alice':
{
  "height": "0",
  "txhash": "BB7078A2DF865971B701C4BC7D58BB3287F46870FA04883000ED45AC14590157",
  "raw_log": "[{\"msg_index\":0,\"success\":true,\"log\":\"\"}]",
  "logs": [
    {
      "msg_index": 0,
      "success": true,
      "log": ""
    }
  ]
}
```

### query delegation

```bash
# Check all delegations for account alice
usage: dipcli query staking delegations <delegatorAddress>
dipcli query staking delegations $(dipcli keys show alice -a) 

response:
[
  {
    "delegator_address": "dip133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w",
    "validator_address": "dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
    "shares": "13000000.000000000000000000",
    "balance": "13000000"
  }
]

# Query delegation between specific account and validator(The parameters are the address of the principal and the address of the validator)
# usage: dipcli query staking delegation  <delegatorAddress> <validatorAddress>
dipcli query staking delegation  $(dipcli keys show alice -a) dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z

response:
{
  "delegator_address": "dip133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w",
  "validator_address": "dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
  "shares": "13000000.000000000000000000",
  "balance": "13000000"
}

# uery the commission income of an account
# usage: dipcli query distribution rewards <delegatorAddress> 
dipcli query distribution rewards dip133vmttt6n49jac5zn3z0klcpe7m8qlugyggx5w

response:
{
  "rewards": [
    {
      "validator_address": "dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z",
      "reward": [
        {
          "denom": "pdip",
          "amount": "3022184400.676553570237000000"
        }
      ]
    }
  ],
  "total": [
    {
      "denom": "pdip",
      "amount": "3022184400.676553570237000000"
    }
  ]
}
```

### Unbond delegation

```bash
# usage: dipcli tx staking unbond <validator_address> 100pdip --from <mykey>
# Example:
dipcli tx staking unbond dipvaloper133vmttt6n49jac5zn3z0klcpe7m8qluglfu58z 100pdip --from alice

```

To learn more about unbond, withdraw rewards and commission, [click here](../software/dipcli.md##Validators).