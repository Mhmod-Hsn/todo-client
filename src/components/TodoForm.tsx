import React, { useState } from 'react';
import { useCreateTodo } from '../hooks/useTodos';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
          setTitle('');
          setDescription('');
          setIsCompleted(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Todo</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter todo title"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter todo description"
            rows={3}
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCompleted"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isCompleted" className="ml-2 text-sm text-gray-700">
            Mark as completed
          </label>
        </div>
        
        <button
          type="submit"
          disabled={!title.trim() || createTodo.isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createTodo.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
};
