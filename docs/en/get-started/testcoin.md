# How to claim test token

## Create new account

If you already have an account, you can skip this step.

If you don't have an account, you can use `dipcli` to create a new account as follows:

```bash
dipcli keys add <key_name>
```

Enter the wallet password as prompted, and get the following example output:

```bash
- name: jackson
  type: local
  address: dip1p3fuppcxud5rjsaywuyuguh6achmj5p0r6z6ve
  pubkey: dippub1addwnpepqg8mfc6t9eaw9lal0c4tzma5vgmqzkgszwcgljcz3sy8rd2rukgxz9dtmph
  mnemonic: "" 
  threshold: 0
  pubkeys: []

**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.
# The following is Mnemonic
connect plug cigar purchase inflict enroll ten limb quantum never supply grid home case process claw truly grape federal liberty tree remove side quantum
```

The mnemonic can be used to restore the account. The command to restore the account is:

```bash
dipcli keys add <key_name> --recover
```

## Claim test token

Faucet address: ```https://docs.dippernetwork.com/dip/get_token?<address>```  

Replace `` `<address>` '' with your wallet address to get the test token


## How to check your balance

**Method A:** Query via blockchain explorer

**Method B:** Query via dipcli

You can execute the following command to check your balance.

```bash
dipcli query account [address]
```
