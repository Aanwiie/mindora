import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Brain, Heart, Eye, Loader2, Send, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import Header from './Header';

interface MindMirrorProps {
  onBack: () => void;
}

interface JournalEntry {
  id: string;
  content: string;
  aiReflection: string;
  followUpPrompt?: string;
  mood?: string;
  themes: string[];
  timestamp: Date;
}

interface Pattern {
  theme: string;
  frequency: number;
  lastSeen: Date;
  context: string;
}

export default function MindMirror({ onBack }: MindMirrorProps) {
  const [currentEntry, setCurrentEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('mindMirrorEntries');
    return saved ? JSON.parse(saved).map((entry: any) => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    })) : [];
  });
  const [currentReflection, setCurrentReflection] = useState<{
    reflection: string;
    followUp: string;
    mood: string;
    themes: string[];
  } | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [showPastEntry, setShowPastEntry] = useState<JournalEntry | null>(null);
  const [conversationMode, setConversationMode] = useState(false);
  const [conversationResponse, setConversationResponse] = useState('');

  useEffect(() => {
    localStorage.setItem('mindMirrorEntries', JSON.stringify(entries));
    updatePatterns();
  }, [entries]);

  const updatePatterns = () => {
    const themeCount: { [key: string]: { count: number; lastSeen: Date; context: string } } = {};
    
    entries.forEach(entry => {
      entry.themes.forEach(theme => {
        if (themeCount[theme]) {
          themeCount[theme].count++;
          if (entry.timestamp > themeCount[theme].lastSeen) {
            themeCount[theme].lastSeen = entry.timestamp;
            themeCount[theme].context = entry.content.slice(0, 100) + '...';
          }
        } else {
          themeCount[theme] = {
            count: 1,
            lastSeen: entry.timestamp,
            context: entry.content.slice(0, 100) + '...'
          };
        }
      });
    });

    const newPatterns = Object.entries(themeCount)
      .filter(([_, data]) => data.count >= 2)
      .map(([theme, data]) => ({
        theme,
        frequency: data.count,
        lastSeen: data.lastSeen,
        context: data.context
      }))
      .sort((a, b) => b.frequency - a.frequency);

    setPatterns(newPatterns);
  };

  const analyzeJournalEntry = async (content: string) => {
    try {
      const response = await fetch('https://api.intelligence.io.solutions/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_IO_API_KEY}`,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_IO_MODEL_NAME || 'meta-llama/Llama-3.3-70B-Instruct',
          messages: [
            {
              role: 'system',
              content: `You are Mind Mirror, an empathetic AI journaling companion that helps users reflect deeply on their emotions and thoughts. Your role is to:

1. Provide thoughtful, non-judgmental reflections on journal entries
2. Identify emotional themes and patterns
3. Generate follow-up prompts that encourage deeper self-reflection
4. Detect the overall mood/emotional tone

Respond in JSON format with:
{
  "reflection": "A gentle, insightful 1-2 sentence reflection that mirrors back what you notice",
  "followUp": "A thoughtful question or prompt for deeper reflection",
  "mood": "One word describing the primary emotional tone (e.g., anxious, joyful, reflective, frustrated, hopeful, melancholy, excited, overwhelmed, peaceful, conflicted)",
  "themes": ["array", "of", "key", "themes", "or", "concepts", "mentioned"]
}

Be warm, understanding, and focus on helping the user gain clarity about their inner world. Avoid being prescriptive or giving advice - instead, help them discover their own insights.`
            },
            {
              role: 'user',
              content: content
            }
          ],
          temperature: 0.7,
          max_tokens: 400
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze journal entry');
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      // Parse JSON response
      try {
        const analysis = JSON.parse(analysisText);
        return analysis;
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          reflection: "Thank you for sharing your thoughts. I can sense there's depth in what you've written.",
          followUp: "What feels most important to you about what you just shared?",
          mood: "reflective",
          themes: ["self-reflection"]
        };
      }
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        reflection: "I'm here to listen and reflect with you. Your thoughts and feelings are valid.",
        followUp: "What would you like to explore more deeply about this experience?",
        mood: "neutral",
        themes: ["personal-growth"]
      };
    }
  };

  const handleSubmitEntry = async () => {
    if (!currentEntry.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeJournalEntry(currentEntry);
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        aiReflection: analysis.reflection,
        followUpPrompt: analysis.followUp,
        mood: analysis.mood,
        themes: analysis.themes || [],
        timestamp: new Date()
      };

      setEntries(prev => [newEntry, ...prev]);
      setCurrentReflection(analysis);
      setCurrentEntry('');
    } catch (error) {
      console.error('Error submitting entry:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConversationWithPast = async (pastEntry: JournalEntry) => {
    if (!conversationResponse.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://api.intelligence.io.solutions/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_IO_API_KEY}`,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_IO_MODEL_NAME || 'meta-llama/Llama-3.3-70B-Instruct',
          messages: [
            {
              role: 'system',
              content: `You are Mind Mirror, helping a user have a conversation with their past self through journaling. The user is responding to an old journal entry. Provide a thoughtful reflection on the growth, changes, or continuity between their past and present thoughts.

Respond with a gentle, insightful reflection (2-3 sentences) that helps them see the connection between who they were and who they are now.`
            },
            {
              role: 'user',
              content: `Past entry from ${pastEntry.timestamp.toLocaleDateString()}: "${pastEntry.content}"

My response today: "${conversationResponse}"`
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate conversation reflection');
      }

      const data = await response.json();
      const reflection = data.choices[0].message.content;

      // Create a new entry for this conversation
      const conversationEntry: JournalEntry = {
        id: Date.now().toString(),
        content: `Responding to my past self (${pastEntry.timestamp.toLocaleDateString()}): ${conversationResponse}`,
        aiReflection: reflection,
        mood: 'reflective',
        themes: ['self-reflection', 'personal-growth', 'time-perspective'],
        timestamp: new Date()
      };

      setEntries(prev => [conversationEntry, ...prev]);
      setConversationResponse('');
      setShowPastEntry(null);
      setConversationMode(false);
    } catch (error) {
      console.error('Conversation error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      joyful: 'from-yellow-400 to-orange-400',
      happy: 'from-green-400 to-emerald-400',
      peaceful: 'from-blue-400 to-cyan-400',
      excited: 'from-purple-400 to-pink-400',
      hopeful: 'from-emerald-400 to-teal-400',
      anxious: 'from-orange-400 to-red-400',
      frustrated: 'from-red-400 to-pink-400',
      melancholy: 'from-indigo-400 to-purple-400',
      overwhelmed: 'from-gray-400 to-slate-400',
      conflicted: 'from-amber-400 to-orange-400',
      reflective: 'from-teal-400 to-blue-400',
      neutral: 'from-gray-400 to-slate-400'
    };
    return colors[mood] || colors.neutral;
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      joyful: '😊', happy: '😄', peaceful: '😌', excited: '🤩', hopeful: '🌟',
      anxious: '😰', frustrated: '😤', melancholy: '😔', overwhelmed: '😵‍💫',
      conflicted: '🤔', reflective: '🧘‍♀️', neutral: '😐'
    };
    return emojis[mood] || '💭';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300">
      <Header onHomeClick={onBack} showHomeButton={true} />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🪞 Mind Mirror
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your AI-powered reflection companion. Write your thoughts, and let Mind Mirror help you discover deeper insights about yourself.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Journal Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Journal Entry Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  What's on your mind today?
                </h2>
              </div>
              
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write freely about your thoughts, feelings, experiences, or anything that's important to you right now..."
                className="w-full h-48 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                disabled={isAnalyzing}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentEntry.length} characters
                </span>
                <button
                  onClick={handleSubmitEntry}
                  disabled={!currentEntry.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      🪞 Mind Mirror is reflecting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Reflect with Mind Mirror
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Reflection */}
            {currentReflection && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-700 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Mind Mirror's Reflection
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getMoodColor(currentReflection.mood)} text-white`}>
                    {getMoodEmoji(currentReflection.mood)} {currentReflection.mood}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentReflection.reflection}
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Reflection Prompt
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      {currentReflection.followUp}
                    </p>
                  </div>
                  
                  {currentReflection.themes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentReflection.themes.map((theme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Entries */}
            {entries.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Recent Reflections
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                          {entry.mood && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getMoodColor(entry.mood)} text-white`}>
                              {getMoodEmoji(entry.mood)} {entry.mood}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setShowPastEntry(entry);
                            setConversationMode(true);
                          }}
                          className="text-indigo-500 hover:text-indigo-600 text-sm font-medium transition-colors duration-300"
                        >
                          Respond to past self
                        </button>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                        {entry.content}
                      </p>
                      
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3">
                        <p className="text-indigo-700 dark:text-indigo-300 text-sm italic">
                          {entry.aiReflection}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patterns & Insights */}
            {patterns.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Patterns & Insights
                </h3>
                
                <div className="space-y-3">
                  {patterns.slice(0, 5).map((pattern, index) => (
                    <div
                      key={index}
                      className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-purple-700 dark:text-purple-300 text-sm">
                          {pattern.theme}
                        </span>
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          {pattern.frequency}x
                        </span>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Last seen: {pattern.lastSeen.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Your Journey
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Entries</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {entries.length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Themes Explored</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {patterns.length}
                  </span>
                </div>
                
                {entries.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Last Entry</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {entries[0].timestamp.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conversation with Past Self Modal */}
        {conversationMode && showPastEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Conversation with Your Past Self
                </h3>
                <button
                  onClick={() => {
                    setConversationMode(false);
                    setShowPastEntry(null);
                    setConversationResponse('');
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  You wrote this on {showPastEntry.timestamp.toLocaleDateString()}:
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{showPastEntry.content}"
                </p>
              </div>
              
              <textarea
                value={conversationResponse}
                onChange={(e) => setConversationResponse(e.target.value)}
                placeholder="What would you like to say to your past self? How do you feel about this now?"
                className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 mb-4"
                disabled={isAnalyzing}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleConversationWithPast(showPastEntry)}
                  disabled={!conversationResponse.trim() || isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Reflecting...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Send to Past Self
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}