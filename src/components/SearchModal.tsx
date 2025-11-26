import { X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Database } from '../lib/database.types';

type Article = Database['public']['Tables']['articles']['Row'];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

export function SearchModal({ isOpen, onClose, articles, onArticleSelect }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  const handleArticleClick = (article: Article) => {
    onArticleSelect(article);
    onClose();
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div className="flex items-center border-b border-gray-200 px-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-4 text-lg outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === '' ? (
              <div className="p-8 text-center text-gray-500">
                Start typing to search articles...
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No articles found for "{searchQuery}"
              </div>
            ) : (
              <div className="p-2">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
