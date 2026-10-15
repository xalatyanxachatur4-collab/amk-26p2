import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.js';
import { LanguageProvider } from './context/LanguageContext.js';
import { Header } from './components/layout/Header.js';
import { Footer } from './components/layout/Footer.js';
import { AnimatedBackground } from './components/layout/AnimatedBackground.js';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal.js';
import { FloatingAIAssistant } from './components/chatbot/FloatingAIAssistant.js';

import { HomePage } from './pages/HomePage.js';
import { ExplorePage } from './pages/ExplorePage.js';
import { SystemDetailPage } from './pages/SystemDetailPage.js';
import { HowSystemsWorkTogetherPage } from './pages/HowSystemsWorkTogetherPage.js';
import { LearningCenterPage } from './pages/LearningCenterPage.js';
import { QuizPage } from './pages/QuizPage.js';
import { AIAssistantPage } from './pages/AIAssistantPage.js';
import { GlossaryPage } from './pages/GlossaryPage.js';
import { AboutPage } from './pages/AboutPage.js';

import { ErrorBoundary } from './components/ui/ErrorBoundary.js';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="relative min-h-screen flex flex-col font-sans">
            {/* Ambient Background Simulation */}
            <AnimatedBackground />

            {/* Navigation Header */}
            <Header onOpenSearch={() => setIsSearchOpen(true)} />

            {/* Main Application Routes */}
            <main className="flex-1 relative z-10">
              <ErrorBoundary fallbackTitle="Application Navigation Error">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/systems/:systemId" element={<SystemDetailPage />} />
                  <Route path="/systems-together" element={<HowSystemsWorkTogetherPage />} />
                  <Route path="/learning" element={<LearningCenterPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/assistant" element={<AIAssistantPage />} />
                  <Route path="/glossary" element={<GlossaryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating Global AI Assistant */}
            <FloatingAIAssistant />

            {/* Global Search Modal (Ctrl+K) */}
            <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
