---
title: Tenderly Development Platform
description: Learn how to use Tenderly, an Ethereum development platform, to build, debug, and monitor Solidity smart contracts on Moonbeam.
---

# Using Tenderly on Moonbeam

![Tenderly Banner](/images/builders/build/eth-api/dev-env/tenderly/tenderly-banner.png)

## Introduction {: #introduction } 

[Tenderly](https://tenderly.co/){target=_blank} is a Web3 development platform that contains a suite of tools designed to help developers throughout the DApp development lifecycle. With Tenderly, you can build, debug, test, optimize, monitor, set up alerts, and view analytics for your smart contracts on Moonbeam and Moonriver.

The Tenderly platform provides the following features:

- **[Contract Verification](https://docs.tenderly.co/monitoring/smart-contract-verification/){target=_blank}** - as it is essential to verify your smart contracts to take full advantage of all of Tenderly's features, Tenderly provides several methods of verification. You can verify smart contracts through [the Tenderly dashboard](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract#verifying-a-smart-contract){target=_blank}, [the Tenderly CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli){target=_blank}, or [the Tenderly Hardhat plugin](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin){target=_blank}

- **[Debugger](https://docs.tenderly.co/debugger/how-to-use-tenderly-debugger){target=_blank}** - use the visual debugger to inspect transactions and get better insight into the behavior of your code. With the debugger, you can review a transaction's stack trace, view the calls made in a transaction, step through a contract, and review decoded inputs, outputs, and state variables. You can use the debugger on the Tenderly dashboard or the [Tenderly Debugger Chrome Extension](https://docs.tenderly.co/simulations-and-forks/how-to-simulate-a-transaction){target=_blank}

- **[Gas Profiler](https://docs.tenderly.co/debugger/how-to-use-tenderly-debugger#gas-profiler){target=_blank}** - view how much gas you're spending on a granular level, so you can optimize your smart contracts and reduce transaction gas costs

- **[Simulator](https://docs.tenderly.co/simulations-and-forks/how-to-simulate-a-transaction){target=_blank}** - simulate transactions in a forked development environment to learn how your transactions will behave without having to send them on-chain. This way, you can know the outcome of the transaction and make sure it works as expected before sending it to the network. You can experiment with different parameters, simulate historical and current transactions, and edit the contract source code. You can access the simulator from the Tenderly dashboard or you can use the [Tenderly Simulation API](https://docs.tenderly.co/simulations-and-forks/simulation-api){target=_blank} to take advantage of the simulator programmatically 

- **[Forks](https://docs.tenderly.co/simulations-and-forks/how-to-create-a-fork){target=_blank}** - this feature simulates the live Moonbeam network in an isolated environment, which enables you to interact with deployed contracts and live on-chain data. Forking also takes transaction simulations a step further by enabling you to chain multiple simulations together chronologically. This allows for the testing of complex transaction scenarios where one transaction depends upon another, with the benefit of using live on-chain data

- **[Alerting](https://docs.tenderly.co/alerts/alerting){target=_blank}** - configure real-time alerts to notify you whenever a specific event occurs, allowing you to stay informed about what's going on with your smart contracts

- **[Web3 Actions](https://docs.tenderly.co/web3-actions/intro-to-web3-actions){target=_blank}** - create programmable functions in JavaScript or TypeScript that are executed automatically by Tenderly when a specific smart contract or chain event occurs

- **[Analytics](https://docs.tenderly.co/analytics/general-analytics){target=_blank}** - visualize transaction and on-chain data to get useful insights into what's going on with your project. You can use Tenderly's analytics builder or create custom queries and scripts to meet your analytic needs

- **[Sandbox](https://sandbox.tenderly.co/){target=_blank}** - write, compile, execute, and debug your smart contracts directly in your browser with baked-in JavaScript and Solidity editors. Every time you run your code, Tenderly creates a temporary fork that comes with 10 pre-funded accounts, each with 100 tokens for testing purposes

!!! note
    Support for Moonbeam and Moonriver is currently being rolled out in a two-phase process. The integration is currently in Phase 1, you can check out the [limitations on Tenderly's documentation site](https://docs.tenderly.co/supported-networks-and-languages#footnotes){target=_blank}. In Phase 2, support for Moonbeam and Moonriver will be completely enabled.

## Getting Started

The Tenderly dashboard provides access to the all-in-one Web3 development platform. To get started with the dashboard, you'll need to [sign up](https://dashboard.tenderly.co/register){target=_blank} for an account. Once you've signed up, you'll be able to start exploring your Tenderly dashboard.

![Tenderly dashboard](/images/builders/build/eth-api/dev-env/tenderly/tenderly-1.png)

If you prefer not to set up a account, you can also access limited features using [Tenderly's explorer](https://dashboard.tenderly.co/explorer){target=_blank}. Without an account, you can still gain insights for contracts and transactions. However, you won't be able to simulate transactions or create forked environments.

To interact with Tenderly's features programmatically, you can check out the [Tenderly CLI](https://github.com/Tenderly/tenderly-cli){target=_blank} GitHub repository for more information.

The following sections will show you how to get started with Tenderly on Moonbeam. For more detailed documentation, please refer to [Tenderly's documentation site](https://docs.tenderly.co/){target=_blank}.

### Create a Sandbox {: #create-a-moonbeam-sandbox }

To deploy contracts to Moonbeam with a Tenderly Sandbox, you can navigate to [sandbox.tenderly.co](https://sandbox.tenderly.co/){target=_blank} and take the following steps:

1. Enter your smart contract into the Solidity editor on the left-hand side
2. Select **Moonbeam** or **Moonriver** from the **Network** menu, adjust any of the compilation settings, and specify the block to run your code on if needed
3. Update the JavaScript editor on the right-hand side for your contract. Ethers.js and Web3.js are included in the Sandbox by default and can be instantiated with `ethers` and `web3`, respectively. It's also important to note that the Sandbox includes [global variables](https://docs.tenderly.co/tenderly-sandbox#available-javascript-global-variables){target=_blank} to ease development, so you don't need to worry about updating the RPC URL for Moonbeam
4. Click on **RUN** when you're ready to compile your contract and execute your code

If your code contained logic to deploy your contract or send a transaction, you'll see the transaction(s) appear under the **Simulated Transactions** section on the bottom left-hand side. 

![Tenderly Sandbox](/images/builders/build/eth-api/dev-env/tenderly/tenderly-2.png)

### Add a Contract {: #add-a-contract }

A good place to start with the Tenderly dashboard is to add a deployed smart contract. Once you've added a contract, you'll be able to create transaction simulations and forks, use the debugger, set up monitoring and alerts, and more. 

To add a new contract, you can click on **Contracts** on the left-side panel and click **Add Contract**. A pop-up will appear and you can take the following steps:

1. Enter the contract address
2. Choose **Moonbeam** or **Moonriver** as the network, depending on which network you've deployed your smart contract to
3. (Optional) You can give your contract a name
4. (Optional) You can toggle the **Add more** slider to on if you'd like to add additional contracts. This will allow you to add more contracts after the initial contract has been added
5. Finally to add the contract to the dashboard, click **Add contract**

![Add a contract](/images/builders/build/eth-api/dev-env/tenderly/tenderly-3.png)

After a contract has been added, it will appear in the list of contracts on the **Contracts** dashboard. If the contract hasn't been verified yet, the dashboard will display an **Unverified** status along with a **Verify** button.

![Contract in list of contracts](/images/builders/build/eth-api/dev-env/tenderly/tenderly-4.png)

To take full advantage of the Tenderly tool set, it is recommended that you verify your smart contracts, which you can do by clicking on **Verify**. You can choose to verify your contract by uploading the contract's JSON, ABI, or source code. For more information, please refer to [Tenderly's documentation](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract#verifying-a-smart-contract){target=_blank}.

### Create a Fork {: #fork-moonbeam }

Tenderly's forking feature simulates the live Moonbeam network in an isolated environment, which enables you to interact with deployed contracts and live on-chain data.

Tenderly makes creating a fork through the dashboard quite simple. To get started, click on **Forks** on the left-side menu and then click **Create Fork**. From there, you can take the following steps:

1. Select **Moonbeam** or **Moonriver** from the **Network** dropdown
2. (Optional) Give your fork a name
3. If you only need data up until a specific block, you can toggle the **Use Latest Block** slider to off and specify the block number. Otherwise, you can leave the slider as is to include all blocks up until the latest block
4. Click **Create**

![Fork Moonbeam](/images/builders/build/eth-api/dev-env/tenderly/tenderly-5.png)

Once you've created your fork, you can start using it by deploying a contract to it or creating a transaction simulation using it. 

To deploy a contract to your fork, you can click on the **Deploy Contract** button, upload your contract's source code, and set the compiler configurations. Once you submit the deployment, you'll see the transaction of your deployment appear under the **Simulated Transactions** tab and can click on the simulation for more information.

![Fork simulations](/images/builders/build/eth-api/dev-env/tenderly/tenderly-6.png)

To create additional simulations, you can click the **New Simulation** button and enter in the configurations for the simulation. For more information on how to create a simulation, please refer to [Tenderly's documentation](https://docs.tenderly.co/simulations-and-forks/how-to-simulate-a-transaction){target=_blank}.

--8<-- 'text/disclaimers/third-party-content.md'