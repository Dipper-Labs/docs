
# FAQ
## Concept

### 1.Transaction Fees

creating a transaction in the DipperNetwork network requires paying a certain transaction fees.

Transaction fees = Gas * GasPrice, where Gas represents the actual amount of Gas consumed in the transaction, and GasPrice is the unit Gas price. The amount of Gas actually needed for a transaction represents how much resources the network needs to execute the transaction, mainly referring to the consumption of computing and storage operations. The GasPrice is specified by the user, and the validator node can autonomously configure the minimum-gas-prices that it can accept (the default is 1000.0pdip).

When using the ```dipcli``` command line to send transactions, you can use```---gas``` to specify the gas limit of the transaction. If the actual consumption of the transaction exceeds the gas limit specified by the user, the transaction will fail. The Tx fee is not refundable. You can use ```--gas-prices``` to specify the GasPrice of the transaction. If the GasPrice is lower than the minimus-gas-prices acceptable to validators in the network, the transaction will be discarded and not be verified.

Tips: When setting ```--gas-prices```, remember enter at least one decimal (up to 12 digits). (e.g 1000.0, 1100.0). 
A Integer is invalid when setting ```--gas-prices```.

How to send a Tx? [Click here](../software/dipcli.md)

### About DIP token

DIP is a token in the DipperNetwork network. The minimum unit is pdip. The conversion relationship is as follows:

```javascript
1 DIP = 10^12 pdip
```

## Node operation and maintenance

### How to stop the node program

**To stop the background program, you can execute the following command**

```bash
# Stop dipd
kill -9 $(pgrep dipd)

# Stop dipcli
kill -9 $(pgrep dipcli)
```

### How to restart the node program

```bash
kill -9 $(pgrep dipd)
kill -9 $(pgrep dipcli)

nohup dipd start 1>dipd.out 2>&1 &
nohup dipcli rest-server 1>cli.out 2>&1 &
```

### How to backup validator nodes

It is recommended to backup the```<your_custom_path>/.dipd/config``` directory, where ```priv_validator_key.json``` in the ```config``` directory is the private key of the validator node.

