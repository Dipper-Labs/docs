# Testnet gentx files

## Requirement

Recommended server configuration:

* CPU cores: 2
* RAM: 4GB+
* Disk: 200GB+ SSD
* OS: Ubuntu 20.04
* Bandwidth:10Mbps
* Open ports: 26656 and 26657

To install and configure go, click [here](../software/go-install.md)

### Build dip from source code

```bash
# Get dip source code
git clone https://github.com/Dipper-Labs/Dipper-Protocol.git
cd Dipper-Protocol && git checkout testnet-v4.0.1

# Install statik
sudo apt-get update
sudo apt-get install golang-statik

# Compile and install
make install

# Check version
dipd version
dipcli version
```

## 1. Create an account

```bash
dipcli keys add <key_name>
```

## 2. Initialize your node

```bash
dipd init --moniker=<node_name> --chain-id dip-testnet
```

This command will create the genesis& config files in the home directory(~/.dipd/ by default).

## 3. Execute gentx command

```bash
dipd gentx \
  --amount=10000000000000pdip \
  --pubkey $(dipd tendermint show-validator) \
  --name  <key_name>
```

This commond will generate the transaction in the directory ``` ~/.dipd/config/gentx/``` 

The default commission data is：

```bash
delegation amount: 10000000000000pdip
commission rate: 0.1
commission max rate: 0.2
commission max change rate: 0.01
min_self_delegation: 1pdip
```

You could also change thesemetrics.

## 4. Sumbit your gentx.json

Save your gentx file as [github-user-name].json,  ansd submit your json file tohttps://github.com/Dipper-Labs/Dipper-Protocol/testnet/tree/master/gentx by creating a pull request.