---
title: Governance
description: As a Polkadot parachain, Moonbeam uses an on-chain governance system, allowing for a stake-weighted vote on public referenda.
---

# Governance on Moonbeam

## Introduction {: #introduction } 

The goal of Moonbeam’s governance mechanism is to advance the protocol according to the desires of the community. In that shared mission, the governance process seeks to include all token holders. Any and all changes to the protocol must go through a referendum so that all token holders, weighted by stake, can have input on the decision.

Governance forums like the [Moonbeam Community Forum](https://forum.moonbeam.foundation/){target=_blank} and [Polkassembly](https://moonbeam.polkassembly.network/){target=_blank} enable open discussion and allow proposals to be refined based on community input. Autonomous enactments and [forkless upgrades](https://wiki.polkadot.network/docs/learn-runtime-upgrades#forkless-upgrades/){target=_blank} unite the community towards a shared mission to advance the protocol.

With the rollout of OpenGov (originally referred to as Gov2), the second phase of governance in Polkadot, several modifications have been introduced to the governance process. You can read the [OpenGov: What is Polkadot Gov2](https://moonbeam.network/blog/opengov/){target=_blank} blog post, which provides an overview of all of the changes made in OpenGov. **OpenGov has launched on Moonriver, and once it has been rigorously tested, a proposal will be made for it to be launched on Moonbeam**. Until then, Moonbeam still uses Governance v1.

## Principles {: #principles } 

Guiding "soft" principles for engagement with Moonbeam's governance process include:

 - Being inclusive to token holders that want to engage with Moonbeam and that are affected by governance decisions
 - Favoring token holder engagement, even with views contrary to our own, versus a lack of engagement
 - A commitment to openness and transparency in the decision-making process
 - Working to keep the greater good of the network ahead of any personal gain  
 - Acting at all times as a moral agent that considers the consequences of action (or inaction) from a moral standpoint
 - Being patient and generous in our interactions with other token holders, but not tolerating abusive or destructive language, actions, and behavior, and abiding by [Moonbeam’s Code of Conduct](https://github.com/moonbeam-foundation/code-of-conduct){target=_blank}

These points were heavily inspired by Vlad Zamfir’s writings on governance. Refer to his articles, especially the [How to Participate in Blockchain Governance in Good Faith (and with Good Manners)](https://medium.com/@Vlad_Zamfir/how-to-participate-in-blockchain-governance-in-good-faith-and-with-good-manners-bd4e16846434){target=_blank} Medium article.

## On-Chain Governance Mechanics {: #on-chain-governance-mechanics } 

The "hard" governance process for Moonbeam will be driven by an on-chain process that allows the majority of tokens on the network to determine the outcomes of key decisions around the network. These decision points come in the form of stake-weighted voting on proposed referenda. 

Some of the main components of this governance model include:

 - **Referenda** — a stake-based voting scheme where each referendum is tied to a specific proposal for a change to the Moonbeam system including values for key parameters, code upgrades, or changes to the governance system itself
 - **Voting** — referendum will be voted on by token holders on a stake-weighted basis. Referenda which pass are subject to delayed enactment such that people that disagree with the direction of the decision have time to exit the network
 - **Council & Technical Committee Governance V1** — a group of community members who have special voting rights within the system
 - **OpenGov Technical Committee** — a group of community members who can add certain proposals to the Whitelisted Track

For more details on how these Substrate frame pallets implement on-chain governance, you can checkout the [Walkthrough of Polkadot’s Governance](https://polkadot.network/a-walkthrough-of-polkadots-governance/){target=_blank} blog post and the [Polkadot Governance Wiki](https://wiki.polkadot.network/docs/learn-governance){target=_blank}.

## Governance v2: OpenGov {: #opengov }

This section will cover everything you need to know about OpenGov on Moonriver and Moonbase Alpha. If you're looking for governance-related information on Moonbeam, please refer to the [Governance v1](#governance-v1) section.

### General Definitions {: #general-definitions-gov2 }

--8<-- 'text/governance/proposal-definitions.md'

--8<-- 'text/governance/preimage-definitions.md'

 - **Origin** - an authorization-based dispatch source for an operation, which is used to determine the Track that a referendum is posted under
 - **Track** - an Origin-specific pipeline that outlines the life cycle of proposals. Currently, there are five Tracks:

    |    Origin Track     |                                   Description                                    |                         Referendum Examples                          |
    |:-------------------:|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------:|
    |        Root         |                                Highest privilege                                 |           Runtime upgrades, Technical Committee management           |
    |     Whitelisted     | Proposals to be whitelisted by the Technical Committee before getting dispatched |                       Fast-tracked operations                        |
    |    General Admin    |                          For general on-chain decisions                          | Changes to XCM fees, Orbiter program, Staking parameters, Registrars |
    | Emergency Canceller |          For cancellation of a referendum. Decision Deposit is refunded          |                    Wrongly constructed referendum                    |
    |  Emergency Killer   |       For killing of bad/malicious referendum. Decision Deposit is slashed       |                         Malicious referendum                         |

--8<-- 'text/governance/vote-conviction-definitions.md'

--8<-- 'text/governance/approval-support-definitions.md'

--8<-- 'text/governance/lead-in-definitions.md'
    Please refer to the [Governance Parameters](#governance-parameters-v2) section for more information

 - **Decide Period** - token holders continue to vote on the referendum. If a referendum does not pass by the end of the period, it will be rejected, and the Decision Deposit will be refunded
 - **Confirm Period** - a period of time within the Decide Period where the referendum needs to have maintained enough Approval and Support to be approved and move to the Enactment Period
 - **Enactment Period** - a specified time, which is defined at the time the proposal was created, that an approved referendum waits before it can be dispatched. There is a minimum amount of time for each Track

--8<-- 'text/governance/delegation-definitions.md'

### Governance Parameters {: #governance-parameters-v2 }

=== "Moonriver"
    |          Variable           |                            Value                            |
    |:---------------------------:|:-----------------------------------------------------------:|
    |    Preimage base deposit    |     {{ networks.moonriver.preimage.base_deposit }} MOVR     |
    |  Preimage deposit per byte  |     {{ networks.moonriver.preimage.byte_deposit }} MOVR     |
    | Proposal Submission Deposit | {{ networks.moonriver.governance.submission_deposit }} MOVR |

=== "Moonbase Alpha"
    |          Variable           |                           Value                           |
    |:---------------------------:|:---------------------------------------------------------:|
    |    Preimage base deposit    |     {{ networks.moonbase.preimage.base_deposit }} DEV     |
    |  Preimage deposit per byte  |     {{ networks.moonbase.preimage.byte_deposit }} DEV     |
    | Proposal Submission Deposit | {{ networks.moonbase.governance.submission_deposit }} DEV |

#### General Parameters by Track {: #general-parameters-by-track }

=== "Moonriver"
    |         Track          | Track ID |                                    Capacity                                     |                              Decision<br>Deposit                               |
    |:----------------------:|:--------:|:-------------------------------------------------------------------------------:|:------------------------------------------------------------------------------:|
    |          Root          |    0     |     {{ networks.moonriver.governance.tracks.root.max_deciding }} proposals      |     {{ networks.moonriver.governance.tracks.root.decision_deposit }} MOVR      |
    |      Whitelisted       |    1     |  {{ networks.moonriver.governance.tracks.whitelisted.max_deciding }} proposals  |  {{ networks.moonriver.governance.tracks.whitelisted.decision_deposit }} MOVR  |
    |     General Admin      |    2     | {{ networks.moonriver.governance.tracks.general_admin.max_deciding }} proposals | {{ networks.moonriver.governance.tracks.general_admin.decision_deposit }} MOVR |
    | Emergency<br>Canceller |    3     |   {{ networks.moonriver.governance.tracks.canceller.max_deciding }} proposals   |   {{ networks.moonriver.governance.tracks.canceller.decision_deposit }} MOVR   |
    |  Emergency<br>Killer   |    4     |    {{ networks.moonriver.governance.tracks.killer.max_deciding }} proposals     |    {{ networks.moonriver.governance.tracks.killer.decision_deposit }} MOVR     |

=== "Moonbase Alpha"
    |         Track          | Track ID |                                    Capacity                                    |                             Decision<br>Deposit                              |
    |:----------------------:|:--------:|:------------------------------------------------------------------------------:|:----------------------------------------------------------------------------:|
    |          Root          |    0     |     {{ networks.moonbase.governance.tracks.root.max_deciding }} proposals      |     {{ networks.moonbase.governance.tracks.root.decision_deposit }} DEV      |
    |      Whitelisted       |    1     |  {{ networks.moonbase.governance.tracks.whitelisted.max_deciding }} proposals  |  {{ networks.moonbase.governance.tracks.whitelisted.decision_deposit }} DEV  |
    |     General Admin      |    2     | {{ networks.moonbase.governance.tracks.general_admin.max_deciding }} proposals | {{ networks.moonbase.governance.tracks.general_admin.decision_deposit }} DEV |
    | Emergency<br>Canceller |    3     |   {{ networks.moonbase.governance.tracks.canceller.max_deciding }} proposals   |   {{ networks.moonbase.governance.tracks.canceller.decision_deposit }} DEV   |
    |  Emergency<br>Killer   |    4     |    {{ networks.moonbase.governance.tracks.killer.max_deciding }} proposals     |    {{ networks.moonbase.governance.tracks.killer.decision_deposit }} DEV     |

#### Period Parameters by Track {: #period-parameters-by-track }

=== "Moonriver"
    |         Track          |                                                                            Prepare<br>Period                                                                             |                                                                              Decide<br>Period                                                                              |                                                                            Confirm<br>Period                                                                             |                                                                             Minimum<br>Enactment Period                                                                              |
    |:----------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |          Root          |          {{ networks.moonriver.governance.tracks.root.prepare_period.blocks }} blocks <br>({{ networks.moonriver.governance.tracks.root.prepare_period.time }})          |          {{ networks.moonriver.governance.tracks.root.decision_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.root.decision_period.time }})          |          {{ networks.moonriver.governance.tracks.root.confirm_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.root.confirm_period.time }})          |          {{ networks.moonriver.governance.tracks.root.min_enactment_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.root.min_enactment_period.time }})          |
    |      Whitelisted       |   {{ networks.moonriver.governance.tracks.whitelisted.prepare_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.whitelisted.prepare_period.time }})   |   {{ networks.moonriver.governance.tracks.whitelisted.decision_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.whitelisted.decision_period.time }})   |   {{ networks.moonriver.governance.tracks.whitelisted.confirm_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.whitelisted.confirm_period.time }})   |   {{ networks.moonriver.governance.tracks.whitelisted.min_enactment_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.whitelisted.min_enactment_period.time }})   |
    |     General Admin      | {{ networks.moonriver.governance.tracks.general_admin.prepare_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.general_admin.prepare_period.time }}) | {{ networks.moonriver.governance.tracks.general_admin.decision_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.general_admin.decision_period.time }}) | {{ networks.moonriver.governance.tracks.general_admin.confirm_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.general_admin.confirm_period.time }}) | {{ networks.moonriver.governance.tracks.general_admin.min_enactment_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.general_admin.min_enactment_period.time }}) |
    | Emergency<br>Canceller |     {{ networks.moonriver.governance.tracks.canceller.prepare_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.canceller.prepare_period.time }})     |     {{ networks.moonriver.governance.tracks.canceller.decision_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.canceller.decision_period.time }})     |     {{ networks.moonriver.governance.tracks.canceller.confirm_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.canceller.confirm_period.time }})     |     {{ networks.moonriver.governance.tracks.canceller.min_enactment_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.canceller.min_enactment_period.time }})     |
    |  Emergency<br>Killer   |        {{ networks.moonriver.governance.tracks.killer.prepare_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.killer.prepare_period.time }})        |        {{ networks.moonriver.governance.tracks.killer.decision_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.killer.decision_period.time }})        |        {{ networks.moonriver.governance.tracks.killer.confirm_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.killer.confirm_period.time }})        |        {{ networks.moonriver.governance.tracks.killer.min_enactment_period.blocks }} blocks<br> ({{ networks.moonriver.governance.tracks.killer.min_enactment_period.time }})        |

