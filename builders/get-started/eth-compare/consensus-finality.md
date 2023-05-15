---
title: Consensus & Finality
description: The main differences that Ethereum developers should understand in terms of consensus and finality on Moonbeam and how it differs from Ethereum.
---

# Moonbeam Consensus & Finality

![Moonbeam v Ethereum - Consensus and Finality Banner](/images/builders/get-started/eth-compare/consensus-finality-banner.png)

## Introduction {: #introduction }

While Moonbeam strives to be compatible with Ethereum's Web3 API and EVM, there are some important Moonbeam differences that developers should know and understand in terms of consensus and finality.

In short, consensus is a way for different parties to agree on a shared state. As blocks are created, nodes in the network must decide which block will represent the next valid state. Finality defines when that valid state cannot be altered or reversed.

Ethereum began by using a consensus protocol based on [Proof-of-Work (PoW)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/){target=_blank}, which provides probabilistic finality. However, in 2022, Ethereum switched to [Proof-of-Stake (PoS)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/){target=_blank}, which provides deterministic finality, and no longer uses PoW. In contrast, Moonbeam uses a hybrid consensus protocol based on Delegated Proof-of-Stake (DPoS), which also provides deterministic finality. DPoS is an evolution of Polkadot's [Nominated Proof of Stake (NPoS)](https://wiki.polkadot.network/docs/learn-consensus){target=_blank} concept, that puts more power into the hands of token holders by allowing delegators to choose which collator candidate they want to support and in what magnitude.

This guide will outline some of these main differences around consensus and finality, and what to expect when using Moonbeam for the first time.

## Ethereum Consensus and Finality {: #ethereum-consensus-and-finality }

As stated before, Ethereum is currently using a PoS consensus protocol, in which validators stake ETH in the network and are responsible for producing blocks and checking the validity of new blocks. The timing of block production is fixed and is divided into 12 second slots and 32 slot epochs. One validator per slot is randomly selected to produce a block and broadcast it to the network. There is a randomly selected committee of validators per slot that is responsible for determining the validity of the block. The greater the stake in the network, the greater the chance the validator will be chosen to produce or validate a block.

Finality is deterministic in Ethereum's PoS consensus protocol and is achieved through "checkpoint" blocks. Validators agree on the state of a block at particular checkpoint blocks, which are always the first block in an epoch, and if two-thirds of the validators agree, the block is finalized. Block finality can be reverted; however, there are strong economic incentives in place so validators do not attempt to collude to revert a block. You can find out more information in Vitalik's [On Settlement Finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/){target=blank} blog, under the Finality in Casper section.

## Moonbeam Consensus and Finality {: #moonbeam-consensus-and-finality }

