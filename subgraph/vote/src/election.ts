import {
  NewCandidate as NewCandidateEvent,
  NewVote as NewVoteEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/templates/Election/Election"
import {
  NewCandidate,
  NewVote,
  OwnershipTransferred,
} from "../generated/schema"

export function handleNewCandidate(event: NewCandidateEvent): void {
  let entity = new NewCandidate(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.electionId = event.params.electionId
  entity.candidateId = event.params.candidateId
  entity.name = event.params.name
  entity.patry = event.params.patry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewVote(event: NewVoteEvent): void {
  let entity = new NewVote(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.electionId = event.params.electionId
  entity.voter = event.params.voter
  entity.candidateId = event.params.candidateId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
