import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Canvas from './pages/Canvas/Canvas';
import Challenge from './pages/Challenge/Challenge';
import Profile from './pages/Profile/Profile';
import SinglePost from './pages/SinglePost/SinglePost';

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
  cache: new InMemoryCache(),
});

function App() {
  return (
    
    <ApolloProvider client={client}>
    <Router>
    <div>  
     <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />      
        <Route 
          path="/canvas" 
          element={<Canvas />} 
        />  
        <Route 
          path="/challenge" 
          element={<Challenge />} 
        />     
        <Route 
          path="/me" 
          element={<Profile />}
        />
        <Route 
          path="/profiles/:username" 
          element={<Profile />}
        />
               <Route 
          path="/posts/:postId" 
          element={<SinglePost />} 
        />
        </Routes>        
    </div>
    {/* </div> */}
    </Router>
    </ApolloProvider>
  );
}

export default App;