In Polkadot, there are collators and validators. [Collators](https://wiki.polkadot.network/docs/en/learn-collator){target=_blank} maintain parachains (in this case, Moonbeam) by collecting transactions from users and producing state transition proofs for the relay chain [validators](https://wiki.polkadot.network/docs/en/learn-validator){target=_blank}. The collator set (nodes that produce blocks) is selected based on the [stake they have in the network](/learn/features/consensus/){target=_blank}.

For finality, Polkadot and Kusama rely on [GRANDPA](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=_blank}. GRANDPA provides deterministic finality for any given transaction (block). In other words, when a block or transaction is marked as final, it can't be reverted except via on-chain governance or forking. Moonbeam follows this deterministic finality.

## Main Differences Between PoS and DPoS {: #main-differences }

In terms of consensus, Moonbeam is based on Delegated Proof-of-Stake, while Ethereum relies on a standard Proof-of-Stake system, which is slightly different. Although both mechanisms rely on the use of stake to validate and create new blocks, there are some key differences.

With PoS on Ethereum, validators are selected to produce and validate blocks based on their own stake in the network. As long as a validator has placed a validator deposit, they can be selected to produce and validate blocks. However, as previously mentioned, the greater the stake in the network, the higher the chances a validator has to be selected to produce and validate blocks.

On the other hand, with DPoS on Moonbeam, collators are selected to produce blocks based on their own stake plus their delegated stake in the network. Any token holder can choose to delegate their stake to a collator candidate. However, not all collator candidates are eligible to produce and validate blocks, they must be in the active set. The active set consists of the top candidates by stake, including delegations. The number of candidates in the active set is subject to [governance](/learn/features/governance){target=_blank}.

In terms of finality, blocks on Ethereum can take quite a bit longer to finalize than on Moonbeam due to the checkpoint finality system it uses. In Ethereum, validators determine finality at checkpoint blocks, which are always the first block in an epoch. Since an epoch has 32 slots and each slot is 12 seconds, it'll take at least 384 seconds, or 6.4 minutes for a block to be finalized.

Moonbeam does not use checkpoint blocks and instead relies on Polkadot's GRANDPA finality gadget, where the finality process is completed in parallel to block production. In addition, the finality process incorporates the blockchain's structure, which allows the relay chain validators to vote on the highest block that they think is valid. In this scenario, the vote would apply to all of the blocks leading up to the one that is finalized, which speeds up the finalization process. After a block has been included in the relay chain, a block can be finalized within one block on Moonbeam.

## Strategy to Check Transaction Finality {: #strategy-to-check-tx-finality }

Although the finality gadgets differ, you can use the same, fairly simple strategy to check for transaction finality on both Ethereum and Moonbeam:

 1. You ask the network for the hash of the latest finalized block
 2. You retrieve the block number using the hash
 3. You compare it with the block number of your transaction. If your transaction was included in a previous block, it is finalized
 4. As a safety check, retrieve the block by number and verify that the given transaction hash is in the block

The following sections outline how you can check for transaction finality using both the Ethereum JSON-RPC (custom Web3 request) and the Substrate (Polkadot) JSON-RPC.

## Checking Transaction Finality with Moonbeam RPC Endpoints {: #checking-tx-finality-with-moonbeam-rpc-endpoints }

Moonbeam has added support for two custom RPC endpoints, `moon_isBlockFinalized` and `moon_isTxFinalized`, that can be used to check whether an on-chain event is finalized. 

For more information, you can go to the [Finality RPC Endpoints](/builders/build/moonbeam-custom-api#finality-rpc-endpoints){target=_blank} section of the Moonbeam Custom API page.

## Checking Transaction Finality with Ethereum Libraries {: #checking-tx-finality-with-ethereum-libraries }

You can make calls to the Substrate JSON-RPC using the `send` method of both [Web3.js](https://web3js.readthedocs.io/){target=_blank} and [Ethers.js](https://docs.ethers.io/){target=_blank}. Custom RPC requests are also possible using [Web3.py](https://web3py.readthedocs.io/){target=_blank} with the `make_request` method. You can use the Web3.js example as a baseline.

The code snippets rely on two custom RPC requests from the Substrate JSON-RPC: `chain_getFinalizedHead` and `chain_getHeader`. The first request gets the block hash of the last finalized block. The second request gets the block header for a given block hash. The same is true for `eth_getBlockByNumber` and `eth_getTransactionReceipt` to check if the given transaction hash is included in the block.

--8<-- 'text/common/endpoint-examples.md'

!!! note
    The code snippets presented in the following sections are not meant for production environments. Please make sure you adapt it for each use-case.

=== "Web3.js"
    --8<-- 'code/vs-ethereum/web3.md'

=== "Ethers.js"
    --8<-- 'code/vs-ethereum/ethers.md'

=== "Web3.py"
    --8<-- 'code/vs-ethereum/web3py.md'

## Checking Transaction Finality with Substrate Libraries {: #checking-tx-finality-with-substrate-libraries }

The [Polkadot.js API package](/builders/build/substrate-api/polkadot-js-api){target=_blank} and [Python Substrate Interface package](/builders/build/substrate-api/py-substrate-interface){target=_blank} provide developers with a way to interact with Substrate chains using JavaScript and Python.

Given a transaction hash (`tx_hash`), the following code snippets fetch the current finalized block and compare it with the block number of the transaction you've provided. The code relies on three RPC requests from the Substrate JSON-RPC: 

- `chain_getFinalizedHead` - the first request gets the block hash of the last finalized block
- `chain_getHeader` - the second request gets the block header for a given block hash
- `eth_getTransactionReceipt` - this retrieves the transaction receipt given the transaction hash

You can find more information about Polkadot.js and the Substrate JSON RPC in the [official Polkadot.js documentation site](https://polkadot.js.org/docs/substrate/rpc){target=_blank}, and more about Python Substrate Interface in the [official PySubstrate documentation site](https://polkascan.github.io/py-substrate-interface/){target=_blank}.

=== "Polkadot.js"
    --8<-- 'code/vs-ethereum/polkadotjs.md'

=== "py-substrate-interface"
    --8<-- 'code/vs-ethereum/pysubstrateinterface.md'

--8<-- 'text/disclaimers/third-party-content.md'