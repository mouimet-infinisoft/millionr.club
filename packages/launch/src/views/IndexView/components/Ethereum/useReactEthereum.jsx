import React from 'react';
import { isMetaMaskInstalled, requestAccounts, sendTransaction } from './operations';

const useReactEthereum = ({Context, initialContext}) => {
    const [state, setState] = React.useState(initialContext)
 

    const Provider = ({children}) => {
        return (<Context.Provider value={state}>{children}</Context.Provider>)
    }

    return {
        isMetaMaskInstalled,
        requestAccounts,
        sendTransaction,
        Provider
    }
}

export {
    useReactEthereum
}
