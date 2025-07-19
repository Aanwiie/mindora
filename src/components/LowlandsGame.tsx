import { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Droplets, Sparkles, Heart, Coffee, Bed, Utensils, Shirt } from 'lucide-react';
import Header from './Header';

interface LowlandsGameProps {
  onBack: () => void;
}

interface GameState {
  fogLevel: number; // 0-100, 0 = clear, 100 = very foggy
  brightness: number; // 0-100, 0 = dark, 100 = bright
  items: {
    warmSocks: boolean;
    sunlightRing: boolean;
    sparkleBuff: boolean;
    comfortBlanket: boolean;
    morningCoffee: boolean;
    freshClothes: boolean;
  };
  completedTasks: string[];
  streak: number;
  lastTaskTime: Date | null;
}

const initialGameState: GameState = {
  fogLevel: 85,
  brightness: 15,
  items: {
    warmSocks: false,
    sunlightRing: false,
    sparkleBuff: false,
    comfortBlanket: false,
    morningCoffee: false,
    freshClothes: false,
  },
  completedTasks: [],
  streak: 0,
  lastTaskTime: null,
};

const tasks = [
  {
    id: 'get-out-of-bed',
    title: 'Get Out of Bed',
    description: 'Take that first brave step out of bed',
    icon: Bed,
    reward: 'comfortBlanket',
    fogReduction: 15,
    brightnessIncrease: 20,
    encouragement: "You did it! That first step is always the hardest. Your world is already getting brighter! 🌅"
  },
  {
    id: 'drink-water',
    title: 'Drink Water',
    description: 'Hydrate your body and mind',
    icon: Droplets,
    reward: 'sunlightRing',
    fogReduction: 10,
    brightnessIncrease: 15,
    encouragement: "Wonderful! You're taking care of yourself. Feel that gentle energy flowing through you! 💧"
  },
  {
    id: 'brush-teeth',
    title: 'Brush Teeth',
    description: 'Fresh start for a fresh day',
    icon: Sparkles,
    reward: 'sparkleBuff',
    fogReduction: 12,
    brightnessIncrease: 18,
    encouragement: "Sparkling! You're building momentum one small step at a time. You're amazing! ✨"
  },
  {
    id: 'put-on-socks',
    title: 'Put On Warm Socks',
    description: 'Comfort your feet, comfort your soul',
    icon: Heart,
    reward: 'warmSocks',
    fogReduction: 8,
    brightnessIncrease: 12,
    encouragement: "Cozy! Sometimes the smallest comforts make the biggest difference. You're worth this care! 🧦"
  },
  {
    id: 'make-coffee',
    title: 'Make Coffee/Tea',
    description: 'Warm beverage for your spirit',
    icon: Coffee,
    reward: 'morningCoffee',
    fogReduction: 10,
    brightnessIncrease: 15,
    encouragement: "Perfect! Taking time for simple pleasures is an act of self-love. Enjoy every sip! ☕"
  },
  {
    id: 'change-clothes',
    title: 'Change Clothes',
    description: 'Fresh clothes, fresh perspective',
    icon: Shirt,
    reward: 'freshClothes',
    fogReduction: 12,
    brightnessIncrease: 16,
    encouragement: "Fresh and renewed! You're transforming your day one choice at a time. So proud of you! 👕"
  },
];

