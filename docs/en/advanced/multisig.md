# Multisig key

## Create a multisig key

The following example creates a multisig key with 3 sub-keys, and specify the minimum number of signatures ad 2.
The tx could be broadcast only when the number of signatures is greater than or equal to 2.

```bash
# usage
dipcli keys add <multisig-key-name>  --multisig-threshold=2 \
--multisig=<sub-key-name-1>,<sub-key-name-2>,<sub-key-name-3>

# example
dipcli keys add mm --multisig-threshold=2 --multisig=alice,bob,dan
```

:::warning tips

If you don't have all the permission of sub-keys, you can use 
```dipcli keys add <key-name> --pubkey```
to import pubkeys。

:::

List multisig keys:

```bash
# usage
dipcli keys show <multisig-key-name>

# example, list keys of mm:
dipcli keys show mm
```

## Construct an offline tx by multisig key

The newly created multi-signature account mm is an offline account. Before constructing offline transactions, you need to transfer some tokens to the mm account.

```bash
# usage
# generate a transfer tx
dipcli send --to=$(dipcli keys show alice -a) \
--amount=10pdip --gas-prices=1000.0pdip  \
--from=$(dipcli keys show <multisig-key-name> -a) \
--generate-only

# example
dipcli send --to=$(dipcli keys show alice -a) \
--amount=10pdip --gas-prices=1000.0pdip  \
--from=$(dipcli keys show mm -a) \
--generate-only > unsigned.json
```

## Sign tx offline 

Assume the multisig-threshold is 2, here we sign the unsigned.json by 2 of the signers.

Sign tx from sub-key alice

```bash
dipcli tx sign unsigned.json --from $(dipcli keys show alice -a) \
--multisig=$(dipcli keys show mm -a) --signature-only > signed-1.json
```

Sign tx from sub-key bob

```bash
dipcli tx sign unsigned.json --from $(dipcli keys show bob -a) \
--multisig=$(dipcli keys show mm -a) --signature-only > signed-2.json
```

## Merge the signatures

Merge all the signatures into signed.json

```bash
dipcli tx multisign unsigned.json mm signed-1.json signed-2.json > signed.json
```

## Broadcast offline signed tx

```bash
dipcli tx broadcast signed.json
```