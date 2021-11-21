import { useState, useCallback } from 'react';

const useFetchTdxApi = <Request, Result>(
  api: (reqest?: Request) => Promise<Result>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Result | null>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(
    async (request?: Request) => {
      setIsLoading(true);
      setData(null);
      try {
        const result = await api(request);
        setData(result);
      } catch (err) {
        if (err) {
          setError(err);
        } else {
          setError('Something went wrong!');
        }
      }
      setIsLoading(false);
    },
    [api]
  );

  return {
    fetchData,
    isLoading,
    data,
    error,
  };
};

export default useFetchTdxApi;
