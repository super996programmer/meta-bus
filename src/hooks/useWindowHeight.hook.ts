import { useEffect, useState } from 'react';

const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleWindowHeight);
    return () => {
      window.removeEventListener('resize', handleWindowHeight);
    };
  }, []);

  return windowHeight;
};

export default useWindowHeight;
