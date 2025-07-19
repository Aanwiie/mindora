import { ArrowLeft, Trash2, MessageCircle, Calendar, Clock } from 'lucide-react';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';

interface ChatHistoryProps {
  onBack: () => void;
  onSessionSelect: (sessionId: string) => void;
}

export default function ChatHistory({ onBack, onSessionSelect }: ChatHistoryProps) {
  const { sessions, deleteSession, clearHistory } = useChatHistory();
  const { theme } = useTheme();

  const getMoodColor = (mood: string) => {
    const colors = {
      happy: 'from-emerald-400 to-green-400',
      energetic: 'from-teal-400 to-emerald-400',
      overwhelmed: 'from-green-400 to-lime-400',
      focused: 'from-emerald-500 to-teal-500',
      neutral: 'from-slate-400 to-gray-400',
      depression: 'from-emerald-600 to-green-600'
    };
    return colors[mood as keyof typeof colors] || colors.neutral;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header onHomeClick={onBack} showHomeButton={true} />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Chat History</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Your previous conversations with Mindora</p>
          </div>
          
          {sessions.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm sm:text-base">Clear All</span>
            </button>
          )}
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No chat history yet</h3>
            <p className="text-gray-500 dark:text-gray-500 text-sm sm:text-base">Start a conversation to see your chat history here</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getMoodColor(session.mood)} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
                          {session.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{formatDate(session.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{session.messages.length} messages</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getMoodColor(session.mood)} text-white`}>
                            {session.mood}
                          </span>
                        </div>
                        
                        {session.messages.length > 1 && (
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {session.messages[1]?.content || 'No messages yet'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onSessionSelect(session.id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}