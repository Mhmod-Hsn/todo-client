import { QueryClient } from '@tanstack/react-query';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

export const graphqlFetch = async (query: DocumentNode | string, variables?: Record<string, unknown>) => {
  const queryString = typeof query === 'string' ? query : print(query);
  
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  console.log("🚀 ~ graphqlFetch ~ response:", response)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    console.error('GraphQL Error Details:', result.errors);
    console.error('Variables used:', variables);
    console.error('Query used:', queryString);
    throw new Error(result.errors[0].message);
  }

  return result.data;
};
