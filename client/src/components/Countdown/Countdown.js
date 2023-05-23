import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CHECKED, QUERY_CHALLENGE } from '../../utils/queries';


const Countdown = () => {
  const { data } = useQuery(QUERY_CHALLENGE);
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


  return (
    <div className="challenge-container">   
      <div className="current-container">
      {currentChallenge && (
        <div className="current-challenge"key={currentChallenge.id}>
          <p>{currentChallenge.challengeTitle}: </p>
          <p>{currentChallenge.challengeDescription}</p>
        </div>
      )}
      <p className="time-left">Time Left: {formatTime(countdown)}</p>
      </div> 
    </div>
  );
};

export default Countdown;
