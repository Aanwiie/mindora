import { Smile, Zap, Cloud, Target, Heart } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  currentMood: string;
}

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'bg-emerald-100', textColor: 'text-emerald-800' },
  { id: 'energetic', label: 'Energetic', icon: Zap, color: 'bg-teal-100', textColor: 'text-teal-800' },
  { id: 'overwhelmed', label: 'Overwhelmed', icon: Cloud, color: 'bg-green-100', textColor: 'text-green-800' },
  { id: 'focused', label: 'Focused', icon: Target, color: 'bg-lime-100', textColor: 'text-lime-800' },
  { id: 'neutral', label: 'Neutral', icon: Heart, color: 'bg-gray-200', textColor: 'text-gray-800' },
];

export default function MoodSelector({ onMoodSelect, currentMood }: MoodSelectorProps) {
  return (
    <div className="mb-6 bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">How are you feeling today?</h3>
      <div className="grid grid-cols-5 gap-2">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => onMoodSelect(mood.id)}
              className={`p-3 rounded-xl ${mood.color} ${mood.textColor} transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg ${
                currentMood === mood.id ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
            >
              <IconComponent className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-medium block">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}