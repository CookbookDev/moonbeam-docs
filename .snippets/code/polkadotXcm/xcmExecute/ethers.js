import abi from './xcmUtilsABI.js'; // Import the XCM Utiliies Precompile ABI
import { ethers } from 'ethers'; // Import Ethers library

const PRIVATE_KEY = 'INSERT_YOUR_PRIVATE_KEY';
const xcmUtilsAddress = '0x000000000000000000000000000000000000080C';

/* Create Ethers provider and signer */
const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.api.moonbase.moonbeam.network'
);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

/* Create contract instance of the XCM Utilities Precompile */
const xcmUtils = new ethers.Contract(
  xcmUtilsAddress,
  abi,
  signer
);

const executeXcmMessageLocally = async () => {
  /* Define parameters required for the xcmExecute function */
  const encodedCalldata = 'INSERT_ENCODED_CALLDATA';
  const maxWeight = '100000000000';

  /* Execute the custom XCM message */
  const tx = await xcmUtils.xcmExecute(encodedCalldata, maxWeight);
  await tx.wait();
  console.log(`Transaction receipt: ${tx.hash}`);
};

executeXcmMessageLocally();