import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useHeroAnimation = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isSubscriptionPage = location.pathname === '/subscriptions';

  return { animate, isSubscriptionPage };
};