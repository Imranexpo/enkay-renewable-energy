/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CalculatorScreen } from './components/CalculatorScreen';
import { QuoteModal } from './components/QuoteModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NavPage, ProjectItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quoteNote, setQuoteNote] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleNavigate = (page: NavPage, sectionId?: string) => {
    if (page === 'savings-calculator') {
      setCurrentPage('savings-calculator');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage('home');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuote = (customNote = '') => {
    setQuoteNote(customNote);
    setIsQuoteOpen(true);
  };

  const handleProjectSelect = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleRequestProjectQuote = (projectTitle: string) => {
    setSelectedProject(null);
    handleOpenQuote(`Regarding architecture topology: ${projectTitle}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] selection:bg-[#febf33]/30 selection:text-[#002217]">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {currentPage === 'home' ? (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
            onSelectProject={handleProjectSelect}
          />
        ) : (
          <CalculatorScreen
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Quote / Site Survey Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialSystemNote={quoteNote}
      />

      {/* Project Topology Specification Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={handleRequestProjectQuote}
      />
    </div>
  );
}
