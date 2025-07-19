import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Heart, Brain, ArrowLeft, Sparkles } from 'lucide-react';
import { therapistPrompts, getMoodTherapistName, getMoodTherapistSpecialty } from '../utils/therapistPrompts';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import Header from './Header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  currentMood: string;
  onBack: () => void;
  sessionId?: string;
}

export default function ChatInterface({ currentMood, onBack, sessionId }: ChatInterfaceProps) {
  const { updateSession, currentSession } = useChatHistory();
  const therapistName = getMoodTherapistName(currentMood);
  const therapistSpecialty = getMoodTherapistSpecialty(currentMood);
  
  const getInitialMessage = () => {
    const messages = {
      happy: `Hello! I'm Dr. Joy, and I'm absolutely delighted to meet you! 🌟 I specialize in helping neurodivergent individuals like yourself harness that wonderful happy energy you're feeling. I understand that joy can sometimes feel overwhelming or hard to sustain - that's completely normal! Let's chat about how you're feeling and find ways to channel this beautiful energy into something meaningful for you. What's bringing you joy today?`,
      
      energetic: `Hey there! I'm Dr. Spark! ⚡ I can feel that amazing energy radiating from you - it's fantastic! As someone who works with ADHD, ASD, and other neurodivergent minds, I know this energy is both a gift and sometimes a challenge to manage. I'm here to help you channel it in ways that feel good and sustainable. No judgment, just support! What's got you feeling so energized today?`,
      
      overwhelmed: `Hi, I'm Dr. Calm. 🤗 First, I want you to know that feeling overwhelmed is completely valid, and you're not alone. Many neurodivergent individuals experience overwhelm more intensely, and that's okay. You're safe here. Take a deep breath with me - in for 4, hold for 4, out for 6. There's no pressure to be "productive" right now. Let's just focus on what you need in this moment. How are you feeling right now?`,
      
      focused: `Hello, I'm Dr. Flow. 🎯 I can sense you're in a focused state - that's wonderful! I work with many neurodivergent individuals who experience these beautiful periods of deep concentration. I'm here to help you make the most of this focus while also making sure you're taking care of yourself. Remember, even in flow states, your basic needs matter. How long have you been focused, and what are you working on?`,
      
      neutral: `Hi there, I'm Dr. Balance. 🌿 I'm glad you're here. Sometimes "neutral" can mean many things - maybe you're feeling steady, or perhaps you're in between emotions, or even feeling a bit numb. All of these are completely valid. As someone who works with neurodivergent minds, I know that neutral days can be just as important as the intense ones. They're often recovery time or preparation time. How are you really feeling today, beyond just "neutral"?`,
      
      depression: `Hello, I'm Dr. Hope. 🤗 I want you to know that I'm truly glad you're here, even though I understand it might have taken courage to reach out. Depression can feel so isolating, especially when you're neurodivergent and the world often feels like it wasn't made for minds like ours. But you're not alone, and you're not broken. I specialize in supporting people with ADHD, ASD, and other neurodivergent conditions through depression. There's no pressure to be "better" right now - we can just start where you are. How are you feeling in this moment?`
    };
    
    return messages[currentMood as keyof typeof messages] || messages.neutral;
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    if (currentSession && sessionId === currentSession.id) {
      return currentSession.messages.length > 0 ? currentSession.messages : [{
        role: 'assistant',
        content: getInitialMessage(),
        timestamp: new Date()
      }];
    }
    return [{
      role: 'assistant',
      content: getInitialMessage(),
      timestamp: new Date()
    }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    // Update session when messages change
    if (sessionId && messages.length > 0) {
      updateSession(sessionId, messages);
    }

    return () => clearTimeout(timer);
  }, [messages, sessionId, updateSession]);

  const callTherapistAPI = async (userMessage: string) => {
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
            { role: 'system', content: therapistPrompts[currentMood as keyof typeof therapistPrompts] || therapistPrompts.neutral },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Therapist API error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callTherapistAPI(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now, but I'm still here with you. Your feelings are valid, and you're not alone. 💜 Please check your API configuration and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodColor = () => {
    const colors = {
      happy: 'from-emerald-400 to-green-400',
      energetic: 'from-teal-400 to-emerald-400',
      overwhelmed: 'from-green-400 to-lime-400',
      focused: 'from-emerald-500 to-teal-500',
      neutral: 'from-slate-400 to-gray-400',
      depression: 'from-emerald-600 to-green-600'
    };
    return colors[currentMood as keyof typeof colors] || colors.neutral;
  };

  const getMoodBg = () => {
    const colors = {
      happy: 'from-emerald-50 to-green-50',
      energetic: 'from-teal-50 to-emerald-50',
      overwhelmed: 'from-green-50 to-lime-50',
      focused: 'from-emerald-50 to-teal-50',
      neutral: 'from-slate-50 to-gray-50',
      depression: 'from-emerald-50 to-green-50'
    };
    return colors[currentMood as keyof typeof colors] || colors.neutral;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodBg()} dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      <Header />
      
      <div className="h-screen flex flex-col">
        {/* Therapist Header - More compact on mobile */}
        <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className={`bg-gradient-to-r ${getMoodColor()} text-white`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-2xl font-bold truncate">{therapistName}</h1>
                    <p className="text-white/90 text-xs sm:text-sm truncate">{therapistSpecialty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-700 dark:to-gray-600 border-t border-gray-100 dark:border-gray-600">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-center">Safe, judgment-free space • Neurodivergent-friendly support</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                </div>
              </div>
            </div>
        </div>

        {/* Chat Messages - Fixed height with proper scrolling */}
        <div className="flex-1 flex flex-col min-h-0">
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6"
            style={{ 
              scrollBehavior: 'smooth',
              overflowAnchor: 'auto'
            }}
          >
            <div className="max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 sm:gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getMoodColor()} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <span className={`text-xs mt-2 sm:mt-3 block ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-800 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getMoodColor()} rounded-full flex items-center justify-center shadow-lg`}>
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 sm:p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-emerald-500" />
                      <span className="text-sm sm:text-base">{therapistName} is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form - Sticky at bottom */}
          <div className="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 sm:p-6">
              <div className="flex gap-2 sm:gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Share what's on your mind with ${therapistName}...`}
                  className="flex-1 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`bg-gradient-to-r ${getMoodColor()} hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md flex-shrink-0`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-3 text-center">
                This is a safe, judgment-free space. {therapistName} understands neurodivergent experiences. 💚
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}