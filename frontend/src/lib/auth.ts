'use client';

export function logger(useSWRNext) {
  return (key, fetcher, config) => {
    // Add logger to the original fetcher.
    const extendedFetcher = (...args) => {
      console.log('SWR Request:', key)
      return fetcher(...args)
    }
 
    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config)
  }
}