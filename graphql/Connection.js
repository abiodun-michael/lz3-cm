import {ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://lz3-gateway.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});


const AuthProvider = ({children})=>{

    return(
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}

export default AuthProvider