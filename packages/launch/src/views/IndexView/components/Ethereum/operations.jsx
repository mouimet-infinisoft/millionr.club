import Web3 from 'web3';

const isMetaMaskInstalled = () => typeof window.ethereum !== 'undefined';

const requestAccountBalance = async ({account}) => {
  try {
    if (typeof window.ethereum !== 'undefined') {

      const web3 = new Web3(Web3.givenProvider)
      console.log(`Web3 = `, web3)
      const balance = await web3.eth.getBalance(account)

      // return web3.utils.fromWei(balance, 'ether');
      return balance;
    }
  } catch (error) {
    console.error(`Cant fetch accounts, error = `, error);
  }
};

const requestAccounts = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log(`Accounts`, accounts);
      return {
        accounts,
      };
    }
  } catch (error) {
    console.error(`Cant fetch accounts, error = `, error);
  }
};

const sendTransaction = async (txParams) => {
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });

    console.log(`Transaction hash: `, txHash);

    return txHash;
  } catch (error) {
    console.error(error);
  }
};

export {
    isMetaMaskInstalled,
    requestAccounts,
    requestAccountBalance,
    sendTransaction
}