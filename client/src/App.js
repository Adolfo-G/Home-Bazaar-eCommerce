import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import PersonalListing from './pages/PersonalListing';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri:'/graphql',
  cache: new InMemoryCache(),
});
client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar/>
      <Routes>
        <Route
        path="/"
        element={<Home/>}
        />
        <Route
        path="/login"
        element={<Login/>}
        />
        <Route
        path="/signup"
        element={<Signup/>}
        />
        <Route
        path="/personalListing/"
        element={<PersonalListing/>}
        />
        <Route
        path="/Listing/:_id"
        element={<Listing/>}
        />
        <Route
        path = "/addItem"
        element={<AddItem/>}
        />
        <Route
        path = "/EditItem/:_id"
        element={<EditItem/>}
        />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
