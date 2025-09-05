export interface User {
  id: string;
  // Add other user properties as needed
}

export interface Todo {
	id: string;
	title?: string;
	description?: string;
	user?: User;
}

export interface CreateTodoInput {
	title: string;
	description?: string;
}

export interface UpdateTodoInput {
	title?: string;
	description?: string;
}
