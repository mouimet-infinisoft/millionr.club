import React from 'react';
import { requestAccountBalance } from '../../Ethereum/wallet';

export const useAccountBalance = ({account}) => {
  const [balance, setBalance] = React.useState([0]);

  const onBalance = React.useCallback(async () => {
    try {
      const result = await requestAccountBalance({account});

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {      
        if (result !== balance[0]){
          setBalance(prev => ([result, ...prev]));
        } else {
          setBalance(prev => [...prev]);
        } 
      }, 100);
    } catch (error) {
      console.error(error);
    }
  }, [account, balance]);

  const timerRef = React.useRef({});

  React.useEffect(() => {
    onBalance();

    return () => clearTimeout(timerRef.current);
  }, [onBalance, balance]);

  return {
    balance
  };
};
