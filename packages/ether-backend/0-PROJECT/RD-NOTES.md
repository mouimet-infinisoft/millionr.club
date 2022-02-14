# MY NOTES

# DEPLOYED RINKEBY

## ERC1155

### V1: MySteve.sol

- Address: 0xE003667F1e1e5eCdcF496f0aEb8A4D52d462a2D9
  - Deployed using Remix
  - First one, importable on opensea, not on rarible.
    - IMPORTANT NOTE: When importing colletion on opensea, minting new nft are NOT visible and collection is NOT updatable
  - LAck name and symbol
  - I did mint nft and its working.

### V2: MySteve.sol

- Address: 0x8a4E6E36Eb0dE89EDfCBa21A9F37c42d07CD8145
  - Deployed using Remix
  - Added name and symbol properties - Works on rarible and opensea
  - Mint 50 individual NFT - Works

Notes on V1, V2 - Metadata is the key for successfull imports. My schema is not working fine.

Problem List: - Metadata is not implemented correctly. There we dont see info and image correctly.

### V3: SteveIsBack.sol

- Address: 0x42d572e0FFD7aC565434Fe9D5212A347C257a66A (Deployed by Remix on Rinkeby)
- Address: 0x0cE0E9EA08b30f7bdf71d28A9467368aD119C0a3 (Deployed by me Truffle on Rinkeby)

  - Deployed using Remix
    - Remix freeze alot. Do know if my contract is the cause
  - Fail to deploy using truffle.
    - Crashes at the very end.
    - Error: Uncaught exception about forking only supports EIP-1193-compliant providers.
  - Changed npm run clean script, remove contracts/artifacts.
  - Error fixed by running:
    - npm run clean
  - Fas fee to deploy

    - Migration.sol
    - SteveisBack.sol

      Summary
      =======

      > Total deployments: 2
      > Final cost: 0.00858774003435096 ETH At the moment = 26.40$

  - Added massiveMintTo(address, count) to batchMint (working fine)
  - Rarible: I see collection and 50 items
  - Opensea: I see empty collection
    - Items do not load cuz of Content Security Policy URL insecure. My meta data is not correct.

### V4: SteveIsGone.sol
- Address: 0xAd0D4b919614d081DA5EB38607A5617950348469

  - MUST run npm run clean before or its NOT working
  - Compiled, Deployed with truffle and my npm scripts

  - Gas fee to deploy

    - Migration.sol
    - SteveisGone.sol

    Summary
    =======

    > Total deployments: 2
    > Final cost: 0.008587800118728348 ETH

- USE CASE: Sell 1 NFT to milie
  When milie bought my NFT from rarible, rarible proxy at 0x7d47126a2600E22eab9eD6CF0e515678727779A6 got approuved to transfer 1 NFT tokenId 99 from
  my account 0x29fD477b2981dDBa3Cda89a633289E54C197BcB9 to her account 0xe371517d0a116f42178c23c945386746ffbc6c1c

```
    TransferSingle (index_topic_1 address operator, index_topic_2 address from, index_topic_3 address to, uint256 id, uint256 value)
    address operator
    0x7d47126a2600e22eab9ed6cf0e515678727779a6
    address from
    0x29fd477b2981ddba3cda89a633289e54c197bcb9
    address to
    0xe371517d0a116f42178c23c945386746ffbc6c1c
    uint256 id
    99
    uint256 value
    1
```

    Event TransferSingle
    - https://rinkeby.etherscan.io/address/0xAd0D4b919614d081DA5EB38607A5617950348469#events
    - Transaction: https://rinkeby.etherscan.io/tx/0xf1a7c56e3748fd1b3fa94a3ced7cb418161f32bf1fc27f251e25480cc604de0a

    Interface
    - https://docs.openzeppelin.com/contracts/4.x/api/token/erc1155

- USE CASE: Buy back NFT from MIlie
    Behaves exactly the same.
```
	 TransferSingle (index_topic_1 address operator, index_topic_2 address from, index_topic_3 address to, uint256 id, uint256 value)
   address operator
   0x7d47126a2600e22eab9ed6cf0e515678727779a6
   address from
   0xe371517d0a116f42178c23c945386746ffbc6c1c
   address to
   0x29fd477b2981ddba3cda89a633289e54c197bcb9
   uint256 id
   99
   uint256 value
   1
```

### V5: WhereIsSteve.sol
    Asset Counter
      - Initialize to 0
    Member list
      - addMember()
      - updateMember()
    Refactor massiveMintTo
      - TokenId: start from counter
      - Increment count
    Mint
      - Requires
    Hook
      - _safeTransferFrom()
    
    IMPORTANT NOTES
      - mintBatch and _safeTransferBatch hook NOT IMPLEMENTED
      - Security needs to be assessed

        
  Address: 0x8470272B45fd1293169BdaeE33c21382D115B945
  Fas fee to deploy
    - Migration.sol
    - WhereIsSteve.sol

    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.009497352591424726 ETH

# TRADABLE
  - Implementing this contract enable trading on opensea automaticaly
    - https://github.com/ProjectOpenSea/opensea-erc1155/blob/master/contracts/ERC1155Tradable.sol