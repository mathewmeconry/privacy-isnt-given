# privacy-isnt-given

This is a challenge for the Hackvent 2022.

## Description

As every good IT person, Santa doesn't have all his backups at one place. Rather he spread the all over the world.  
With this new blockchain unstoppable technology emerging (except Solana, this chain stopps all the time) he tries to use it as another backup space.  
To test the feasability he only uploaded one single flag.  
Fortunaly for you he doesn't understand how blockchains work.

Can you recover the flag?

### Information

Wallet public key `0x28a8746e75304c0780e011bed21c72cd78cd535e`  
Wallet private key `0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3`  
Contract address: `0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab`

Contract source code
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NotSoPrivate {
    address private owner;
    string private flag;

    constructor(string memory _flag) {
        flag = _flag;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setFlag(string calldata _flag) external onlyOwner {
        flag = _flag;
    }
}
```

## Vulnerability

Even tho a variable is defined as private it isn't. The flag `private` only means that the compiler doesn't create a getter.  
You can recover the flag by addressing the right storage slot on the contract.  
See `scripts/attack.ts` as an example.

Another solution would be recovering the deployment TX and read the constructor parameter. 

## Flag

HV22{Ch41nS_ar3_Publ1C}
