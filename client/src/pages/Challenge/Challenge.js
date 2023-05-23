import React from 'react';
import { useQuery } from '@apollo/client';
import Header from '../../components/Header/Header';
import './challenge.css'
import Countdown from '../../components/Countdown/Countdown';
import PostList from '../../components/PostList/PostList';
import { QUERY_POSTS } from '../../utils/queries';

const Challenge = () => {
  const { data } = useQuery(QUERY_POSTS, {
    variables: { isChecked: true},
  });
 
  const posts = data?.posts || [];

  const challengePosts = posts.filter(obj => {
    return obj.isChecked === true;
  })
  console.log(challengePosts); 
  

  return (
    <div className="challenge-container">         
      <Header />
      <Countdown />
      <div className="home-postlist-container">      
        <PostList posts={challengePosts} />      
      </div>

    </div>
  );
};

export default Challenge;