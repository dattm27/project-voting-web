import {
  NewCandidate as NewCandidateEvent,
  NewVote as NewVoteEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Pause as PauseEvent,
  Unpause as UnpauseEvent,
} from "../generated/templates/Election/Election"
import {
  NewCandidate,
  NewElection,
  NewVote,
  OwnershipTransferred,

} from "../generated/schema"




export function handleNewCandidate(event: NewCandidateEvent): void {
  let election = NewElection.load(event.params.electionId.toString());
  if ( election == null ) return ;
  let entity = new NewCandidate(
    "E".concat(election.id).concat("C").concat(event.params.candidateId.toString())
  )
  entity.electionId = election.id;
  entity.candidateId = event.params.candidateId
  entity.name = event.params.name
  entity.patry = event.params.patry
  entity.voteCount = 0;
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  

  //update total number of candidate
  election.numOfCandidates =   election.numOfCandidates + 1;
  election.save();
}

export function handleNewVote(event: NewVoteEvent): void {
  let election = NewElection.load(event.params.electionId.toString());
  if ( election == null ) return ;
  let candidate = NewCandidate.load("E".concat(election.id).concat("C").concat(event.params.candidateId.toString()));
  if (candidate == null) return;
  let entity = new NewVote(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.electionId = election.id;
  entity.voter = event.params.voter
  entity.candidateId =candidate.id;
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  //update total votes
  election.totalVotes =   election.totalVotes + 1;
  election.save();

  //update voteCount for each candidate
  candidate.voteCount = candidate.voteCount + 1;
  candidate.save();
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

export function handlePause(event: PauseEvent): void {
  //load election 
  let election = NewElection.load( event.params.electionId.toString())
  if ( election == null ) return ;
  //update election status
  election.status = "PAUSED"
  election.save()
}

export function handleUnpause(event: UnpauseEvent): void {
   //load election 
   let election = NewElection.load( event.params.electionId.toString())
   if ( election == null ) return ;
   //update election status
   election.status = "ACTIVE"
   election.save()
}
