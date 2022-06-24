```javascript
// Import the contract ABI
// const { abi } = require('./YOUR-ABI-PATH');

// Find call data for the setMessage function.
const callData = web3.eth.abi.encodeFunctionCall(
  abi
  [
    INPUT_1,
    INPUT_2,
    ...
  ]
);
```