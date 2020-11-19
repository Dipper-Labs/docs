# 智能合约教程

本教程包含智能合约相关的操作，需要你先在本地跑一个测试网节点或者私链。

配置相关的开发环境和依赖，参考[这里](../software/how-to-install.md)。

## 源码编译

```bash
git clone https://github.com/Dipper-Labs/Dipper-Protocol.git
cd Dipper-Protocol && git checkout testnet-v4.0.1

make install
```

## 初始化本地私链

### 初始化

```bash
# usage:
dipd init <local-node-name> --chain-id <chain-id>

```

:::warning
如果执行```dipd init```出错，说明之前跑过dipd程序，可先备份一下之前的数据，然后重新初始化本地私链
```mv ~/.dipd ~/.dipd.bakup```
:::

### 创建钱包地址

```bash
# Copy the `Address` output here and save it for later use 
dipcli keys add jack

# Copy the `Address` output here and save it for later use
dipcli keys add alice
```

### 将钱包地址加入genesis文件，并初始化余额

```bash
# Add both accounts, with coins to the genesis file
dipd add-genesis-account $(dipcli keys show jack -a) 100000000000000000000pdip
dipd add-genesis-account $(dipcli keys show alice -a) 100000000000000000000pdip
```

### 创建验证人

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

### 配置命令行钱包dipcli

```bash
# Configure your CLI to eliminate need for chain-id flag
dipcli config chain-id <chain-id>
dipcli config output json
dipcli config indent true
dipcli config trust-node true
```

### 启动本地私链

完成以上配置后，执行如下命令，启动本地私链

```bash
dipd start --log_level "*:debug" --trace
```

## 创建智能合约

### 编写智能合约

智能合约支持solidity语言。
以下面的合约为示例：

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

可通过[remix](http://remix.ethereum.org/)在线编译完成后，将字节码(json结构体中object字段对应的值，不带双引号)和abi文件保存至本地文件。

假设本地的./demo/demo.bc为字节码文件，./demo/demo.abi为abi文件。

字节码:

```javascript
608060405234801561001057600080fd5b506509184e72a0006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610344806100696000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327e235e31461005c57806370a08231146100b3578063a9059cbb1461010a575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610162565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061017a565b6040518082815260200191505060405180910390f35b610148600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c2565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561021157600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a7230582015481e18f5439ee76271037928d88d33cc7d7d4bf1e5e801b78db9e902f255560029
```

abi:

```javascript
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


### 部署智能合约

```bash
dipcli vm create --code_file=./demo/demo.bc --abi_file=./demo/demo.abi \
--from $(dipcli keys show -a alice) --amount=0pdip --args='' \
--gas=4000000 -y
```

其中：
 ```--code_file``` 指定字节码文件路径,
 ```--abi_file``` 指定abi文件路径
 ```--amount``` 表示向合约发送的资产数量， 由于示例合约的构造函数不带payable修饰符，所以只能传0pdip,
 ```--gas``` 指定本次交易的gas上限，dipcli默认为10万; 创建合约消耗的gas比较多，需要指定一个比较大的值
 ```--args``` 指定创建合约构造函数参数列表，以空格分割多个参数

交易发出后，终端响应如下：

```json
{
  "height": "0",
  "txhash": "F53BC778587AA6729B391D7495FE79B09F77C4CACA3A898F95183CD525EA08DA",
  "raw_log": "[]"
}
```

其中的```txhash```为交易哈希。 可根据返回的```txhash```，查询交易是否成功， 以及新创建的合约地址

```bash
dipcli query tx <txhash>
```

若返回结果中包含 ```"success": true```表示交易成功； 否则在raw_log字段会有错误详情。

交易详情中，其中的events结构中包含新创建的合约地址：

```json
  "events": [
    {
      "type": "message",
      "attributes": [
        {
          "key": "action",
          "value": "contract_create"
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
          "value": "dip1a5ev4u3rpvvw8qgjs2635jhqe5tr9cuj8xs40z"
        }
      ]
    }
  ]
```

如上，其中 ```dip1a5ev4u3rpvvw8qgjs2635jhqe5tr9cuj8xs40z``` 即新部署的合约地址。


根据上述新创建的合约地址，可查询区块链上的合约代码

```bash
dipcli query vm code dip1a5ev4u3rpvvw8qgjs2635jhqe5tr9cuj8xs40z
```

## 调用智能合约

调用智能合约，需要使用abi文件。 假设合约对应的abi文件已经保存至./demo/demo.abi 。

```bash
dipcli vm call --from $(dipcli keys show -a alice) \
--contract_addr dip1a5ev4u3rpvvw8qgjs2635jhqe5tr9cuj8xs40z \
--method transfer  \
--args 'dip1a3qa7dlfhsuzpjwrxhygmscr96uxuar9n0jkdd 2' \
--amount 1000000pdip \
--abi_file ./demo/demo.abi
```

其中:
```--contract_addr ``` 指定要调用的合约地址， ```--abi_file```指定了合约对应的abi文件路径, ```--method``` 指定合约的方法名, ```--args ```指定合约方法对应的参数, ```--amount```指定向合约发送的资产数量, ```--from```指定本次调用的发起账户

上述示例调用了合约的```transfer```方法，该方法的声明如下

```javascript
function transfer(address to, uint256 value) public returns (bool success)
```

```transfer``` 方法需要2个参数，分别为接收方地址和转账数量。示例中接收地址为dip1a3qa7dlfhsuzpjwrxhygmscr96uxuar9n0jkdd， 转帐数量为2.

 查询合约账户余额：

```bash
dipcli query account dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc
```

## 调用合约方法，查询合约状态

查询合约状态需要使用abi文件。假设合约对应的abi文件已经保存至```./demo/demo.abi```

合约示例中，```balanceOf```为只读方法，可以根据该方法查询指定地址在合约中的状态。 

``` bash
# 调用合约的balanceOf方法，
dipcli query vm call $(dipcli keys show -a alice) dip1a5ev4u3rpvvw8qgjs2635jhqe5tr9cuj8xs40z balanceOf ./demo/demo.abi --amount 0pdip --args 'dip1a3qa7dlfhsuzpjwrxhygmscr96uxuar9n0jkdd'
```

查询alice帐户在合约中的状态：

```bash
# 使用dipcli查询状态
dipcli query vm call $(dipcli keys show -a alice) dip1vp0pzeyst7zjkck5qk0kvplu3szsdxp04kg5xc balanceOf ./demo/demo.abi --amount 0pdip --args "dip1a3qa7dlfhsuzpjwrxhygmscr96uxuar9n0jkdd"
```

通过```dipcli```的```query```方式调用合约，只能够查询状态，不会在链上记账。

## 智能合约相关API

智能合约相关的API，主要包括查询合约代码、预估交易gas和调用合约的方法。

参考[这里](./api.md#合约相关api)