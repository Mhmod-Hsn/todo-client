import { gql } from '@apollo/client';

export const GET_TODOS = gql`
	query GetTodos {
		todos {
			id
			title
			description
			user {
				id
			}
		}
	}
`;

export const GET_TODO = gql`
	query GetTodo($id: ID!) {
		todo(id: $id) {
			id
			title
			description
			user {
				id
			}
		}
	}
`;

export const CREATE_TODO = gql`
	mutation CreateTodo($input: CreateTodoInput!) {
		createTodo(input: $input) {
			title
			description
		}
	}
`;

export const UPDATE_TODO = gql`
	mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
		updateTodo(id: $id, input: $input) {
			title
			description
		}
	}
`;

export const DELETE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
