import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlFetch } from '../lib/graphql';
import { CREATE_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../lib/queries';
import type { CreateTodoInput, Todo, UpdateTodoInput } from '../types/todo';

// Query hooks
export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const data = await graphqlFetch(GET_TODOS);
      return data.todos;
    },
  });
};

// Mutation hooks
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const data = await graphqlFetch(CREATE_TODO, { input });
      return data.createTodo;
    },
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateTodoInput }) => {
      const data = await graphqlFetch(UPDATE_TODO, { id, input });
      return data.updateTodo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlFetch(DELETE_TODO, { id });
      return data.removeTodo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
