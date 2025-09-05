import React from 'react';

interface TodoFormFieldsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  completedId?: string;
  autoFocus?: boolean;
}

export const TodoFormFields: React.FC<TodoFormFieldsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  isCompleted,
  setIsCompleted,
  titleId = 'title',
  descriptionId = 'description',
  completedId = 'isCompleted',
  autoFocus = false,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={titleId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id={titleId}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter todo title"
          required
          autoFocus={autoFocus}
        />
      </div>

      <div>
        <label
          htmlFor={descriptionId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (optional)
        </label>
        <textarea
          id={descriptionId}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter todo description"
          rows={3}
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id={completedId}
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor={completedId} className="ml-2 text-sm text-gray-700">
          Mark as completed
        </label>
      </div>
    </div>
  );
};