=== "Moonbase Alpha"
    |         Track          |                                                                           Prepare<br>Period                                                                            |                                                                             Decide<br>Period                                                                             |                                                                           Confirm<br>Period                                                                            |                                                                            Minimum<br>Enactment Period                                                                             |
    |:----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |          Root          |          {{ networks.moonbase.governance.tracks.root.prepare_period.blocks }} blocks <br>({{ networks.moonbase.governance.tracks.root.prepare_period.time }})          |          {{ networks.moonbase.governance.tracks.root.decision_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.root.decision_period.time }})          |          {{ networks.moonbase.governance.tracks.root.confirm_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.root.confirm_period.time }})          |          {{ networks.moonbase.governance.tracks.root.min_enactment_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.root.min_enactment_period.time }})          |
    |      Whitelisted       |   {{ networks.moonbase.governance.tracks.whitelisted.prepare_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.whitelisted.prepare_period.time }})   |   {{ networks.moonbase.governance.tracks.whitelisted.decision_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.whitelisted.decision_period.time }})   |   {{ networks.moonbase.governance.tracks.whitelisted.confirm_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.whitelisted.confirm_period.time }})   |   {{ networks.moonbase.governance.tracks.whitelisted.min_enactment_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.whitelisted.min_enactment_period.time }})   |
    |     General Admin      | {{ networks.moonbase.governance.tracks.general_admin.prepare_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.general_admin.prepare_period.time }}) | {{ networks.moonbase.governance.tracks.general_admin.decision_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.general_admin.decision_period.time }}) | {{ networks.moonbase.governance.tracks.general_admin.confirm_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.general_admin.confirm_period.time }}) | {{ networks.moonbase.governance.tracks.general_admin.min_enactment_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.general_admin.min_enactment_period.time }}) |
    | Emergency<br>Canceller |     {{ networks.moonbase.governance.tracks.canceller.prepare_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.canceller.prepare_period.time }})     |     {{ networks.moonbase.governance.tracks.canceller.decision_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.canceller.decision_period.time }})     |     {{ networks.moonbase.governance.tracks.canceller.confirm_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.canceller.confirm_period.time }})     |     {{ networks.moonbase.governance.tracks.canceller.min_enactment_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.canceller.min_enactment_period.time }})     |
    |  Emergency<br>Killer   |        {{ networks.moonbase.governance.tracks.killer.prepare_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.killer.prepare_period.time }})        |        {{ networks.moonbase.governance.tracks.killer.decision_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.killer.decision_period.time }})        |        {{ networks.moonbase.governance.tracks.killer.confirm_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.killer.confirm_period.time }})        |        {{ networks.moonbase.governance.tracks.killer.min_enactment_period.blocks }} blocks<br> ({{ networks.moonbase.governance.tracks.killer.min_enactment_period.time }})        |

