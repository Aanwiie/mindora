import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface TaskInputProps {
  onTaskCreate: (input: string) => void;
  isLoading: boolean;
}

export default function TaskInput({ onTaskCreate, isLoading }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onTaskCreate(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 focus-within:border-emerald-500 transition-colors shadow-lg">
        <label htmlFor="task-input" className="block text-sm font-medium text-gray-700 mb-2">
          What would you like to accomplish today?
        </label>
        <div className="flex gap-3">
          <input
            id="task-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I want to revise math for 2 hours today"
            className="flex-1 border-none outline-none text-gray-800 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isLoading ? 'Creating...' : 'Create Plan'}
          </button>
        </div>
      </div>
    </form>
  );
}