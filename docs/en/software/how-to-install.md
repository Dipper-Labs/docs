# How to install dip

## The latest version

The latest  testnet version is testnet-v1.1.0

## Server configuration

Recommended server configuration:

* CPU cores: 2
* RAM: 4GB+
* Disk: 100GB+ SSD
* OS: Ubuntu 18.04
* Bandwidth:10Mbps
* Open ports: 26656 and 26657

## Installation

### 1. Setting up a development environment

* Install dependence

```bash
sudo apt-get update
sudo apt-get install git gcc cmake make golang-statik
```

To install and configure go, click [here](../software/go-install.md)

### 2. Build dip from source code

```bash 
# Get dip source code
git clone https://github.com/Dipper-Labs/Dipper-Protocol.git
cd Dipper-Protocol && git checkout  testnet-v1.1.0


# Install statik
sudo apt-get update
sudo apt-get install golang-statik

# Compile and install
make install

# check version
dipd version
dipcli version
```

Congratulations! You have installed dipcli successfully. Now you can build a full-node on DipperNetwork testnet. [Click here](../get-started/how-to-join-testnet.md)