#### Support and Approval Parameters by Track {: #support-and-approval-parameters-by-track }

=== "Moonriver"
    |         Track          | Approval Curve |                                                                                                                                                                                                                                     Approval Parameters                                                                                                                                                                                                                                      | Support Curve |                                                                                                                                                                                                                                   Support Parameters                                                                                                                                                                                                                                   |
    |:----------------------:|:--------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |          Root          |   Reciprocal   |                            {{ networks.moonriver.governance.tracks.root.min_approval.time0 }}: {{ networks.moonriver.governance.tracks.root.min_approval.percent0 }}%<br>{{ networks.moonriver.governance.tracks.root.min_approval.time1 }}: {{ networks.moonriver.governance.tracks.root.min_approval.percent1 }}%<br>{{ networks.moonriver.governance.tracks.root.min_approval.time2 }}: {{ networks.moonriver.governance.tracks.root.min_approval.percent2 }}%                            |    Linear     |                                                                                                  {{ networks.moonriver.governance.tracks.root.min_support.time0 }}: {{ networks.moonriver.governance.tracks.root.min_support.percent0 }}%<br>{{ networks.moonriver.governance.tracks.root.min_support.time1 }}: {{ networks.moonriver.governance.tracks.root.min_support.percent1 }}%                                                                                                  |
    |      Whitelisted       |   Reciprocal   |       {{ networks.moonriver.governance.tracks.whitelisted.min_approval.time0 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_approval.percent0 }}%<br>{{ networks.moonriver.governance.tracks.whitelisted.min_approval.time1 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_approval.percent1 }}%<br>{{ networks.moonriver.governance.tracks.whitelisted.min_approval.time2 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_approval.percent2 }}%       |  Reciprocal   |       {{ networks.moonriver.governance.tracks.whitelisted.min_support.time0 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_support.percent0 }}%<br>{{ networks.moonriver.governance.tracks.whitelisted.min_support.time1 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_support.percent1 }}%<br>{{ networks.moonriver.governance.tracks.whitelisted.min_support.time2 }}: {{ networks.moonriver.governance.tracks.whitelisted.min_support.percent2 }}%       |
    |     General Admin      |   Reciprocal   | {{ networks.moonriver.governance.tracks.general_admin.min_approval.time0 }}: {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent0 }}%<br>{{ networks.moonriver.governance.tracks.general_admin.min_approval.time1 }}: {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent1 }}%<br>{{ networks.moonriver.governance.tracks.general_admin.min_approval.time2 }}: {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent2 }}% |  Reciprocal   | {{ networks.moonriver.governance.tracks.general_admin.min_support.time0 }}: {{ networks.moonriver.governance.tracks.general_admin.min_support.percent0 }}%<br>{{ networks.moonriver.governance.tracks.general_admin.min_support.time1 }}: {{ networks.moonriver.governance.tracks.general_admin.min_support.percent1 }}%<br>{{ networks.moonriver.governance.tracks.general_admin.min_support.time2 }}: {{ networks.moonriver.governance.tracks.general_admin.min_support.percent2 }}% |
    | Emergency<br>Canceller |   Reciprocal   |             {{ networks.moonriver.governance.tracks.canceller.min_approval.time0 }}: {{ networks.moonriver.governance.tracks.canceller.min_approval.percent0 }}%<br>{{ networks.moonriver.governance.tracks.canceller.min_approval.time1 }}: {{ networks.moonriver.governance.tracks.canceller.min_approval.percent1 }}%<br>{{ networks.moonriver.governance.tracks.canceller.min_approval.time2 }}: {{ networks.moonriver.governance.tracks.canceller.min_approval.percent2 }}%             |  Reciprocal   |             {{ networks.moonriver.governance.tracks.canceller.min_support.time0 }}: {{ networks.moonriver.governance.tracks.canceller.min_support.percent0 }}%<br>{{ networks.moonriver.governance.tracks.canceller.min_support.time1 }}: {{ networks.moonriver.governance.tracks.canceller.min_support.percent1 }}%<br>{{ networks.moonriver.governance.tracks.canceller.min_support.time2 }}: {{ networks.moonriver.governance.tracks.canceller.min_support.percent2 }}%             |
    |  Emergency<br>Killer   |   Reciprocal   |                      {{ networks.moonriver.governance.tracks.killer.min_approval.time0 }}: {{ networks.moonriver.governance.tracks.killer.min_approval.percent0 }}%<br>{{ networks.moonriver.governance.tracks.killer.min_approval.time1 }}: {{ networks.moonriver.governance.tracks.killer.min_approval.percent1 }}%<br>{{ networks.moonriver.governance.tracks.killer.min_approval.time2 }}: {{ networks.moonriver.governance.tracks.killer.min_approval.percent2 }}%                      |  Reciprocal   |                      {{ networks.moonriver.governance.tracks.killer.min_support.time0 }}: {{ networks.moonriver.governance.tracks.killer.min_support.percent0 }}%<br>{{ networks.moonriver.governance.tracks.killer.min_support.time1 }}: {{ networks.moonriver.governance.tracks.killer.min_support.percent1 }}%<br>{{ networks.moonriver.governance.tracks.killer.min_support.time2 }}: {{ networks.moonriver.governance.tracks.killer.min_support.percent2 }}%                      |

