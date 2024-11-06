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
      blockTimestamp
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