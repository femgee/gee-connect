import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Sidebar } from '../components/Sidebar';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleView } from '../components/ArticleView';
import { SearchModal } from '../components/SearchModal';
import { Footer } from '../components/Footer';
import type { Database } from '../lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];
type Article = Database['public']['Tables']['articles']['Row'];

interface KnowledgeBaseProps {
  onSearchClick: () => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
  onNavigate: (page: string) => void;
}

export function KnowledgeBase({ onSearchClick, isSearchOpen, onSearchClose, onNavigate }: KnowledgeBaseProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesResponse, articlesResponse] = await Promise.all([
        supabase
          .from('categories')
          .select('*')
          .order('order_index', { ascending: true }),
        supabase
          .from('articles')
          .select('*')
          .order('order_index', { ascending: true })
      ]);

      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }

      if (articlesResponse.data) {
        setArticles(articlesResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedArticle(null);
    setIsMobileMenuOpen(false);
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setIsMobileMenuOpen(false);
  };

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category_id === selectedCategory)
    : articles;

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          isOpen={isMobileMenuOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64">
          {selectedArticle ? (
            <ArticleView
              article={selectedArticle}
              categoryName={getCategoryName(selectedArticle.category_id)}
              onBack={() => setSelectedArticle(null)}
            />
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory
                    ? categories.find(cat => cat.id === selectedCategory)?.name
                    : 'All Topics'}
                </h2>
                {selectedCategory && (
                  <p className="text-gray-600">
                    {categories.find(cat => cat.id === selectedCategory)?.description}
                  </p>
                )}
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-lg">
                    No articles available yet. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleSelect(article)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={onSearchClose}
        articles={articles}
        onArticleSelect={handleArticleSelect}
      />

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
