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
    
    // Set up real-time subscriptions
    const articlesChannel = supabase
      .channel('articles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        () => {
          // Reload articles when any change occurs
          loadArticles();
        }
      )
      .subscribe();

    const categoriesChannel = supabase
      .channel('categories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        () => {
          // Reload categories when any change occurs
          loadCategories();
        }
      )
      .subscribe();

    // Cleanup subscriptions when component unmounts
    return () => {
      supabase.removeChannel(articlesChannel);
      supabase.removeChannel(categoriesChannel);
    };
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

 const loadArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('=== ARTICLES DEBUG ===');
    console.log('Total articles fetched:', data?.length);
    console.log('Article IDs:', data?.map(a => a.id));
    console.log('Article titles:', data?.map(a => a.title));
    console.log('Full data:', data);
    console.log('======================');
    
    if (data) {
      setArticles(data);
    }
  } catch (error) {
    console.error('Error loading articles:', error);
  }
};

  const loadData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([loadCategories(), loadArticles()]);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedArticle ? (
            <ArticleView
              article={selectedArticle}
              categoryName={getCategoryName(selectedArticle.category_id)}
              onBack={() => setSelectedArticle(null)}
            />
          ) : (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory
                    ? categories.find(cat => cat.id === selectedCategory)?.name
                    : 'All Topics'}
                </h1>
                {selectedCategory && (
                  <p className="text-gray-600">
                    {categories.find(cat => cat.id === selectedCategory)?.description}
                  </p>
                )}
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No articles available yet. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      categoryName={getCategoryName(article.category_id)}
                      onClick={() => handleArticleSelect(article)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={onSearchClose}
        articles={articles}
        categories={categories}
        onArticleSelect={handleArticleSelect}
      />

      <Footer onNavigate={onNavigate} />
    </div>
  );
}