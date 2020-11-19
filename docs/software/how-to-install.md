# 如何安装dip节点程序
本文档包含测试网和主网的安装说明

## 服务器配置

推荐的服务器配置：

* CPU 核数： 2
* 内存： 8GB
* 磁盘：500GB SSD
* 操作系统： Ubuntu 20.04
* 带宽：10Mbps
* 开放端口： 26656和26657


## 安装

### 搭建开发环境

* 安装依赖

```bash
sudo apt-get update
sudo apt-get install git gcc cmake make golang-statik
```

* 要求golang版本号>=1.13.5。 如果需要安装和配置go，请点击[这里](../software/go-install.md)

## 安装测试网或者主网
测试网和主网的安装路径是一个，所以会相互覆盖，安装前确认好要安装的测试网还是主网

### 安装测试网
当前测试网最新的release版本为mainnet-v1.0.1

```bash
# 获取dip 源码
git clone -b testnet https://github.com/Dipper-Labs/Dipper-Protocol.git
cd Dipper-Protocol && git checkout mainnet-v1.0.1

# 设置goproxy(make install过程会下载依赖的go模块,设置适合自己的代理,大陆用户可以设置以下代理来加快下载速度)
export GOPROXY=https://mirrors.aliyun.com/goproxy/

# 编译安装
make install
```

编译安装完成后，检查版本号

```bash
dipd version
mainnet-v1.0.1-0

dipcli version
mainnet-v1.0.1-0
```

### 安装主网
当前主网最新的release版本为mainnet-v1.0.1

```bash
# 获取dip 源码
git clone -b mainnet https://github.com/Dipper-Labs/Dipper-Protocol.git
cd Dipper-Protocol && git checkout mainnet-v1.0.1

# 设置goproxy(make install过程会下载依赖的go模块,设置适合自己的代理,大陆用户可以设置以下代理来加快下载速度)
export GOPROXY=https://mirrors.aliyun.com/goproxy/

# 编译安装
make install
```

编译安装完成后，检查版本号

```bash
dipd version
mainnet-v1.0.1-0

dipcli version
mainnet-v1.0.1-0
```

到这时，dip节点程序就安装完成了。接下来，你可以尝试加入测试网或者主网，点击[测试网](../get-started/how-to-join-testnet.md)，[主网](../get-started/how-to-join-mainnet.md)
