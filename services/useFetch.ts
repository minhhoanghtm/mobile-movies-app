//FetchMovies
//fetchMovieDetails

import { useEffect, useState } from "react";

//useFetch(fetchMovies)
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setDate] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setDate(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDate(null);
    setError(null);
    setLoading(false);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData, reset };
};

export default useFetch;