=== "Moonbase Alpha"
    |         Track          | Approval Curve |                                                                                                                                                                                                                                  Approval Parameters                                                                                                                                                                                                                                   | Support Curve |                                                                                                                                                                                                                                Support Parameters                                                                                                                                                                                                                                |
    |:----------------------:|:--------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |          Root          |   Reciprocal   |                            {{ networks.moonbase.governance.tracks.root.min_approval.time0 }}: {{ networks.moonbase.governance.tracks.root.min_approval.percent0 }}%<br>{{ networks.moonbase.governance.tracks.root.min_approval.time1 }}: {{ networks.moonbase.governance.tracks.root.min_approval.percent1 }}%<br>{{ networks.moonbase.governance.tracks.root.min_approval.time2 }}: {{ networks.moonbase.governance.tracks.root.min_approval.percent2 }}%                            |    Linear     |                                                                                                 {{ networks.moonbase.governance.tracks.root.min_support.time0 }}: {{ networks.moonbase.governance.tracks.root.min_support.percent0 }}%<br>{{ networks.moonbase.governance.tracks.root.min_support.time1 }}: {{ networks.moonbase.governance.tracks.root.min_support.percent1 }}%                                                                                                 |
    |      Whitelisted       |   Reciprocal   |       {{ networks.moonbase.governance.tracks.whitelisted.min_approval.time0 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_approval.percent0 }}%<br>{{ networks.moonbase.governance.tracks.whitelisted.min_approval.time1 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_approval.percent1 }}%<br>{{ networks.moonbase.governance.tracks.whitelisted.min_approval.time2 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_approval.percent2 }}%       |  Reciprocal   |       {{ networks.moonbase.governance.tracks.whitelisted.min_support.time0 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_support.percent0 }}%<br>{{ networks.moonbase.governance.tracks.whitelisted.min_support.time1 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_support.percent1 }}%<br>{{ networks.moonbase.governance.tracks.whitelisted.min_support.time2 }}: {{ networks.moonbase.governance.tracks.whitelisted.min_support.percent2 }}%       |
    |     General Admin      |   Reciprocal   | {{ networks.moonbase.governance.tracks.general_admin.min_approval.time0 }}: {{ networks.moonbase.governance.tracks.general_admin.min_approval.percent0 }}%<br>{{ networks.moonbase.governance.tracks.general_admin.min_approval.time1 }}: {{ networks.moonbase.governance.tracks.general_admin.min_approval.percent1 }}%<br>{{ networks.moonbase.governance.tracks.general_admin.min_approval.time2 }}: {{ networks.moonbase.governance.tracks.general_admin.min_approval.percent2 }}% |  Reciprocal   | {{ networks.moonbase.governance.tracks.general_admin.min_support.time0 }}: {{ networks.moonbase.governance.tracks.general_admin.min_support.percent0 }}%<br>{{ networks.moonbase.governance.tracks.general_admin.min_support.time1 }}: {{ networks.moonbase.governance.tracks.general_admin.min_support.percent1 }}%<br>{{ networks.moonbase.governance.tracks.general_admin.min_support.time2 }}: {{ networks.moonbase.governance.tracks.general_admin.min_support.percent2 }}% |
    | Emergency<br>Canceller |   Reciprocal   |             {{ networks.moonbase.governance.tracks.canceller.min_approval.time0 }}: {{ networks.moonbase.governance.tracks.canceller.min_approval.percent0 }}%<br>{{ networks.moonbase.governance.tracks.canceller.min_approval.time1 }}: {{ networks.moonbase.governance.tracks.canceller.min_approval.percent1 }}%<br>{{ networks.moonbase.governance.tracks.canceller.min_approval.time2 }}: {{ networks.moonbase.governance.tracks.canceller.min_approval.percent2 }}%             |  Reciprocal   |             {{ networks.moonbase.governance.tracks.canceller.min_support.time0 }}: {{ networks.moonbase.governance.tracks.canceller.min_support.percent0 }}%<br>{{ networks.moonbase.governance.tracks.canceller.min_support.time1 }}: {{ networks.moonbase.governance.tracks.canceller.min_support.percent1 }}%<br>{{ networks.moonbase.governance.tracks.canceller.min_support.time2 }}: {{ networks.moonbase.governance.tracks.canceller.min_support.percent2 }}%             |
    |  Emergency<br>Killer   |   Reciprocal   |                      {{ networks.moonbase.governance.tracks.killer.min_approval.time0 }}: {{ networks.moonbase.governance.tracks.killer.min_approval.percent0 }}%<br>{{ networks.moonbase.governance.tracks.killer.min_approval.time1 }}: {{ networks.moonbase.governance.tracks.killer.min_approval.percent1 }}%<br>{{ networks.moonbase.governance.tracks.killer.min_approval.time2 }}: {{ networks.moonbase.governance.tracks.killer.min_approval.percent2 }}%                      |  Reciprocal   |                      {{ networks.moonbase.governance.tracks.killer.min_support.time0 }}: {{ networks.moonbase.governance.tracks.killer.min_support.percent0 }}%<br>{{ networks.moonbase.governance.tracks.killer.min_support.time1 }}: {{ networks.moonbase.governance.tracks.killer.min_support.percent1 }}%<br>{{ networks.moonbase.governance.tracks.killer.min_support.time2 }}: {{ networks.moonbase.governance.tracks.killer.min_support.percent2 }}%                      |

