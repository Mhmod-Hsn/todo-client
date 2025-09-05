import React, { useEffect, useState } from 'react';
import { useDeleteTodo, useUpdateTodo } from '../hooks/useTodos';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title || '');
  const [description, setDescription] = useState(todo.description || '');

  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  // Sync local state with todo prop changes
  useEffect(() => {
    setTitle(todo.title || '');
    setDescription(todo.description || '');
  }, [todo.title, todo.description]);

  const handleUpdate = () => {
    updateTodo.mutate(
      { 
        id: todo.id, 
        input: { 
          title: title.trim(),
          description: description.trim() || undefined
        }
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo.mutate(todo.id);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title || '');
    setDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Todo title"
              autoFocus
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Todo description (optional)"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={!title.trim() || updateTodo.isPending}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateTodo.isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {todo.title || 'Untitled'}
          </h3>
          {todo.description && (
            <p className="text-gray-600 mb-3">{todo.description}</p>
          )}
          {todo.user && (
            <p className="text-sm text-gray-500">User ID: {todo.user.id}</p>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteTodo.isPending}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm disabled:opacity-50"
          >
            {deleteTodo.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
