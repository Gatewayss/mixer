import React from 'react';
import './challenge.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CHALLENGE } from '../../utils/queries';

import Header from '../../components/Header/Header';

const Challenge = () => {
  const { loading, data } = useQuery(QUERY_CHALLENGE);

  const challenges = data?.challenge|| [];
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChallengeIndex(prevIndex => (prevIndex + 1) % challenges.length);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, [challenges.length]);

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="challenge-container">
    <Header />
    {currentChallenge && (
      <div key={currentChallenge.id}>
        <p>{currentChallenge.challengeTitle}: </p>
        <p>{currentChallenge.challengeDescription}</p>
      </div>
    )}
  </div> 
);
};

export default Challenge;