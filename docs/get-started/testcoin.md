# 如何申领测试token

## 创建新账户

如果你已经有账户，可跳过此步骤。

如果没有账户，请点击[这里](../software/dipcli.md#创建新地址)创建新帐户。

## 申请测试token

水龙头地址： ```https://docs.dipperNetwork.com/dip/get_token?<address>```  
浏览器访问该地址，将```<address>```替换为你的钱包地址即可获得测试token

## 如何查看是否获得测试Token

**方法1** 通过区块浏览器查看```https://explorer.dippernetwork.com/account/<address>``` 其中```<address>```为你的dip地址

**方法2** 通过dipcli查看, 使用下列命令进行查看，address为你的dip地址

```bash
dipcli query account <address>
```