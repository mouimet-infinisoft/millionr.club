import Container from 'components/Container';
import Web3 from 'web3';
import { createRaribleSdk as createEthereumRaribleSdk } from '@rarible/protocol-ethereum-sdk';
import { Web3Ethereum } from '@rarible/web3-ethereum';
import {requestVipMembersBalance} from './operations'

const web = new Web3(window.ethereum);
const web3Ethereum = new Web3Ethereum({ web3: web });
const env = 'rinkeby'; // "e2e" | "ropsten" | "rinkeby" | "mainnet"
const raribleEthereumSdk = createEthereumRaribleSdk(web3Ethereum, env);

const upsertOrder = async () => {
  try {
    const orderResponse = await raribleEthereumSdk.order.sell({
      makeAssetType: {
        assetClass: 'ERC1155',
        contract: '0x466Dd2a81a7626f1DC4614e00106293767bB28F2',
        tokenId: 3197,
      },
      maker: '0x29fd477b2981ddba3cda89a633289e54c197bcb9',
      amount: 1,
      originFees: [
        {
          account: '0xE049b6230CB6D6978f0aB61d996b40Cd70eD892a',
          value: 100,
        },
      ],
      payouts: [],
      price: 1,
      takeAssetType: {
        assetClass: 'ETH',
      },
    });

    console.log(`Order: `, orderResponse);
  } catch (error) {
    console.log(`Criss: `, error);
  }
};

const RaribleSell = () => {
  return (
    <Container>
      Rarible API
      <button onClick={upsertOrder}>Send</button>
      <button onClick={requestVipMembersBalance}>Balance</button>
    </Container>
  );
};

export default RaribleSell;
