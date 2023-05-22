import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CHECKED, QUERY_CHALLENGE } from '../../utils/queries';
import Header from '../../components/Header/Header';

const Challenge = () => {
  const { loading, data } = useQuery(QUERY_CHALLENGE);
  const challenges = data?.challenge || [];
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [countdown, setCountdown] = useState(() => {
    const storedCountdown = parseInt(localStorage.getItem('countdown'), 10);
    return !isNaN(storedCountdown) && storedCountdown > 0 ? storedCountdown : 24 * 60 * 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChallengeIndex(prevIndex => (prevIndex + 1) % challenges.length);
      setCountdown(24 * 60 * 60); // Reset the countdown to 24 hours
    }, 24 * 60 * 60 * 1000); // 24 hours in seconds

    return () => clearInterval(interval);
  }, [challenges.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        const newCountdown = prevCountdown - 1;
        localStorage.setItem('countdown', newCountdown.toString());
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('countdown', countdown.toString());
  }, [countdown]);

  const currentChallenge = challenges[currentChallengeIndex];

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const { loading: postLoading, data: postData } = useQuery(QUERY_CHECKED, {
    variables: { isChecked: true },
  });

  const posts = postData?.posts || [];

  return (
    <div className="challenge-container">
      <Header />
      {currentChallenge && (
        <div key={currentChallenge.id}>
          <p>{currentChallenge.challengeTitle}: </p>
          <p>{currentChallenge.challengeDescription}</p>
        </div>
      )}
      <p>Time Left: {formatTime(countdown)}</p>
      {/* Display the posts */}
      {postLoading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          <h2>Posts:</h2>
          {posts.map((post) => (
            <div key={post._id}>
              <img alt="challenge of the day" src={post.postPic}></img>
              <p>{post.postText}</p>
              <p>{post.postAuthor}</p>
              <p>{post.createdAt}</p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Challenge;
