import { useState, useEffect } from 'react';
import { Bell, X, Heart, Zap, Smile } from 'lucide-react';

interface NudgeSystemProps {
  currentMood: string;
  reminderTone: string;
  onToneChange: (tone: string) => void;
}

const reminderTones = [
  { id: 'soft', label: 'Soft', icon: Heart, color: 'bg-green-100 text-green-800' },
  { id: 'motivational', label: 'Motivational', icon: Zap, color: 'bg-emerald-100 text-emerald-800' },
  { id: 'funny', label: 'Funny', icon: Smile, color: 'bg-teal-100 text-teal-800' },
];

const nudgeMessages = {
  soft: [
    "Hey, how about a gentle 15-minute focus session? You've been doing great 💖",
    "Time for a little productivity moment. You're amazing for keeping up! 🌸",
    "Just a sweet reminder - your future self will thank you for this 🤗",
  ],
  motivational: [
    "Let's crush this next task — you've got the momentum! 🚀",
    "Time to show this task who's boss! You're unstoppable! 💪",
    "Your goals are calling — let's make them proud! ⭐",
  ],
  funny: [
    "Alright champion, time to pretend we love productivity again 🦸‍♀️",
    "Your procrastination break is officially over. Back to being awesome! 😄",
    "Plot twist: You're about to be productive AND have fun doing it! 🎭",
  ],
};

export default function NudgeSystem({ currentMood, reminderTone, onToneChange }: NudgeSystemProps) {
  const [showNudge, setShowNudge] = useState(false);
  const [currentNudge, setCurrentNudge] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = nudgeMessages[reminderTone as keyof typeof nudgeMessages];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentNudge(randomMessage);
      setShowNudge(true);

      setTimeout(() => setShowNudge(false), 5000);
    }, 45000); // Show nudge every 45 seconds for demo

    return () => clearInterval(interval);
  }, [reminderTone]);

  return (
    <div className="mb-6 bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Reminder Tone</h3>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {reminderTones.map((tone) => {
          const IconComponent = tone.icon;
          return (
            <button
              key={tone.id}
              onClick={() => onToneChange(tone.id)}
              className={`p-3 rounded-lg ${tone.color} transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg ${
                reminderTone === tone.id ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
            >
              <IconComponent className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium block">{tone.label}</span>
            </button>
          );
        })}
      </div>

      {showNudge && (
          <div className="bg-white border border-emerald-200 rounded-lg p-4 shadow-lg slide-in">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-emerald-500 mt-0.5" />
                <p className="text-gray-700 flex-1">{currentNudge}</p>
              </div>
              <button
                onClick={() => setShowNudge(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
      )}
    </div>
  );
}