#### Conviction Multiplier {: #conviction-multiplier-v2 }

The Conviction multiplier is related to the number of Enactment Periods the tokens will be locked for after the referenda is enacted (if approved). Consequently, the longer you are willing to lock your tokens, the stronger your vote will be weighted. You also have the option of not locking tokens at all, but vote weight is drastically reduced (tokens are still locked during the duration of the referendum).

If you were to vote 1000 tokens with a 6x Conviction, your weighted vote would be 6000 units. That is, 1000 locked tokens multiplied by the Conviction, which in this scenario would be 6. On the other hand, if you decided you didn't want to have your tokens locked after enactment, you could vote your 1000 tokens with a 0.1x Conviction. In this case, your weighted vote would only be 100 units.

The Conviction multiplier values for each network are:

=== "Moonriver"
    | Lock Periods After Enactment | Conviction Multiplier |                        Approx. Lock Time                        |
    |:----------------------------:|:---------------------:|:---------------------------------------------------------------:|
    |              0               |          0.1          |                              None                               |
    |              1               |           1           | {{networks.moonriver.conviction.lock_period.conviction_1}} day  |
    |              2               |           2           | {{networks.moonriver.conviction.lock_period.conviction_2}} days |
    |              4               |           3           | {{networks.moonriver.conviction.lock_period.conviction_3}} days |
    |              8               |           4           | {{networks.moonriver.conviction.lock_period.conviction_4}} days |
    |              16              |           5           | {{networks.moonriver.conviction.lock_period.conviction_5}} days |
    |              32              |           6           | {{networks.moonriver.conviction.lock_period.conviction_6}} days |

=== "Moonbase Alpha"
    | Lock Periods After Enactment | Conviction Multiplier |                       Approx. Lock Time                        |
    |:----------------------------:|:---------------------:|:--------------------------------------------------------------:|
    |              0               |          0.1          |                              None                              |
    |              1               |           1           | {{networks.moonbase.conviction.lock_period.conviction_1}} day  |
    |              2               |           2           | {{networks.moonbase.conviction.lock_period.conviction_2}} days |
    |              4               |           3           | {{networks.moonbase.conviction.lock_period.conviction_3}} days |
    |              8               |           4           | {{networks.moonbase.conviction.lock_period.conviction_4}} days |
    |              16              |           5           | {{networks.moonbase.conviction.lock_period.conviction_5}} days |
    |              32              |           6           | {{networks.moonbase.conviction.lock_period.conviction_6}} days |

!!! note
    The lock time approximations are based upon regular {{ networks.moonriver.block_time }}-second block times. Block production may vary and thus the displayed lock times should not be deemed exact.

### Roadmap of a Proposal {: #roadmap-of-a-proposal-v2 } 

