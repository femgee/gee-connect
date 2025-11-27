import { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Blogs } from './pages/Blogs';
import { Admin } from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsSearchOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'knowledge-base':
        return (
          <KnowledgeBase
            onSearchClick={() => setIsSearchOpen(true)}
            isSearchOpen={isSearchOpen}
            onSearchClose={() => setIsSearchOpen(false)}
            onNavigate={handleNavigate}
          />
        );
      case 'blogs':
        return <Blogs onNavigate={handleNavigate} />;
      case 'admin':
        return <Admin onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearchClick={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      {renderPage()}
    </div>
  );
}

export default App;
