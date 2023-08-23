---
title: Moonbeam Routed Liquidity
description: Learn how to receive Moonbeam Routed Liquidity after establishing a cross-chain integration with a Moonbeam-based network.  
---

# Receiving Moonbeam Routed Liquidity

![XCM Overview Banner](/images/builders/interoperability/xcm/xc-integration/xc-integration-banner.png)

## Introduction {: #introduction }

Moonbeam Routed Liquidity (MRL) refers to a Moonbeam use case in which liquidity that exists in any blockchain ecosystem that Moonbeam is connected to can be routed to Polkadot parachains. This is possible because of general message passing (GMP), where messages with arbitrary data and tokens can be sent across non-parachain blockchains through [chain-agnostic GMP protocols](/builders/interoperability/protocols){target=_blank}.  

These GMP protocols can be combined with Polkadot’s [XCM](/builders/interoperability/xcm/overview){target=_blank} messaging system to allow for seamless liquidity routing into parachains through precompiled contracts on Moonbeam. Precompiles are Solidity interfaces that provide access to Substrate functionality that is not normally accessible from the Ethereum side of Moonbeam through the Ethereum API. Liquidity can be routed to parachains using either the [GMP Precompile](/builders/pallets-precompiles/precompiles/gmp){target=_blank} or traditional smart contracts that interact with XCM-related precompiles, like the [X-Tokens](/builders/interoperability/xcm/xc20/xtokens#xtokens-precompile){target=_blank} Precompile.

GMP protocols typically move assets in a lock/mint or burn/mint fashion. This liquidity exists on Moonbeam normally as ERC-20 tokens. All ERC-20s on Moonbeam are now XCM-enabled, meaning that they can now exist as XC-20s in any other parachain, as long as they are registered on the other parachain. XCM-enabled ERC-20s are referred to as [local XC-20s](/builders/interoperability/xcm/xc20/overview#local-xc20s){target=_blank} on Moonbeam.

Currently, MRL is available through Wormhole connected chains, but there is nothing stopping a parachain team from implementing a similar pathway through a different GMP provider.  

Primarily, this guide will cover the process of integrating with Wormhole's SDKs and interfaces so that your parachain can access liquidity from non-parachain blockchains through Moonbeam. It will also cover the requirements to get started and the tokens available through Wormhole.

## Prerequisites {: #prerequisites }

In order to begin an MRL integration with your parachain, you will first need to:  

- [Establish a cross-chain integration with Moonbeam via HRMP channels](/builders/interoperability/xcm/xc-registration/xc-integration){target=_blank} so assets can be sent from Moonbeam to your parachain
- [Register Moonbeam’s asset on your parachain](/builders/interoperability/xcm/xc-registration/assets#register-moonbeam-native-assets){target=_blank}. This is required due to a temporary drawback of pallets that send XCM messages for asset transfer, making Moonbeam’s native gas asset the only asset that can be used as a cross-chain fee on the way back
- [Register the local XC-20 token(s) you want routed to your parachain](/builders/interoperability/xcm/xc-registration/assets#register-local-xc20){target=_blank}
    - Allow these local XC-20 token(s) to be used for XCM fees
- Allow users to send the `Transact` XCM instruction (via `polkadotXcm.Send` or with the [XCM Transactor Pallet](/builders/interoperability/xcm/xcm-transactor#xcm-transactor-pallet-interface){target=_blank}), which enables remote EVM calls, allowing accounts on a remote parachain to interact with the bridging smart contracts on Moonbeam

## MRL Through Wormhole {: #mrl-through-wormhole }

While MRL intends to encompass many different GMP providers, Wormhole is the first that has been built for the public. After you have completed all of the [prerequisites](#prerequisites), to receive liquidity through Wormhole, you'll need to:

- Notify the Moonbeam team of your desire to integrate into the MRL program so that we can help you with the technical implementation
- Connect with the Wormhole team and any other MRL-dependent frontends to finalize technical details and sync announcements. They will likely need the following information:  
    - Parachain ID  
    - The account type that your parachain uses (i.e., AccountId32 or AccountKey20)  
    - The addresses and names of the tokens that you have registered  
    - An endpoint that can be used by a [Wormhole Connect](https://wormhole.com/connect/){target=_blank} frontend  
    - Why you want your parachain to be connected through Wormhole Connect  

### Send Tokens Through Wormhole to a Parachain {: #sending-tokens-through-wormhole }

MRL provides a one-click solution that allows you to define a multilocation as a final destination for your assets to arrive from any Wormhole chain with a [Wormhole Connect integration](https://wormhole.com/connect/){target=_blank}.

To send tokens through Wormhole and MRL, user interfaces will use a mixture of the [Wormhole TokenBridge](https://github.com/wormhole-foundation/wormhole/blob/main/ethereum/contracts/bridge/interfaces/ITokenBridge.sol){target=_blank} and [Moonbeam’s GMP Precompile](/builders/pallets-precompiles/precompiles/gmp){target=_blank}.  

Users transferring liquidity will invoke the `transferTokensWithPayload` method on the origin chain's deployment of the Wormhole TokenBridge smart contract, which implements the `ITokenBridge.sol` interface, to send tokens to the GMP Precompile. This function requires a bytes payload, which must be formatted as a SCALE encoded multilocation object wrapped within another precompile-specific versioned type. To learn how to build this payload, please refer to the [Building the Payload for Wormhole](/builders/pallets-precompiles/precompiles/gmp#building-the-payload-for-wormhole){target=_blank} section of the GMP Precompile documentation.

Wormhole relies on a set of distributed nodes that monitor the state on several blockchains. In Wormhole, these nodes are referred to as [Guardians](https://docs.wormhole.com/wormhole/explore-wormhole/guardian){target=_blank}. It is the Guardian's role to observe messages and sign the corresponding payloads. If 2/3rds of Wormhole's signing Guardians validate a particular message, the message becomes approved and can be received on other chains.

The Guardian signatures combined with the message form a proof called a [Verified Action Approval (VAA)](https://docs.wormhole.com/wormhole/explore-wormhole/vaa){target=_blank}. These VAAs are delivered to their destinations by [relayers](https://docs.wormhole.com/wormhole/explore-wormhole/relayer){target=_blank} within the Wormhole network. On the destination chain, the VAA is used to perform an action. In this case, the VAA is passed into the `wormholeTransferERC20` function of the GMP Precompile, which processes the VAA and relays the tokens to a parachain using XCM messages.

Moonbeam's team will run a Wormhole relayer to help with this process, but other actors may as well. Please note that as a parachain integrating MRL, you will likely not need to implement or use the GMP Precompile.

![Transfering wormhole MRL](/images/builders/interoperability/mrl/mrl-1.png)

### Send Tokens From a Parachain Back Through Wormhole {: #sending-tokens-back-through-wormhole }

To send tokens from a parachain back through Wormhole to a destination chain, a user will need to send a transaction using the `utility.batchAll` extrinsic, which will batch the `xTokens.transferMultiassets`, and `polkadotXcm.send` extrinsics into a single transaction. This is a one-click solution, but for the time being, it will require xcGLMR as a fee token, requiring the user to also own xcGLMR on the parachain. In the future, the [X-Tokens Pallet](/builders/interoperability/xcm/xc20/xtokens#x-tokens-pallet-interface){target=_blank} will be updated, allowing for your native gas currency to be used as a fee token instead. Parachains that use a different pallet will need to implement their own solution to transfer reserve and non-reserve assets in a single message.

A brief overview of the entire process of sending MRL tokens from a parachain back through Wormhole to a destination chain is as follows:

1. Send a batch transaction using the `batchAll` extrinsic of the [Utility Pallet](/builders/pallets-precompiles/pallets/utility){target=_blank} that contains the following two calls:
    - **`xTokens.transferMultiassets`** - sends xcGLMR and the local XC-20 to the user’s multilocation-derivative account. The multilocation-derivative account is a keyless account on Moonbeam that an account on another parachain has control of via XCM
    - **`polkadotXcm.send`** - sends a remote EVM call to the Batch Precompile on Moonbeam, which batches the following two calls into a single remote EVM transaction using the `ethereumXcm.transact` extrinsic:
        - **`approve`** (of the local XC-20 contract) - approves the Wormhole relayer to transfer the local XC-20
        - **`transferTokensWithRelay`** (of the relayer contract) - calls the `transferTokensWithPayload` function of the Wormhole TokenBridge smart contract on Moonbeam to transfer the tokens cross-chain, which broadcasts the message for the Wormhole Guardians to pick up
2. The Guardian Network will pick up on the Wormhole transaction and sign it
3. A Wormhole relayer will relay the tokens to the destination chain and destination account

![Transfering Wormhole MRL out](/images/builders/interoperability/mrl/mrl-2.png)

Now that you have a general idea of the game plan, you can begin to implement it. The example in this guide will show you how to transfer assets from a parachain to Moonbase Alpha and back through Wormhole to the destination chain, but this guide can be adapted for Moonbeam.

#### Calculate the Multilocation-Derivative Account {: #calculate-multilocation-derivative-account }

In order to send tokens back through Wormhole, you'll need to calculate the user's multilocation-derivative account on Moonbeam. This can be done off-chain using the [`calculate-multilocation-derivative-account.ts` script](https://github.com/Moonsong-Labs/xcm-tools/blob/main/scripts/calculate-multilocation-derivative-account.ts){target=_blank} from the [xcm-tools repository](https://github.com/Moonsong-Labs/xcm-tools){target=_blank}. For more details, you can refer to the [Calculating the Multilocation-Derivative Account](/builders/interoperability/xcm/remote-evm-calls/#calculate-multilocation-derivative){target=_blank} section of the Remote EVM Calls documentation.

Alternatively, the `multilocationToAddress` function of the [XCM Utilities Precompile](/builders/pallets-precompiles/precompiles/xcm-utils) can also be used.

#### Build the Transfer Multiassets Extrinsic {: #build-transfer-multiassets }

Once you have the multilocation-derivative account, you can begin to construct the `utility.batchAll` transaction. To get started, you'll need to make sure you have a few packages installed:

```bash
npm i @polkadot/api ethers
```

Now you can begin to tackle the `xTokens.transferMultiassets` extrinsic, which accepts four parameters: `assets`, `feeItem`, `dest`, and `destWeightLimit`. You can find out more information on each of the parameters in the [X-Tokens Pallet Interface](/builders/interoperability/xcm/xc20/xtokens#x-tokens-pallet-interface){target=_blank} documentation.

In short, the `assets` parameter defines the multilocation and amount of xcDEV and the local XC-20 to send to Moonbase Alpha, with the xcDEV positioned as the first asset and the local XC-20 as the second. The `feeItem` is set to the index of the xcDEV asset, which in this case is `0`, so that DEV is used to pay for the execution fees in Moonbase Alpha. The `dest` is a multilocation that defines the multilocation-derivative account that you calculated in the previous section on Moonbase Alpha.

For this example, the `xTokens.transferMultiassets` extrinsic will look like the following:

???+ code "Transfer multiassets logic"

    ```js
    --8<-- 'code/mrl/transfer-multiassets.js'
    ```

To modify the script for Moonbeam, you'll use the following configurations:

|           Parameter            | Value |
|:------------------------------:|:-----:|
|          Parachain ID          | 2004  |
|     Balances Pallet Index      |  10   |
| ERC-20 XCM Bridge Pallet Index |  110  |

#### Build the Remote EVM Call {: #build-the-remote-evm-call }

To generate the second call of the batch transaction, the `polkadotXcm.send` extrinsic, you'll need to create the EVM transaction and then assemble the XCM instructions that execute said EVM transaction. The EVM transaction can be constructed as a transaction that interacts with the [Batch Precompile](/builders/pallets-precompiles/precompiles/batch){target=_blank} so that two transactions can happen in one. This is helpful because this EVM transaction has to both approve a Wormhole relayer to relay the local XC-20 token as well as the relay action itself.

To create the batch transaction and wrap it in a remote EVM call to be executed on Moonbeam, you'll need to take the following steps:

1. Create contract instances of the local XC-20, [the Wormhole relayer](https://github.com/wormhole-foundation/example-token-bridge-relayer/blob/main/evm/src/token-bridge-relayer/TokenBridgeRelayer.sol){target=_blank}, and the [Batch Precompile](https://github.com/moonbeam-foundation/moonbeam/blob/master/precompiles/batch/Batch.sol){target=_blank}. For this, you'll need the ABI for each contract:

    ??? code "ERC-20 Interface ABI"

        ```js
        --8<-- 'code/mrl/abi/ERC20.js'
        ```

    ??? code "TokenBridge Relayer ABI"

        ```js
        --8<-- 'code/mrl/abi/TokenRelayer.js'
        ```

    ??? code "Batch Precompile ABI"

        ```js
        --8<-- 'code/mrl/abi/Batch.js'
        ```

    You'll also need the address of a Wormhole relayer. For this example, you can use the xLabs relayer address:

    === "Moonbeam"

        ```text
        0xcafd2f0a35a4459fa40c0517e17e6fa2939441ca
        ```

    === "Moonbase Alpha"

        ```text
        0x9563a59c15842a6f322b10f69d1dd88b41f2e97b
        ```

2. Use Ether's `encodeFunctionData` function to get the encoded call data for the two calls in the batch transaction: the `approve` transaction and the `transferTokensWithRelay` transaction
3. Combine the two transactions into a batch transaction and use Ether's `encodeFunctionData` to get the encoded call data for the batch transaction
4. Use the encoded call data for the batch transaction to create the remote EVM call via the `ethereumXcm.transact` extrinsic, which accepts the `xcmTransaction` as the parameter. For more information, please refer to the [Remote EVM Calls documentation](/builders/interoperability/xcm/remote-evm-calls#ethereum-xcm-pallet-interface){target=_blank}

???+ code "Create remote EVM call logic"

    ```js
    --8<-- 'code/mrl/evm-tx.js'
    ```

Next, you'll need to create the extrinsic to send the remote EVM call to Moonbeam. To do so, you'll want to send an XCM message such that the `Transact` XCM instruction gets successfully executed. The most common method to do this is through `polkadotXcm.send` and sending the `WithdrawAsset`, `BuyExecution`, and `Transact` instructions. `RefundSurplus` and `DepositAsset` can also be used to ensure no assets get trapped, but they are technically optional.

???+ code "Send remote EVM call logic"

    ```js
    --8<-- 'code/mrl/polkadotxcm-send.js'
    ```

#### Build the Batch Extrinsic {: #build-batch-extrinsic }

To ensure that both the `xTokens.transferMultiassets` and the `polkadotXcm.send` transactions are sent together, you can batch them together using `utility.batchAll`. At the time of writing, this helps ensure that the asset transfer happens before the EVM transaction, a necessary distinction. Unfortunately, this is subject to change with future XCM updates.  

???+ code "Batch the transfer multiassets and send remote EVM calls"

    ```js
    --8<-- 'code/mrl/batch-extrinsics.js'
    ```

??? code "View the complete script"

    ```js
    --8<-- 'code/mrl/complete-script.js'
    ```

If you would like to see an example project that fully implements this, an example is available in a [GitHub repository](https://github.com/jboetticher/mrl-reverse){target=_blank}.  

It’s important to note that not every parachain will have X-Tokens and the other pallets implemented in a way that will allow this path. Substrate-based chains are very flexible, to the point where a standard doesn’t exist. If you believe your parachain does not support this path, please provide an alternative solution in the [Moonbeam forum](https://forum.moonbeam.network/){target=_blank} and to the Wormhole team.

### Tokens Available Through Wormhole {: #tokens-available-through-wormhole }

While Wormhole has the technical capability to bridge any token across chains, relayers will not support every token for fees. The ERC-20 assets that can be bridged through Wormhole's MRL solution are dependent on the tokens that the [xLabs relayer](https://xlabs.xyz/){target=_blank} takes in. The tokens that are available to Moonbeam are listed in the table below:  

| Token Name |                  Address                   |
|:----------:|:------------------------------------------:|
|    WETH    | 0xab3f0245B83feB11d15AAffeFD7AD465a59817eD |
|    USDC    | 0x931715FEE2d06333043d11F658C8CE934aC61D0c |
|    USDT    | 0xc30E9cA94CF52f3Bf5692aaCF81353a27052c46f |
|    WBTC    | 0xE57eBd2d67B462E9926e04a8e33f01cD0D64346D |
|    WBNB    | 0xE3b841C3f96e647E6dc01b468d6D0AD3562a9eeb |
|   WMATIC   | 0x82DbDa803bb52434B1f4F41A6F0Acb1242A7dFa3 |
|   WAVAX    | 0xd4937A95BeC789CC1AE1640714C61c160279B22F |
|    WFTM    | 0x609AedD990bf45926bca9E4eE988b4Fb98587D3A |
|    CELO    | 0xc1a792041985F65c17Eb65E66E254DC879CF380b |
|   WGLMR    | 0xAcc15dC74880C9944775448304B263D191c6077F |
|    SUI     | 0x484eCCE6775143D3335Ed2C7bCB22151C53B9F49 |

Please take the time to verify that these assets are still Wormhole assets on Moonbeam by using the [Wormhole asset verifier](https://www.portalbridge.com/#/token-origin-verifier){target=_blank}.  

--8<-- 'text/disclaimers/third-party-content.md'
