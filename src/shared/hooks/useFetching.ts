import { useState, useCallback } from 'react';
import type {FetchingCallback, UseFetchingOptions, UseFetchingResult} from "../types/types.ts";

export const useFetching = <T, Args extends unknown[]>(
    callback: FetchingCallback<T, Args>,
    options: UseFetchingOptions<T> = {}
): UseFetchingResult<T, Args> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = useCallback(async (...args: Args): Promise<T | void> => {
    try {
      setIsLoading(true);
      setError('');
      const result = await callback(...args);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [callback, options]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    isLoading,
    error,
    fetching,
    clearError,
  };
};