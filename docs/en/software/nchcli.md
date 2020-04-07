# dipcli command line tool

The dipcli command line tool is mainly used for key management, sending transactions and querying data on the blockchain network.

## Query

### Query node status
```bash
dipcli status
```

### Query balances
```bash
dipcli query account [address]
```

### Query transactions by txHash
```bash
dipcli query tx [hash]
```

### Query validator lists
```bash
dipcli query staking validators
```

### Query IPAL Lists
```bash
dipcli query ipal list
```

## Transactions

### Transfer
```bash
dipcli send --from <key name> --to=<account address> --chain-id=<chain-id> --amount=<amount>pdip --gas=200000 --gas-prices=1000.0pdip

```

Tips: If the transfer does not include the `--gas-prices` parameter, the default gasprices is 1000.0pdip. If you manually specify the gasprices, you need to bring at least one decimal (up to 12 digits)

For more details on Tx fees, [click here](../advanced/Q&A.md)


## Validators

### Create a validator
How to Create a validator, refer to [here](../get-started/how-to-become-validator.md)

### Modify a validator

To change parameters of the validator. (e.g. Commission,moniker,website,detail,etc.)

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

### Delegate to validators
```bash
#Example:
dipcli tx staking delegate dipvaloper1l2rsakp388kuv9k8qzq6lrm9taddae7fpx59wm <amount>pdip --from <mykey> --gas=200000 --gas-prices=1000.0pdip

#Usage:
dipcli tx staking delegate [validator-addr] [amount] [flags]
```
### Withdraw your staking

Withdraw a part of shares you delegated to validators

```bash
#Usage:
dipcli tx staking unbond [validator-addr] [amount] [flags]

#Example:
dipcli tx staking unbond dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj 100pdip --from mykey
```

### WIthdraw your rewards

Withdraw your rewards from a specific validator. If you are a validator,you can withdraw both rewards and commissions.

```bash
#Example:
dipcli tx distr withdraw-rewards dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey


# Withdraw rewards and commissions If you are a validator
dipcli tx distr withdraw-rewards dipvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj --from mykey --commission
```

### Withdraw all rewards

```bash
#Usage:
dipcli tx distribution withdraw-all-rewards [flags]

#Example:
dipcli tx distr withdraw-all-rewards --from mykey
```

### Unjail the validator

You can unjail a validator with the command ``` unjail``` after the validator is jailed.

```bash
#Usage:
dipcli tx slashing unjail [flags]

#Example:
dipcli tx slashing unjail --from mykey
```

## Wallet key management

### Create a new address
```bash
dipcli keys add <name> [flags]
```

### List Keys

```bash
dipcli keys list
```

### Show key info

```bash
dipcli keys show <name> [flags]
```

### Export keys
```bash
dipcli keys export <name> [flags]
```

### Import keys
```bash
dipcli keys import <name> <keyfile> [flags]
```
