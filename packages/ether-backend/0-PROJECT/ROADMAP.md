# GOALS
Implement my concept of private club with members owning nfts.

- Having our own dApp
- Use lazy mint to reduce cost
- Use existing marketplace with very small amount of nft to use their exposure
- Bring them to our site
- Place sale order open opensea and rarible with unlock content to redeem their membership
- All custom logic will happen from within the redeem contract

# ENVIRONMENT WORKING
    - Wallet
    - Truffle access rinkeby and local
    - open zeppelin contracts template
    - solc 7.15.1
    - node 16.3.0

# INFRA
    - Alchemy - IP Filter to 142.113.66.157
        - Dashboard: https://dashboard.alchemyapi.io/apps/obl3hcqb99mrey6q
        - API: https://eth-rinkeby.alchemyapi.io/v2/S5f7HNQSMwp32-3Iewfa8ByqH0-cKeYg
    - Wallet  - Metamask
        - Address: 0x29fD477b2981dDBa3Cda89a633289E54C197BcB9
        - Mnemonic: mass lunch appear culture dragon occur exact drama hurt right detail muffin
        - Privatekey: 5c74249277582e32c50f0c5c4c5ebdc2227f514d8aecce6a33103d8ea981483d
    - AWS API - Metadata
        - Manage: https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/s3q5qbgy1a/resources/u45cl6e260
        - AWS API Test: https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/s3q5qbgy1a/resources/zzmure/methods/ANY
        - Base url : https://s3q5qbgy1a.execute-api.us-east-1.amazonaws.com/dev
        - URL: https://s3q5qbgy1a.execute-api.us-east-1.amazonaws.com/dev/*
    - Etherscan
        - Apikey: MyNftSolution
        - Access: Stored in my enpass
        - Url: https://etherscan.io/myapikey

# DEV PIPELINE
    - Remix for quick deploy and test
        > npm run start
        > goto https://remix.ethereum.org/

    - truffle for testnet automatic deploy
        > truffle deploy

    - Look for full scripts inside package.json

# REQUIREMENTS
1. Create my ERC1155 Lazy mint contract
2. Deploy
3. Observe behavior
    - Etherscan
    - Opensea
    - Rarible
4. Questions
    - Can it be listed on these marketplace?
    - Can we buy?
    - Can we auction ?
    - Once purchased, can we trade it?

# TECHNICAL
## Build/Maintain members list
1. Get address when buying
   Refer to
    - RD-NOTES.md at ### V4: SteveIsGone.sol

    > Method
    ```
        TransferSingle (index_topic_1 address operator, index_topic_2 address from, index_topic_3 address to, uint256 id, uint256 value)
    ```
    - 3 argument to is the address to add to build member list

2. Get address from secondary trades
    Refer to 1.
3. Working for Batch as well with event TransferBatch


## Ledger & Funds Management Delegatation to Smart Contract
    Remove myself and my account of the equation to build an autonomous system.

## Financial Rules


## Unit Testing
    - getMembersCount()
    - getMember()
    - mint
    - mintBatch()
    - TransferSingle
    - TransferBatch

## Security
1. Upgradable
2. Storage
3. Proxy
