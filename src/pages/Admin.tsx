import { useState } from 'react';
import { FileText, PenTool, Menu } from 'lucide-react';
import { ArticleForm } from '../components/admin/ArticleForm';
import { BlogForm } from '../components/admin/BlogForm';
import { Footer } from '../components/Footer';

interface AdminProps {
  onNavigate: (page: string) => void;
}

type AdminSection = 'articles' | 'blogs';

export function Admin({ onNavigate }: AdminProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('articles');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your content</p>
          </div>

          <nav className="p-4">
            <button
              onClick={() => {
                setActiveSection('articles');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeSection === 'articles'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText size={20} />
              <span className="font-medium">Knowledge Base Articles</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('blogs');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'blogs'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <PenTool size={20} />
              <span className="font-medium">Trending Blogs</span>
            </button>
          </nav>
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-64">
          <div className="sticky top-16 z-10 bg-white border-b border-gray-200 p-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center space-x-2 text-gray-700"
            >
              <Menu size={24} />
              <span>Menu</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeSection === 'articles' ? (
              <ArticleForm />
            ) : (
              <BlogForm />
            )}
          </div>
        </main>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
