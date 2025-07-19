import { Smile, Zap, Cloud, Target, Heart, ArrowLeft, Brain, CloudRain } from 'lucide-react';
import Header from './Header';

interface MoodSelectionProps {
  onMoodSelect: (mood: string) => void;
  onBack: () => void;
}

const moods = [
  { 
    id: 'happy', 
    label: 'Happy', 
    icon: Smile, 
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    description: 'Feeling joyful and positive',
    therapist: 'Dr. Joy',
    specialty: 'Positive Psychology & Neurodivergent Joy'
  },
  { 
    id: 'energetic', 
    label: 'Energetic', 
    icon: Zap, 
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    description: 'Full of energy and ready to go',
    therapist: 'Dr. Spark',
    specialty: 'Energy Management & ADHD Support'
  },
  { 
    id: 'overwhelmed', 
    label: 'Overwhelmed', 
    icon: Cloud, 
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    description: 'Feeling stressed or anxious',
    therapist: 'Dr. Calm',
    specialty: 'Anxiety & Sensory Regulation'
  },
  { 
    id: 'focused', 
    label: 'Focused', 
    icon: Target, 
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    description: 'In the zone and concentrated',
    therapist: 'Dr. Flow',
    specialty: 'Flow States & Hyperfocus Balance'
  },
  { 
    id: 'neutral', 
    label: 'Neutral', 
    icon: Heart, 
    color: 'from-gray-400 to-slate-400',
    bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
    description: 'Feeling balanced and steady',
    therapist: 'Dr. Balance',
    specialty: 'Emotional Balance & Routine Building'
  },
  { 
    id: 'depression', 
    label: 'Depression', 
    icon: CloudRain, 
    color: 'from-indigo-400 to-purple-400',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    description: 'Feeling down or struggling mentally',
    therapist: 'Dr. Hope',
    specialty: 'Depression & Mental Health Support'
  }
];

export default function MoodSelection({ onMoodSelect, onBack }: MoodSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 transition-colors duration-300">
      <Header onHomeClick={onBack} showHomeButton={true} />
      
      <div className="max-w-6xl mx-auto pt-4 sm:pt-8 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl pulse-gentle">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4">
            How are you feeling today?
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose your current mood to connect with a specialist therapist 
            who understands exactly what you're going through.
          </p>
        </div>

        {/* Mood Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {moods.map((mood) => {
            const IconComponent = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => onMoodSelect(mood.id)}
                className={`${mood.bgColor} dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-left border-2 border-white dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 group`}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${mood.color} rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {mood.label}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                  {mood.description}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    {mood.therapist}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {mood.specialty}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
          <div className="flex justify-center mb-3 sm:mb-4">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
            Each specialist is trained to understand neurodivergent experiences including ADHD, 
            ASD, and other conditions.
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            You're in a safe space where your feelings are valid 
            and your unique way of thinking is celebrated.
          </p>
        </div>
      </div>
    </div>
  );
}