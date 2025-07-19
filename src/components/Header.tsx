import { Moon, Sun, History, Menu, X, Home, Cloud, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface HeaderProps {
  onHistoryClick?: () => void;
  onLowlandsClick?: () => void;
  onMindMirrorClick?: () => void;
  onHomeClick?: () => void;
  showHistoryButton?: boolean;
  showLowlandsButton?: boolean;
  showMindMirrorButton?: boolean;
  showHomeButton?: boolean;
}

export default function Header({ 
  onHistoryClick, 
  onLowlandsClick,
  onMindMirrorClick,
  onHomeClick,
  showHistoryButton = false,
  showLowlandsButton = false,
  showMindMirrorButton = false,
  showHomeButton = false 
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <img 
                src="/logo.png" 
                alt="Mindora Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold gradient-text">Mindora</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {showHomeButton && onHomeClick && (
              <button
                onClick={onHomeClick}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">Home</span>
              </button>
            )}
            
            {showHistoryButton && onHistoryClick && (
              <button
                onClick={onHistoryClick}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <History className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">History</span>
              </button>
            )}
            
            {showLowlandsButton && onLowlandsClick && (
              <button
                onClick={onLowlandsClick}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Cloud className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">Lowlands</span>
              </button>
            )}
            
            {showMindMirrorButton && onMindMirrorClick && (
              <button
                onClick={onMindMirrorClick}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">Mind Mirror</span>
              </button>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
              ) : (
                <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2">
              {showHomeButton && onHomeClick && (
                <button
                  onClick={() => {
                    onHomeClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              )}
              
              {showHistoryButton && onHistoryClick && (
                <button
                  onClick={() => {
                    onHistoryClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300"
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
              )}
              
              {showLowlandsButton && onLowlandsClick && (
                <button
                  onClick={() => {
                    onLowlandsClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Lowlands</span>
                </button>
              )}
              
              {showMindMirrorButton && onMindMirrorClick && (
                <button
                  onClick={() => {
                    onMindMirrorClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>Mind Mirror</span>
                </button>
              )}
              
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 transition-all duration-300"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}