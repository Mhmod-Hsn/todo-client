export interface User {
  id: string;
  // Add other user properties as needed
}

export interface Todo {
	id: string;
	title?: string;
	description?: string;
	isCompleted?: boolean;
	user?: User;
}

export interface CreateTodoInput {
	title: string;
	description?: string;
	isCompleted?: boolean;
}

export interface UpdateTodoInput {
	title?: string;
	description?: string;
	isCompleted?: boolean;
}
