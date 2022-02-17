#!/bin/sh

#echo "Verifying source code MillionR_Exchange_V1"
#truffle run verify MillionR_Exchange_V1 --network rinkeby

#echo "Verifying source code MillionR_V1"
#truffle run verify MillionR_V1 --network rinkeby

echo "Verifying deez nuts"
truffle run verify DeezNutsERC1155 --network rinkeby
