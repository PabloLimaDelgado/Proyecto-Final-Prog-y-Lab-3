import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  errors: Error | null;
}

export const useFetch = <T>(url: RequestInfo) => {
  const [fetchDB, setFetchDB] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    errors: null,
  });

  const { data, isLoading, errors } = fetchDB;

  const getFetch = async () => {
    try {
      const response: Response = await fetch(url);
      const data: T = await response.json();

      setFetchDB({
        data,
        isLoading: false,
        errors: null,
      });
    } catch (error) {
      setFetchDB({
        data: null,
        isLoading: false,
        errors: error as Error,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    getFetch();
  }, [url]);

  return { data, isLoading, errors };
};