Before a proposal is submitted, the author of the proposal can submit their idea for their proposal to the designated Democracy Proposals section of the [Moonbeam Governance discussion forum](https://forum.moonbeam.foundation/c/governance/2){target=_blank} for feedback from the community for at least five days. From there, the author can make adjustments to the proposal based on the feedback they've collected.

Once the author is ready, they can submit their proposal on-chain. To do so, first, they need to submit the preimage of the proposal. The submitter needs to bond a fee to store the preimage on-chain. The bond is returned once the submitter unnotes the preimage. Next, they can submit the actual proposal and pay the Submission Deposit, which is enough to cover the on-chain storage cost of the proposal. Then the Lead-in Period begins and the community can begin voting "Aye" or "Nay" on the proposal by locking tokens. In order for the referendum to advance and move out of the Lead-in Period to the Decide period, the following criteria must be met:

- The referendum must wait the duration of the Prepare Period, which allows for adequate time to discuss the proposal before it progresses to the next phase
- There is enough Capacity in the chosen Track
- A Decision Deposit has been made that meets the minimum requirements for the Track

If a referendum meets the above criteria, it moves to the Decide Period and takes up one of the spots in its designated Track. In the Decide Period, voting continues and the referendum has a set amount of days to reach the Approval and Support requirements needed for it to progress to the Confirm Period.

Once in the Confirm Period, a referendum must continuously meet the Approval and Support requirements for the duration of the period. If a referendum fails to meet the requirements at any point, it is returned to the Decide Period. If the referendum meets the Approval and Support requirements again, it can progress to the Confirm Period again and the Decide Period will be delayed until the end of the Confirm Period. If the Decide Period ends and not enough Approval and Support was received, the referendum will be rejected and the Decision Deposit will be returned. The proposal can be proposed again at any time.

If a referendum continously receives enough Approval and Support during the Confirm Period, it will be approved and move to the Enactment Period. It will wait the duration of the Enactment Period before it gets dispatched.

The happy path for a proposal is shown in the following diagram:

![A happy path diagram of the proposal roadmap in OpenGov.](/images/learn/features/governance/v2/proposal-roadmap.png)

### Proposal Example Walkthrough

A proposal (with its preimage) is submitted for the General Admin Track on Moonriver would have the following characteristics:

 - The Approval curve starts at {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent0 }}% on {{ networks.moonriver.governance.tracks.general_admin.min_approval.time0 }}, goes to {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent1 }}% on {{ networks.moonriver.governance.tracks.general_admin.min_approval.time1 }}
 - The Support curve starts at {{ networks.moonriver.governance.tracks.general_admin.min_support.percent0 }}% on {{ networks.moonriver.governance.tracks.general_admin.min_support.time0 }}, goes to {{ networks.moonriver.governance.tracks.general_admin.min_support.percent1 }}% on {{ networks.moonriver.governance.tracks.general_admin.min_support.time1 }}
 - A referendum starts the Decide Period with 0% "Aye" votes (nobody voted in the Lead-in Period)
 - Token holders begin to vote and the Approval increases to a value above {{ networks.moonriver.governance.tracks.general_admin.min_approval.percent1 }}% by {{ networks.moonriver.governance.tracks.general_admin.min_approval.time1 }}
 - If the Approval and Support thresholds are met for the duration of the Confirm Period ({{ networks.moonriver.governance.tracks.general_admin.confirm_period.blocks }} blocks, approximately {{ networks.moonriver.governance.tracks.general_admin.confirm_period.time }}), the referendum is approved
 - If the Approval and Support thresholds are not met during the Decision Period, the proposal is rejected. Note that the thresholds need to be met for the duration of the Confirm Period. Consequently, if they are met but the Decision Period expires before the completion of the Confirm Period, the proposal is rejected

The Approval and Support percentages can be calculated using the following:

=== "Approval"
    ```
    Approval = 100 * ( Total Conviction-weighted "Aye" votes / Total Conviction-weighted votes ) 
    ```

=== "Support"
    ```
    Support = 100 * ( Total non-Conviction-weighted votes / Total supply )
    ```

### Proposal Cancellations {: #proposal-cancellations }

In the event that a proposal already in the voting stage is found to have an issue, it may be necessary to prevent its approval. These instances may involve malicious activity or technical issues that make the changes impossible to implement due to recent upgrades to the network.

Cancellations must be voted on by the network to be executed. Cancellation proposals are faster than a typical proposal because they must be decided before the enactment of the proposal they seek to cancel, but they follow the same process as other referenda.

There is a cancellation Origin for use against referenda that contain an unforeseen problem, called the Emergency Canceller. The Emergency Canceller Origin and the Root Origin are allowed to cancel referenda. Regardless of the Origin, if a proposal is cancelled, it gets rejected and the Decision Deposit gets refunded.

In addition, there is a Kill Origin, which is for bad referenda intending to harm the network, called Emergency Killer. The Emergency Killer Origin and the Root Origin have the ability to kill referenda. In this case, a proposal is cancelled and the Decision Deposit is slashed, meaning the deposit amount is burned regardless of the Origin.

### Rights of the OpenGov Technical Committee {: #rights-of-the-opengov-technical-committee }

