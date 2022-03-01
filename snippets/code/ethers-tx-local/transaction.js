// 1. Add the Ethers provider logic here:
// {...}

// 2. Create account variables
const account_from = {
  privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const addressTo = 'ADDRESS-TO-HERE';

// 3. Create wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

// 4. Create send function
const send = async () => {
  console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

  // 5. Create tx object
  const tx = {
    to: addressTo,
    value: ethers.utils.parseEther('1'),
  };

  // 6. Sign and send tx - wait for receipt
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

// 7. Call the send function
send();
