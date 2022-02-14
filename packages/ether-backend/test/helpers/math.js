const web3 = require('web3');

const randomUint256 = () => web3.utils.randomHex(32);
const randomRange = (max, min = 0) => Math.floor(Math.random() * max) + min;
const UINT256_LIMIT = Math.pow(2, 32) - 1;

module.exports = {
    randomRange,
    randomUint256,
    UINT256_LIMIT
}