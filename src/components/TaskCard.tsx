import { useState } from 'react';
import { Check, Clock, SkipForward, RotateCcw, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
  skipped: boolean;
  category: string;
  scheduledTime: string;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onSkip: (id: string) => void;
  onReschedule: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  work: 'bg-emerald-100 border-emerald-300 text-emerald-800',
  personal: 'bg-green-100 border-green-300 text-green-800',
  study: 'bg-teal-100 border-teal-300 text-teal-800',
  health: 'bg-lime-100 border-lime-300 text-lime-800',
  creative: 'bg-mint-100 border-mint-300 text-mint-800',
  planning: 'bg-sage-100 border-sage-300 text-sage-800',
};

export default function TaskCard({ task, onComplete, onSkip, onReschedule, onDelete }: TaskCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border-2 p-4 card-hover shadow-md ${
        task.completed ? 'opacity-60 border-green-300' : task.skipped ? 'opacity-40 border-gray-300' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-green-600' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category as keyof typeof categoryColors] || categoryColors.personal}`}>
          {task.category}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{task.duration} min</span>
        </div>
        <span>{task.scheduledTime}</span>
      </div>

      {!task.completed && !task.skipped && (
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(task.id)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Check className="w-4 h-4" />
            Complete
          </button>
          <button
            onClick={() => onSkip(task.id)}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </button>
        </div>
      )}

      {task.skipped && (
        <div className="flex gap-2">
          <button
            onClick={() => onReschedule(task.id)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Reschedule
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {task.completed && (
        <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
          <Check className="w-5 h-5" />
          <span>Completed! Great job! 🎉</span>
        </div>
      )}
    </div>
  );
}