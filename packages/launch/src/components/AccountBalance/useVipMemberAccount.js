import React from 'react';
import { requestVipMembersBalance } from '../../Ethereum/millionr';

export const useVipMembersBalance = () => {
  const [balance, setBalance] = React.useState({balance: 0});

  const onBalance = React.useCallback(async () => {
    try {
      const result = await requestVipMembersBalance();

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {        
          setBalance({balance: result});
      }, 100);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const timerRef = React.useRef({});

  React.useEffect(() => {
    onBalance();

    return () => clearTimeout(timerRef.current);
  }, [onBalance, balance]);

  return {
    balance: balance.balance
  };
};
