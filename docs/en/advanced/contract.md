# Smart Contract Tutorial
This tutorial contains operations related to smart contracts. You need to run a test network node or private chain locally first.
Configure development environment and dependencies, refer to [here](../software/how-to-install.md)
## Source code compilation

```bash
git clone https://github.com/DipperNetwork/DipperNetwork-chain.git

cd DipperNetwork-chain && git checkout testnet

make install
```

## Initialize local private chain

### Initialization

```bash
# usage:
dipd init <local-node-name> --chain-id <chain-id>
```

::: warning <font color=red>WARNING</font>

If errors happen when you execute the `dipd init`, it means that you have run the dipd program before. You can back up the previous data and then re-initialize the local private chain.
```mv ~/.dipd ~/.dipd.bakup```
:::

### Create wallet address

```bash
# Copy the `Address` output here and save it for later use 
dipcli keys add jack

# Copy the `Address` output here and save it for later use
dipcli keys add alice
```

### Add wallet address to genesis file and initialize balance

```bash
# Add both accounts, with coins to the genesis file
dipd add-genesis-account $(dipcli keys show jack -a) 100000000000000000000pdip
dipd add-genesis-account $(dipcli keys show alice -a) 100000000000000000000pdip
```

### Create a validator

```bash
# create validator
dipd gentx \
  --amount 1000000000000pdip \
  --commission-rate "0.10" \
  --commission-max-rate "0.20" \
  --commission-max-change-rate "0.10" \
  --pubkey $(dipd tendermint show-validator) \
  --name alice


# collect gentx
dipd collect-gentxs
```

### Configure wallet on dipcli

```bash
# Configure your CLI to eliminate need for chain-id flag
dipcli config chain-id <chain-id>
dipcli config output json
dipcli config indent true
dipcli config trust-node true
```

### Startup local private chain
After completing the above configuration, execute the following command to start the local private chain.

```bash
dipd start --log_level "*:debug" --trace
```

## Create Smart Contract

### Writing smart contracts

Solidity can be used for Smart Contracts.

The following contract is an example:

```javascript
pragma solidity ^0.4.16;
contract token {
    mapping (address => uint256) public balances;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    function token() public {
        balances[msg.sender] = 10000000000000;
    }
    
    function transfer(address to, uint256 value) payable public returns (bool success) {
       require(balances[msg.sender] >= value);
       balances[msg.sender] -= value;
       balances[to] += value;
       emit Transfer(msg.sender, to, value);
       return true;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return balances[owner];
    }
}
```

After online compilation,you can use [remix](http://remix.ethereum.org/) to save the bytecode (the value corresponding to the object in the json structure without double quotes) and the abi file to a local file.
Assume that the local```./demo/demo.bc ``` is a bytecode file and```./demo/demo.abi ``` is an abi file.

Bytecode:

```javascript
608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029
```

abi:

```json
[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]
```

### Deploying smart contracts

```bash
dipcli vm create --code_file=./demo/demo.bc \
--from $(dipcli keys show -a alice) --amount=0pdip \
--gas=1000000
```

Parameters explanations:

```--code_file```  The path of bytecode file.

```--amount``` Tndicates the amount of assets sent to the contract. Since the constructor of the example contract does not have a payable modifier, it can only enter 0pdip.

```--gas``` Set the gas limit for this transaction. The default value of dipcli is 100,000. The gas consumed in creating a contract is relatively large. You need to set a larger value.

After the transaction is broadcast, the terminal responds as follows:

```json
{
  "height": "0",
  "txhash": "C991A111B943E8C1D6BCA1F35A93BFC7F268C963F0B286340AF647D228FBCB01",
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

The ```txhash``` is the transaction hash. You can query whether the transaction was successful and the newly created contract address according to the ```txhash``` returned.

```bash
dipcli query tx <txhash>
```

If the returned result contains```"success":true```, the transaction was successful; otherwise, there will be error details showing in the raw_log field.

In the transaction details, the events structure contains the newly created contract address:

```json
 "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "contract"
        },
        {
          "key": "module",
          "value": "vm"
        }
      ]
    },
    {
      "type": "new_contract",
      "attributes": [
        {
          "key": "address",
          "value": "dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc"
        }
      ]
    }
  ],
```

As it mentioned above,```dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc``` is the newly deployed contract address.

According to the above-mentioned contract address, the contract code on the blockchain can be queried.

```bash
dipcli query vm code dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## How to call smart contract

To call a smart contract, you need to use an abi file. It is assumed that the abi file corresponding to the contract has been saved to ```./demo/demo.abi```

```bash
dipcli vm call --from $(dipcli keys show -a alice) \
--contract_addr dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc \
--method transfer  \
--args  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002" \
--amount 1000000pdip \
--abi_file ./demo/demo.abi
```

Parameters Explanations:

```--contract_addr``` Specifies the contract address to be called.

```--abi_file``` Specifies the path of the abi file corresponding to the contract.

```--method``` Specifies the method of the contract.

```--args``` Specifies the parameters corresponding to the contract method.

```--amount``` Specifies the number of assets sent to the contract.

```--from``` Specifies the originating account for this call.

The above example calls the contract's ```transfer``` method, which is declared as follows
```javascript
function transfer(address to, uint256 value) public returns (bool success)
```

The ```transfer``` method requires 2 parameters, which are the receiver's address and the number of assets to transfer. In the example, the receiving address is composed of 0 and the number of transfers is 2. The two parameters are converted into hexadecimal and they are filled to 32 bytes. as follows:
```javascript
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
```

 
Check the contract account balance:
```bash
dipcli query account dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## Call contract method, query contract status

Querying contract status requires the use of abi files. It is assumed that the abi file corresponding to the contract has been saved to ```./demo/demo.abi```

In the contract example, ```balanceOf``` is a read-only method. You can query the status of the specified address in the contract according to this method.
```bash
# Call the contract's balanceOf method,
dipcli query vm call $(dipcli keys show -a alice) dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf "0000000000000000000000000000000000000000000000000000000000000000" 0pdip ./demo/demo.abi
```

Query the status of the alice account in the contract:

```bash
# Use dipcli to first convert the address of alice to hexadecimal
dipcli keys parse $(dipcli keys show -a alice)

# Fill up to 32 bytes, for example:
 0000000000000000000000008a68bdace7153f631c35a5d9eec55e9e1eb0c85f

# Use dipcli to query the status
dipcli query vm call $(dipcli keys show -a alice) dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf "0000000000000000000000008a68bdace7153f631c35a5d9eec55e9e1eb0c85f" 0pdip ./demo/demo.abi
```

You can call the contract by the ```query``` method on ```dipcli```, and only the status can be queried, It will not create Tx on chain. You can also use this method of dipcli to construct the payload field for contract-related REST APIs.

## Smart contract related API

Smart contract-related APIs include querying contract codes, estimating transaction gas, and calling contract methods.

Refer to [here](./api.md#Smart-Contract-API)