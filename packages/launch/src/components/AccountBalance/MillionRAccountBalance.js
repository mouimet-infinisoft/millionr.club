import Web3 from 'web3';
import  AccountBalance  from './AccountBalance';
import { useAccountBalance} from './useAccountBalance';

const account = "0x29fD477b2981dDBa3Cda89a633289E54C197BcB9"

const MillionRAccountBalance = () => {
  const {balance} = useAccountBalance({account});

  return (
    <AccountBalance
      title="MillionR Account"
      unit="ether"
      decimalPlaces={10}
      variation={Web3.utils.fromWei(`${(balance?.[0] || 0)-(balance?.[1] || 0)}`,'ether')}
      balance={Web3.utils.fromWei(balance[0].toString(), 'ether')} />
  );
};

export default MillionRAccountBalance