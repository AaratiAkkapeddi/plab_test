import { ApolloClient, createHttpLink, InMemoryCache, gql, IntrospectionFragmentMatcher } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import introspectionQueryResultData from './fragmentTypes.json';

const httpLink = createHttpLink({
  uri: 'https://api.are.na/graphql',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-APP-TOKEN": process.env.REACT_APP_TOKEN,
      "X-AUTH-TOKEN": process.env.REACT_APP_AUTH_TOKEN
    }
  }
});


const cache = new InMemoryCache({ introspectionQueryResultData });

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache
})