On Polkadot, the Technical Committee from Governance v1 was replaced with the Fellowship, which is a "mostly self-governing expert body with a primary goal of representing humans who embody and contain the technical knowledge base of the Kusama and/or Polkadot networks and protocol," according to [Polkadot's wiki](https://wiki.polkadot.network/docs/learn-opengov#fellowship){target=_blank}.

For Moonbeam's implementation of OpenGov, instead of the Fellowship, there is a community OpenGov Technical Committee that has very similar power to that of the Fellowship. Their power in governance resides in their ability to whitelist a proposal. OpenGov Technical Committee members may only vote to whitelist a proposal if whitelisting that proposal would protect against a security vulnerability to the network. The passing threshold of the OpenGov Technical Committee members on whether to whitelist a proposal is determined by governance. As such, the OpenGov Technical Committee has very limited power over the network. Its purpose is to provide technical review of urgent security issues that are proposed by token holders.

While still subject to governance, the idea behind the Whitelist track is that it will have different parameters to make it faster for proposals to pass. The Whitelist Track parameters, including approval, support, and voting, are determined by the Moonriver or Moonbeam token holders through governance and cannot be changed by the OpenGov Technical Committee.

The OpenGov Technical Committee is made up of members of the community who have technical knowledge and expertise in Moonbeam-based networks. 

### Related Guides on Governance v2 {: #try-it-out } 

For related guides on submitting and voting on referenda on Moonbeam with Governance v2, please check the following guides:

 - [How to Submit a Proposal](/tokens/governance/proposals/opengov-proposals){target=_blank}
 - [How to Vote on a Proposal](/tokens/governance/voting/opengov-voting){target=_blank}
 - [Interact with the Preimages Precompiled Contract (Solidity Interface)](/builders/pallets-precompiles/precompiles/preimage/){target=_blank}
 - [Interact with the Referenda Precompiled Contract (Solidity Interface)](/builders/pallets-precompiles/precompiles/referenda/){target=_blank}
 - [Interact with the Conviction Voting Precompiled Contract (Solidity Interface)](/builders/pallets-precompiles/precompiles/conviction-voting/){target=_blank}

## Governance v1 {: #governance-v1 }

While OpenGov is being tested on Moonriver, Moonbeam will continue to use governance v1. This section will cover everything you need to know about governance v1 on Moonbeam.

### General Definitions {: #general-definitions } 

With great power comes great responsibility. Some important parameters to understand before engaging with Moonbeam's governance include:

 - **Proposals** — actions or items being proposed by token holders. There are two main ways that a proposal is created:
    - **Democracy Proposal** - a proposal that is submitted by anyone in the community and will be open for endorsements from the token holders. The Democracy Proposal that has the highest amount of bonded support will be selected to be a referendum at the end of the Launch Period
    - **External Proposal** - a proposal that is created by the Council and then, if accepted by the Council, is submitted for token holder voting. When the Council submits an External Proposal, the Council sets the Vote Tallying Metric
        - **Fast-tracked Proposal** - the Technical Committee may choose to fast-track an External Proposal which means changing the default parameters such as the Voting Period and Enactment Period. A fast-tracked referendum can be created alongside existing active referenda. That is to say, an emergency referendum does not replace the currently active referendum
- **Referendum** — a proposal that is up for token-holder voting. Each referendum is tied to a specific proposal for a change to the Moonbeam system including values for key parameters, code upgrades, or changes to the governance system itself
- **Launch Period** — the time period before a Voting Period that publicly submitted proposals will gather endorsements
- **Voting Period** — time token holders have to vote for a referendum (duration of a referendum)

--8<-- 'text/governance/vote-conviction-definitions.md'

- **Vote tallying metric** — there are three types of vote tallying metrics: (i) Positive Turnout Bias (Super-Majority Approve), (ii) Negative Turnout Bias (Super-Majority Against), or (iii) Simple Majority. See [Polkadot’s Wiki on Tallying](https://wiki.polkadot.network/docs/learn-governance#tallying){target=_blank} for more information about how these different vote tallying metrics work
    - The vote tallying metric applied depends on the type of referendum: 
        - Democracy Proposals - [Positive Turnout Bias (Super-Majority Approve)](#positive-turnout-bias) tallying metric is applied
        - External Proposals - the vote tallying metric is set by the Council
- **Enactment Period** — time between a proposal being approved and enacted (make law). It is also the minimum period necessary to lock funds to propose an action
- **Lock Period** — time (after the proposal enactment) that the tokens of the winning voters are locked. Users can still use these tokens for staking or voting. 
- **Cool-off Period** — duration a veto from the technical committee lasts before the proposal may be submitted again
- **Delegation** — act of transferring your voting power to another account for up to a certain conviction

### Governance Parameters {: #governance-parameters }

The governance parameters on Moonbeam are as follows:

|            Variable            |                                                         Value                                                          |
|:------------------------------:|:----------------------------------------------------------------------------------------------------------------------:|
|         Launch Period          | {{ networks.moonbeam.democracy.launch_period.blocks}} blocks ({{ networks.moonbeam.democracy.launch_period.days}} day) |
|         Voting Period          |  {{ networks.moonbeam.democracy.vote_period.blocks}} blocks ({{ networks.moonbeam.democracy.vote_period.days}} days)   |
|        Enactment Period        | {{ networks.moonbeam.democracy.enact_period.blocks}} blocks ({{ networks.moonbeam.democracy.enact_period.days}} days)  |
|        Cool-off Period         |  {{ networks.moonbeam.democracy.cool_period.blocks}} blocks ({{ networks.moonbeam.democracy.cool_period.days}} days)   |
|     Preimage base deposit      |                                   {{ networks.moonbeam.preimage.base_deposit }} GLMR                                   |
|   Preimage deposit per byte    |                                   {{ networks.moonbeam.preimage.byte_deposit }} GLMR                                   |
|        Proposal deposit        |                                   {{ networks.moonbeam.democracy.min_deposit }} GLMR                                   |
|       Maximum proposals        |                                    {{ networks.moonbeam.democracy.max_proposals }}                                     |
| Maximum referenda (at a time)* |                                    {{ networks.moonbeam.democracy.max_referenda }}                                     |
   
**The maximum number of referenda at a time does not take fast-tracked referenda into consideration.* 

!!! note
    The Voting Period and Enactment Period are subject to change for External Proposals.

#### Conviction Multiplier {: #conviction-multiplier }

The Conviction multiplier is related to the number of Enactment Periods the tokens will be locked for after the referenda is enacted (if approved). Consequently, the longer you are willing to lock your tokens, the stronger your vote will be weighted. You also have the option of not locking tokens at all, but vote weight is drastically reduced (tokens are still locked during the duration of the referendum).

If you were to vote 1000 tokens with a 6x Conviction, your weighted vote would be 6000 units. That is, 1000 locked tokens multiplied by the Conviction, which in this scenario would be 6. On the other hand, if you decided you didn't want to have your tokens locked after enactment, you could vote your 1000 tokens with a 0.1x Conviction. In this case, your weighted vote would only be 100 units.

The Conviction multiplier values for Moonbeam are:

=== "Moonbeam"
    | Lock Periods After Enactment | Conviction Multiplier |                       Approx. Lock Time                       |
    |:----------------------------:|:---------------------:|:-------------------------------------------------------------:|
    |              0               |          0.1          |                             None                              |
    |              1               |           1           | {{networks.moonbeam.democracy.lock_period.conviction_1}} days |
    |              2               |           2           | {{networks.moonbeam.democracy.lock_period.conviction_2}} days |
    |              4               |           3           | {{networks.moonbeam.democracy.lock_period.conviction_3}} days |
    |              8               |           4           | {{networks.moonbeam.democracy.lock_period.conviction_4}} days |
    |              16              |           5           | {{networks.moonbeam.democracy.lock_period.conviction_5}} days |
    |              32              |           6           | {{networks.moonbeam.democracy.lock_period.conviction_6}} days |

!!! note
    The lock time approximations are based upon regular {{ networks.moonbeam.block }}-second block times. Block production may vary and thus the displayed lock times should not be deemed exact.

### Roadmap of a Proposal {: #roadmap-of-a-proposal } 

Before a proposal is submitted, the author of the proposal can submit their idea for their proposal to the designated Democracy Proposals section of the [Moonbeam Governance discussion forum](https://forum.moonbeam.foundation/c/governance/2){target=_blank} for feedback from the community for at least five days. From there, the author can make adjustments to the proposal based on the feedback they've collected.

When the proposal is ready to be submitted on-chain, a preimage for the proposal needs to be submitted on-chain. The preimage defines the action to be carried out. The submitter pays a fee-per-byte stored: the larger the preimage, the higher the fee. Once submitted, it returns a preimage hash.

The proposer can submit the proposal using the preimage hash, locking tokens in the process. Once the submission transaction is accepted, the proposal is listed publicly. So, you'll be able to view the proposal on [Polkassembly](https://moonbeam.polkassembly.network/){target=_blank}.

Once the proposal is listed, token holders can second the proposal (vouch for it) by locking the same amount of tokens the proposer locked. The most seconded proposal moves to public referendum. When this happens, the referendum will be listed on the [On-chain proposals page in Polkassembly](https://moonbeam.polkassembly.network/proposals){target=_blank}.

Once in referendum, token holders vote **Aye** or **Nay** on the proposal by locking tokens. Two factors account the vote weight: amount locked and locking period. If the proposal passes, it is enacted after a certain amount of time.

The happy path for a Democracy Proposal is shown in the following diagram:

![Proposal Roadmap](/images/learn/features/governance/proposal-roadmap.png)

### Rights of the Council and the Technical Committee {: #voting-rights-of-the-council-and-the-technical-committee }

The Council and Technical Committee are two collectives that have the following special voting rights:

|     Collective      | Can submit <br>External Proposals | Can submit<br>Fast-tracked Proposals | Can cancel malicious<br>Democracy Proposals | Can veto<br>External Proposals |
|:-------------------:|:---------------------------------:|:------------------------------------:|:-------------------------------------------:|:------------------------------:|
|       Council       |                 ✓                 |                  X                   |                      ✓                      |               X                |
| Technical Committee |                 X                 |                  ✓                   |                      ✓                      |               ✓                |

Fast-tracked Proposals with a Voting Period of one day or more require one-half of the Technical Committee's approval. Fast-tracked Proposals with a Voting Period of less than a day are called "Instant Fast-tracked Proposals" and require three-fifths of the Technical Committee's approval.

As seen in the above table, the Technical Committee can veto an External Proposal. Any single member of the Technical Committee can veto the proposal only once, and only for the duration of the Cool-off Period.

### Positive Turnout Bias {: #positive-turnout-bias } 

Public referenda use a positive turnout bias metric, that is, a Super-Majority approval formula. The equation is the following:

![Positive Turnout Bias](/images/learn/features/governance/vote-bias.png)

Where:

 - **Approve** — number of "Aye" votes (includes the Conviction multiplier)
 - **Against** — number of "Nay" votes (includes the Conviction multiplier)
 - **Turnout** — the total number of voting tokens (without including the Conviction multiplier)
 - **Electorate** — the total number of tokens issued in the network

In the previous example, these numbers were:

|  Variable  |         Value         |
|:----------:|:---------------------:|
|  Approve   |   10800 (1800 x 6)    |
|  Against   |    80 (800 x 0.1)     |
|  Turnout   |   2600 (1800 + 800)   |
| Electorate |         1.22M         |
| **Result** | 1.5 < 9.8 (Aye wins!) |

In short, a heavy Super-Majority of "Aye" votes is required to approve a proposal at low turnouts, but as turnout increases, it becomes a simple majority.

### Related Guides on Governance v1 {: #try-it-out } 

For related guides on submitting and voting on referenda on Moonbeam with Governance v1, please check the following guides:

 - [How to Submit a Proposal](/tokens/governance/proposals/proposals){target=_blank}
 - [How to Vote on a Proposal](/tokens/governance/voting/voting){target=_blank}
 - [Interact with the Democracy Precompiled Contract (Solidity Interface)](/builders/pallets-precompiles/precompiles/democracy/){target=_blank}

