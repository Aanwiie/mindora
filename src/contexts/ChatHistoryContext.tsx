import { createContext, useContext, useState, useEffect } from 'react';

export interface ChatSession {
  id: string;
  mood: string;
  title: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  lastUpdated: Date;
}

interface ChatHistoryContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  createSession: (mood: string) => string;
  updateSession: (sessionId: string, messages: any[]) => void;
  deleteSession: (sessionId: string) => void;
  loadSession: (sessionId: string) => void;
  clearHistory: () => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      }
    }
    return [];
  });
  
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(sessions));
  }, [sessions]);

  const createSession = (mood: string): string => {
    const sessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: sessionId,
      mood,
      title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Session`,
      messages: [],
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
    return sessionId;
  };

  const updateSession = (sessionId: string, messages: any[]) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { 
            ...session, 
            messages: messages.map(msg => ({
              ...msg,
              timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
            })),
            lastUpdated: new Date(),
            title: messages.length > 1 ? messages[1].content.slice(0, 50) + '...' : session.title
          }
        : session
    ));
    
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => prev ? {
        ...prev,
        messages: messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
        })),
        lastUpdated: new Date()
      } : null);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const clearHistory = () => {
    setSessions([]);
    setCurrentSession(null);
  };

  return (
    <ChatHistoryContext.Provider value={{
      sessions,
      currentSession,
      createSession,
      updateSession,
      deleteSession,
      loadSession,
      clearHistory
    }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}