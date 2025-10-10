import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid unnecessary refetches on component mount/focus
      // so pagination doesn't trigger category/wallet re-requests
      // staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchIntervalInBackground: false,
      refetchInterval: 1000000,
      retry: false,
      retryDelay: 1000000,
      retryOnMount: false,
      throwOnError: false,
    },
  },
});
