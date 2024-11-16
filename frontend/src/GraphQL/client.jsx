import { ApolloClient, InMemoryCache ,gql} from '@apollo/client';

export const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });

export const GET_ELECTION = gql`
query MyQuery {
  newElections(where: {}) {
    transactionHash
    totalVotes
    title
    owner
    id
    electionId
    electionAddr
  }
}
`;

export const GET_USER_ELECTIONS = gql`
  query MyQuery($owner: String!) {
    newElections(
      where: { owner: $owner }
      orderBy: totalVotes
      orderDirection: desc
    ) {
      totalVotes
      title
      owner
      electionId
      electionAddr
      blockTimestamp
    }
  }
`;

export const GET_ELECTIONS = gql`
  query MyQuery {
    newElections(
      orderBy: totalVotes
      orderDirection: desc
    ) {
      totalVotes
      title
      owner
      electionId
      electionAddr
      electionEndTime
    }
  }
`;

export const GET_ELECTION_CANDIDATES = gql`
 query MyQuery($electionAddr: String!) {
  newCandidates(
    where: {electionId_: {electionAddr: $electionAddr}}
  ) {
    candidateId
    name
    voteCount
    electionId {
      title
      id
      electionAddr
    }
  }
}
`;

export const GET_VOTER = gql`
 query MyQuery($voterAddr: String!, $electionAddr: String!) {
  newVotes(where: {voter: $voterAddr, electionId_: { electionAddr: $electionAddr}}) {
    voter
    electionId {
       electionAddr
    }
    candidateId {
      candidateId
    }
  }
}
`;

export const GET_NEW_VOTE = gql`
query MyQuery($owner: String!) {
  newElections(
    first: 1
    where: {owner: $owner}
    orderBy: electionId
    orderDirection: desc
  ) {
    title
    owner
    electionAddr
    id
    electionId
  }
}
`;

export const GET_ELECTION_TITLE = gql`
query MyQuery($electionAddr: String!) {
  newElections(where: {electionAddr: $electionAddr}) {
    title
    owner
  }
}
`;