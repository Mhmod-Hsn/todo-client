import React, { useState } from 'react';
import { useCreateTodo } from '../hooks/useTodos';
import { TodoFormFields } from './TodoFormFields';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

	const createTodo = useCreateTodo();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) return;

		createTodo.mutate(
			{
				title: title.trim(),
				description: description.trim() || undefined,
				isCompleted,
			},
			{
				onSuccess: () => {
					setTitle("");
					setDescription("");
					setIsCompleted(false);
				},
			}
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6"
		>
			<h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Todo</h2>

			<TodoFormFields
				title={title}
				setTitle={setTitle}
				description={description}
				setDescription={setDescription}
				isCompleted={isCompleted}
				setIsCompleted={setIsCompleted}
			/>

			<button
				type="submit"
				disabled={!title.trim() || createTodo.isPending}
				className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{createTodo.isPending ? "Adding..." : "Add Todo"}
			</button>
		</form>
	);
};
