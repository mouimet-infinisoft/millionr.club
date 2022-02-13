const isMetaMaskInstalled = () => typeof window.ethereum !== 'undefined';

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
    sendTransaction
}