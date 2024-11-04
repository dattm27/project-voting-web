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