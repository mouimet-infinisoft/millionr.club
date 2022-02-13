import React from 'react';
import {useReactEthereum} from  '../Ethereum/useReactEthereum'

const MetaMask = () => {
  const Context = React.createContext({})
  const {isMetaMaskInstalled, requestAccounts, sendTransaction} = useReactEthereum({Context, initialContext: {
    connected: false,
    accounts: [],
  }})
  const [context, setContext] = React.useState({
    connected: false,
    accounts: [],
  });

  const onConnect = async () => {
    try {
      const { accounts } = await requestAccounts();
      setContext({ connected: true, accounts });
    } catch (error) {
      console.error(error);
    }
  };

  const onSendTransaction = async () => {
    try {
      const result = await sendTransaction({
        to: '0xe371517d0A116F42178c23c945386746ffBC6c1C',
        from: window.ethereum.selectedAddress,
        value: '10000000000',
      });
      console.log(`result = `, result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Meta Mask State</h1>
      {isMetaMaskInstalled && !context.connected && (
        <>
          <h2>Installed</h2>
          <button onClick={onConnect}>Connect</button>
        </>
      )}

      {isMetaMaskInstalled && context.connected && (
        <>
          <h2>Installed, COnnected</h2>
          <button onClick={onSendTransaction}>Send transaction</button>
          <div>{JSON.stringify(context)}</div>
        </>
      )}
    </div>
  );
};

export default MetaMask;