export default function LowlandsGame({ onBack }: LowlandsGameProps) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('lowlandsGameState');
    return saved ? JSON.parse(saved) : initialGameState;
  });
  
  const [showEncouragement, setShowEncouragement] = useState<string>('');
  const [completedTaskId, setCompletedTaskId] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('lowlandsGameState', JSON.stringify(gameState));
  }, [gameState]);

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || gameState.completedTasks.includes(taskId)) return;

    setGameState(prev => ({
      ...prev,
      fogLevel: Math.max(0, prev.fogLevel - task.fogReduction),
      brightness: Math.min(100, prev.brightness + task.brightnessIncrease),
      items: {
        ...prev.items,
        [task.reward]: true,
      },
      completedTasks: [...prev.completedTasks, taskId],
      streak: prev.streak + 1,
      lastTaskTime: new Date(),
    }));

    setShowEncouragement(task.encouragement);
    setCompletedTaskId(taskId);
    
    // Hide encouragement after 4 seconds
    setTimeout(() => {
      setShowEncouragement('');
      setCompletedTaskId('');
    }, 4000);
  };

  const resetGame = () => {
    setGameState(initialGameState);
    localStorage.removeItem('lowlandsGameState');
  };

  const getWorldStyle = () => {
    const fogOpacity = gameState.fogLevel / 100;
    const brightness = gameState.brightness / 100;
    
    return {
      background: `linear-gradient(135deg, 
        rgba(148, 163, 184, ${fogOpacity}) 0%, 
        rgba(203, 213, 225, ${fogOpacity * 0.8}) 50%, 
        rgba(241, 245, 249, ${fogOpacity * 0.6}) 100%),
        linear-gradient(135deg, 
        rgba(16, 185, 129, ${brightness * 0.3}) 0%, 
        rgba(34, 197, 94, ${brightness * 0.4}) 50%, 
        rgba(132, 204, 22, ${brightness * 0.3}) 100%)`,
      filter: `brightness(${0.4 + brightness * 0.6})`,
    };
  };

  const getItemIcon = (itemKey: string) => {
    const icons = {
      warmSocks: '🧦',
      sunlightRing: '💍',
      sparkleBuff: '✨',
      comfortBlanket: '🛏️',
      morningCoffee: '☕',
      freshClothes: '👕',
    };
    return icons[itemKey as keyof typeof icons] || '🎁';
  };

  const getProgressMessage = () => {
    if (gameState.fogLevel <= 20) {
      return "The sun is shining brightly! Your world is beautiful and clear! 🌞";
    } else if (gameState.fogLevel <= 40) {
      return "The fog is lifting! You can see hope on the horizon! 🌤️";
    } else if (gameState.fogLevel <= 60) {
      return "Small patches of light are breaking through! Keep going! ⛅";
    } else if (gameState.fogLevel <= 80) {
      return "You're making progress! The fog is starting to thin! 🌫️";
    } else {
      return "The world feels heavy, but you're here. That's what matters. 🤗";
    }
  };

  return (
    <div className="min-h-screen transition-all duration-1000" style={getWorldStyle()}>
      <Header onHomeClick={onBack} showHomeButton={true} />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            🌫️ The Lowlands
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {getProgressMessage()}
          </p>
          
          {/* Progress Indicators */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sun className="w-6 h-6 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Brightness</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${gameState.brightness}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-blue-500">🌫️</div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fog Level</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-slate-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${gameState.fogLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{gameState.streak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement Message */}
        {showEncouragement && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce max-w-md text-center">
            <p className="font-semibold">{showEncouragement}</p>
          </div>
        )}

        {/* Tasks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tasks.map((task) => {
            const IconComponent = task.icon;
            const isCompleted = gameState.completedTasks.includes(task.id);
            const isJustCompleted = completedTaskId === task.id;
            
            return (
              <div
                key={task.id}
                className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 ${
                  isCompleted 
                    ? 'border-emerald-300 bg-emerald-50/90 dark:bg-emerald-900/30' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 hover:shadow-xl'
                } ${isJustCompleted ? 'animate-pulse scale-105' : ''}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                      : 'bg-gradient-to-r from-slate-400 to-gray-400'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${
                      isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {task.description}
                    </p>
                  </div>
                </div>
                
                {isCompleted ? (
                  <div className="text-center">
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                      ✅ Completed!
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Earned: {getItemIcon(task.reward)} {task.reward.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Complete Task
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Collected Items */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            🎒 Your Comfort Collection
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {Object.entries(gameState.items).map(([itemKey, hasItem]) => (
              <div
                key={itemKey}
                className={`text-center p-4 rounded-xl transition-all duration-300 ${
                  hasItem 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 shadow-lg scale-105' 
                    : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">
                  {hasItem ? getItemIcon(itemKey) : '🔒'}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {itemKey.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start New Journey
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Remember: Every small step matters. You're doing great! 💚
          </p>
        </div>
      </div>
    </div>
  );
}