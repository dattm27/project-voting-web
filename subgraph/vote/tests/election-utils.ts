import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NewCandidate,
  NewVote,
  OwnershipTransferred
} from "../generated/Election/Election"

export function createNewCandidateEvent(
  electionId: BigInt,
  candidateId: BigInt,
  name: string,
  patry: string
): NewCandidate {
  let newCandidateEvent = changetype<NewCandidate>(newMockEvent())

  newCandidateEvent.parameters = new Array()

  newCandidateEvent.parameters.push(
    new ethereum.EventParam(
      "electionId",
      ethereum.Value.fromUnsignedBigInt(electionId)
    )
  )
  newCandidateEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromUnsignedBigInt(candidateId)
    )
  )
  newCandidateEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newCandidateEvent.parameters.push(
    new ethereum.EventParam("patry", ethereum.Value.fromString(patry))
  )

  return newCandidateEvent
}

export function createNewVoteEvent(
  electionId: BigInt,
  voter: Address,
  candidateId: BigInt,
  timestamp: BigInt
): NewVote {
  let newVoteEvent = changetype<NewVote>(newMockEvent())

  newVoteEvent.parameters = new Array()

  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "electionId",
      ethereum.Value.fromUnsignedBigInt(electionId)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromUnsignedBigInt(candidateId)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return newVoteEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
