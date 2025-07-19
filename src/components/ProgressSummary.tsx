import { Calendar, CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  skipped: boolean;
  duration: number;
}

interface ProgressSummaryProps {
  tasks: Task[];
}

export default function ProgressSummary({ tasks }: ProgressSummaryProps) {
  const completedTasks = tasks.filter(task => task.completed);
  const skippedTasks = tasks.filter(task => task.skipped);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const totalTimeSpent = completedTasks.reduce((sum, task) => sum + task.duration, 0);

  const getEncouragingMessage = () => {
    if (completionRate >= 80) return "Outstanding work! You're absolutely crushing it today! 🌟";
    if (completionRate >= 60) return "You're doing great! Keep up the amazing momentum! 💪";
    if (completionRate >= 40) return "Nice progress! You're building great habits! 🚀";
    if (completionRate >= 20) return "Every step counts! You're making progress! 🌱";
    return "Starting is the hardest part - you've got this! 💖";
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Today's Progress</h2>
        <TrendingUp className="w-6 h-6 text-green-500" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-green-50 rounded-lg p-3 text-center shadow-md">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-green-700">{completedTasks.length}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-3 text-center shadow-md">
          <Target className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-amber-700">{skippedTasks.length}</div>
          <div className="text-sm text-amber-600">Skipped</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 text-center shadow-md">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-blue-700">{totalTimeSpent}</div>
          <div className="text-sm text-blue-600">Minutes</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3 text-center shadow-md">
          <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-purple-700">{completionRate}%</div>
          <div className="text-sm text-purple-600">Complete</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{completedTasks.length} of {totalTasks} tasks</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 text-center font-medium">
          {getEncouragingMessage()}
        </p>
      </div>
    </div>
  );
}