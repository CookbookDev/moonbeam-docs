---
title: Index Moonbeam Data with Subsquid
description: Learn how to use Subsquid, a query node framework for Substrate-based chains, to index and process Substrate and EVM data for Moonbeam and Moonriver.
---

# Indexing Moonbeam with Subsquid

## Introduction {: #introduction }

[Subsquid](https://subsquid.io){target=_blank} is a query node framework for Substrate-based blockchains. In very simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities.

Subsquid has native and full support for both Ethereum Virtual Machine (EVM) and Substrate data. Since Moonbeam is a Substrate-based smart contact platform that is EVM-compatible, Subsquid can be used to index both EVM and Substrate-based data. Subsquid offers a Substrate Archive and Processor and an EVM Archive and Processor. The Substrate Archive and Processor can be used to index both Substrate and EVM data. This allows developers to extract on-chain data from any of the Moonbeam networks and process EVM logs as well as Substrate entities (events, extrinsics, and storage items) in one single project and serve the resulting data with one single GraphQL endpoint. If you exclusively want to index EVM data, it is recommended to use the EVM Archive and Processor.

This guide will show you how to create Substrate and EVM projects with Subsquid and configure it to index data on Moonbeam. 

--8<-- 'text/_disclaimers/third-party-content-intro.md'

## Checking Prerequisites {: #checking-prerequisites }

To get started with Subsquid, you'll need to have the following:

- [Node.js](https://nodejs.org/en/download/){target=_blank} version 16 or newer
- [Docker](https://docs.docker.com/get-docker/){target=_blank}
- [Squid CLI](https://docs.subsquid.io/squid-cli/installation/){target=_blank} v2.1.0 or newer

!!! note
    The squid template is not compatible with `yarn`, so you'll need to use `npm` instead.

## Index Substrate Data on Moonbeam {: #index-substrate-calls-events }

To get started indexing Substrate data on Moonbeam, you'll need to create a Subsquid project and configure it for Moonbeam by taking the following steps:

1. Create a Subsquid project based on the Substrate template by running:

    ```bash
    sqd init <insert-squid-name> --template substrate
    ```

    For more information on getting started with this template, please check out the [Quickstart: Substrate chains](https://docs.subsquid.io/quickstart/quickstart-substrate/){target=_blank} guide on Subsquid's documentation site.

2. To configure your Subsquid project to run on Moonbeam, you'll need to update the `typegen.json` file. The `typegen.json` file is responsible for generating TypeScript interface classes for your data. Depending on the network you're indexing data on, the `specVersions` value in the `typegen.json` file should be configured as follows:

    === "Moonbeam"

        ```json
        "specVersions": "https://moonbeam.archive.subsquid.io/graphql",
        ```

    === "Moonriver"

        ```json
        "specVersions": "https://moonriver.archive.subsquid.io/graphql",
        ```

    === "Moonbase Alpha"

        ```json
        "specVersions": "https://moonbase.archive.subsquid.io/graphql",
        ```

3. Modify the `src/processor.ts` file, which is where squids instantiate the processor, configure it, and attach handler functions. The processor fetches historical on-chain data from an [Archive](https://docs.subsquid.io/archives/overview/){target=_blank}, which is a specialized data lake. You'll need to configure your processor to pull data from the Archive that corresponds to the network you are indexing data on:

    === "Moonbeam"

        ```ts
        const processor = new SubstrateBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonbeam.rpc_url }},
          // Resolves to "https://moonbeam.archive.subsquid.io"
          archive: lookupArchive("moonbeam", { type: "Substrate" }),
        });
        ```

    === "Moonriver"

        ```ts
        const processor = new SubstrateBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonriver.rpc_url }},
          // Resolves to "https://moonriver.archive.subsquid.io"
          archive: lookupArchive("moonriver", { type: "Substrate" }),
        });
        ```

    === "Moonbase Alpha"

        ```ts
        const processor = new SubstrateBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonbase.rpc_url }},
          // Resolves to "https://moonbase.archive.subsquid.io"
          archive: lookupArchive("moonbase", { type: "Substrate" }),
        });
        ```

And that's all you have to do to configure your Subsquid project to index Substrate data on Moonbeam! Now you can update the `schema.graphql`, `typgen.json`, and `src/processor.ts` files to index the data you need for your project!

## Index Ethereum Data on Moonbeam {: #index-ethereum-contracts }

To get started indexing EVM data on Moonbeam, you'll need to create a Subsquid project and configure it for Moonbeam by taking the following steps:

1. You can create a Subsquid project for EVM data by using the generic [EVM template](https://github.com/subsquid-labs/squid-evm-template){target=_blank} or you can use the [ABI template](https://github.com/subsquid-labs/squid-abi-template){target=_blank} for indexing data related to a specific contract:

    === "EVM"

        ```bash
        sqd init <insert-squid-name> --template evm
        ```

    === "ABI"

        ```bash
        sqd init <insert-squid-name> --template abi
        ```

    For more information on getting started with both of these templates, please check out the following Subsquid docs:
      
      - [Quickstart: EVM chains](https://docs.subsquid.io/quickstart/quickstart-ethereum/){target=_blank}
      - [Quickstart: generate from ABI](https://docs.subsquid.io/quickstart/quickstart-abi/){target=_blank}

2. To configure your Subsquid project to run on Moonbeam, you'll need to update the `typegen.json` file. The `typegen.json` file is responsible for generating TypeScript interface classes for your data. Depending on the network you're indexing data on, the `specVersions` value in the `typegen.json` file should be configured as follows:

    === "Moonbeam"

        ```json
        "specVersions": "https://moonbeam.archive.subsquid.io/graphql",
        ```

    === "Moonriver"

        ```json
        "specVersions": "https://moonriver.archive.subsquid.io/graphql",
        ```

    === "Moonbase Alpha"

        ```json
        "specVersions": "https://moonbase.archive.subsquid.io/graphql",
        ```

3. Modify the `src/processor.ts` file, which is where squids instantiate the processor, configure it, and attach handler functions. The processor fetches historical on-chain data from an [Archive](https://docs.subsquid.io/archives/overview/){target=_blank}, which is a specialized data lake. You'll need to configure your processor to pull data from the Archive that corresponds to the network you are indexing data on:

    === "Moonbeam"

        ```ts
        const processor = new EvmBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonbeam.rpc_url }},
          // Resolves to "https://moonbeam-evm.archive.subsquid.io"
          archive: lookupArchive("moonbeam", { type: "EVM" })
        });
        ```

    === "Moonriver"

        ```ts
        const processor = new EvmBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonriver.rpc_url }},
          // Resolves to "https://moonriver-evm.archive.subsquid.io"
          archive: lookupArchive("moonriver", { type: "EVM" }),
        });
        ```

    === "Moonbase Alpha"

        ```ts
        const processor = new EvmBatchProcessor();
        processor.setDataSource({
          chain: {{ networks.moonbase.rpc_url }},
          // Resolves to "https://moonbase-evm.archive.subsquid.io"
          archive: lookupArchive("moonbase", { type: "EVM" }),
        });
        ```

And that's all you have to do to configure your Subsquid project to index EVM data on Moonbeam! Now you can update the `schema.graphql`, `typgen.json`, and `src/processor.ts` files to index the data you need for your project!

If you're interested in a step-by-step tutorial to get started indexing data on Moonbeam, you can check out the [Index NFT Token Transfers on Moonbeam with Subsquid](/tutorials/integrations/nft-subsquid){target=_blank} tutorial!

--8<-- 'text/_disclaimers/third-party-content.md'
