import Web3 from 'web3';
import artifact from 'ether-backend/build/contracts/MillionR_V1.json';

const joinVipMember = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(Web3.givenProvider);

      const contract = new web3.eth.Contract(
        artifact.abi,
        artifact.networks[4].address,
      );
      const result = await contract.methods.joinVipMember().send({from: (await web3.eth.getAccounts())[0], value: web3.utils.toWei('0.5', 'ether')})
      console.log(`result = `, result);
    }
  } catch (error) {
    console.error(`Cant fetch accounts, error = `, error);
  }
};

const requestVipMembersBalance = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(
        artifact.abi,
        artifact.networks[4].address,
      );
      const balance = await contract.methods.vipMembersBalance().call();
      return balance
    }
  } catch (error) {
    console.error(`Cant fetch accounts, error = `, error);
  }
};

const subscribeVipMembersBalance = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(
        artifact.abi,
        artifact.networks[4].address,
      );
      const balance = await contract.events.on('data',()=>{
        console.log(`EVEHEGVEUHFYGUEYGUYh`)
      })
      return balance
    }
  } catch (error) {
    console.error(`Cant fetch accounts, error = `, error);
  }
};
export {
  requestVipMembersBalance,
  joinVipMember,
  subscribeVipMembersBalance
};
