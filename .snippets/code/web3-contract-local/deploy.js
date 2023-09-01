// 1. Import web3 and the contract file

const Web3 = require('web3');
const contractFile = require('./compile');

// 2. Add the Web3 provider logic here:
const providerRPC = {
  development: 'http://localhost:9944',
  moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.development); // Change to correct network

// 3. Create address variables
const accountFrom = {
  privateKey: 'YOUR_PRIVATE_KEY_HERE',
  address: 'PUBLIC_ADDRESS_OF_PK_HERE',
};

// 4. Get the bytecode and API
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account ${accountFrom.address}`);

  // 6. Create contract instance
  const incrementer = new web3.eth.Contract(abi);

  // 7. Create constructor tx
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // 8. Sign transacation and send
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: incrementerTx.encodeABI(),
      gas: await incrementerTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 9. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

// 10. Call deploy function
deploy();