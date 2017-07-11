import React from 'react';
import LogoutForm from '../components/logout_form';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

const defaultQuery = `
  query defaultInfo {
    me {
      username
      pasword
      lastSignOn
      createdAt
    }
    test
    now
    cookie
  }
`;

const callGraphQL = query =>
  fetch('/graphql', {
    method: 'post',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  }).then(response => response.json());

const Main = () => (
  <div className="App">
    <LogoutForm />
    <GraphiQL defaultQuery={defaultQuery} fetcher={params => callGraphQL(params)} />
  </div>
);

export default Main;
