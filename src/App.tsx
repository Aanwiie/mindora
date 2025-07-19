import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatHistoryProvider, useChatHistory } from './contexts/ChatHistoryContext';
import LandingPage from './components/LandingPage';
import MoodSelection from './components/MoodSelection';
import ChatInterface from './components/ChatInterface';
import ChatHistory from './components/ChatHistory';
import LowlandsGame from './components/LowlandsGame';
import MindMirror from './components/MindMirror';

type AppState = 'landing' | 'mood-selection' | 'chat' | 'history' | 'lowlands' | 'mind-mirror';

function AppContent() {
  const { createSession, loadSession, currentSession } = useChatHistory();
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [currentSessionId, setCurrentSessionId] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentState('mood-selection');
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const sessionId = createSession(mood);
    setCurrentSessionId(sessionId);
    setCurrentState('chat');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setSelectedMood('');
    setCurrentSessionId('');
  };

  const handleBackToMoodSelection = () => {
    setCurrentState('mood-selection');
  };

  const handleShowHistory = () => {
    setCurrentState('history');
  };

  const handleShowLowlands = () => {
    setCurrentState('lowlands');
  };

  const handleShowMindMirror = () => {
    setCurrentState('mind-mirror');
  };

  const handleHistoryBack = () => {
    setCurrentState('landing');
  };

  const handleSessionSelect = (sessionId: string) => {
    loadSession(sessionId);
    const session = currentSession;
    if (session) {
      setSelectedMood(session.mood);
      setCurrentSessionId(sessionId);
      setCurrentState('chat');
    }
  };

  return (
    <>
      {currentState === 'landing' && (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onShowHistory={handleShowHistory}
          onShowLowlands={handleShowLowlands}
          onShowMindMirror={handleShowMindMirror}
        />
      )}
      
      {currentState === 'mood-selection' && (
        <MoodSelection 
          onMoodSelect={handleMoodSelect}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === 'chat' && (
        <ChatInterface 
          currentMood={selectedMood}
          onBack={handleBackToMoodSelection}
          sessionId={currentSessionId}
        />
      )}
      
      {currentState === 'history' && (
        <ChatHistory 
          onBack={handleHistoryBack}
          onSessionSelect={handleSessionSelect}
        />
      )}
      
      {currentState === 'lowlands' && (
        <LowlandsGame 
          onBack={handleHistoryBack}
        />
      )}
      
      {currentState === 'mind-mirror' && (
        <MindMirror 
          onBack={handleHistoryBack}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ChatHistoryProvider>
        <AppContent />
      </ChatHistoryProvider>
    </ThemeProvider>
  );
}