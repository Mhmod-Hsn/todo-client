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
		select: (data) => {
			return data
				.sort((a, b) => Number(b.id) - Number(a.id))
				.map((todo) => ({
					...todo,
				}));
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
			// wait 1 second before invalidating to ensure backend has processed the update
			setTimeout(() => {
				queryClient.invalidateQueries({ queryKey: ["todos"] });
			}, 100);
		},
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
		mutationFn: async ({
			id,
			input,
		}: {
			id: string;
			input: UpdateTodoInput;
		}) => {
			const data = await graphqlFetch(UPDATE_TODO, { id, input });
			return data.updateTodo;
		},
		onSuccess: () => {
			// wait 1 second before invalidating to ensure backend has processed the update
			setTimeout(() => {
				queryClient.invalidateQueries({ queryKey: ['todos'] });
			}, 100);
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
