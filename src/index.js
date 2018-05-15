import React from 'react';
import ReactDOM from 'react-dom';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import './index.scss';

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    new WebSocketLink(new SubscriptionClient('ws://localhost:4000/subscriptions', {
      reconnect: true,
    })),
    createHttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
    }),
  ),
  cache: new InMemoryCache(),
});

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , rootElement,
);
