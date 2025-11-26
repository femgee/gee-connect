import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Article = Database['public']['Tables']['articles']['Row'];

interface ArticleViewProps {
  article: Article;
  categoryName: string;
  onBack: () => void;
}

export function ArticleView({ article, categoryName, onBack }: ArticleViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.slice(2)}</h2>;
      } else if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{paragraph.slice(3)}</h3>;
      } else if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">{paragraph.slice(4)}</h4>;
      } else if (paragraph.startsWith('- ')) {
        return <li key={index} className="ml-6 text-gray-700 leading-relaxed">{paragraph.slice(2)}</li>;
      } else if (paragraph.trim() === '') {
        return <div key={index} className="h-4"></div>;
      } else {
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to articles</span>
      </button>

      <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
            {categoryName}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{article.reading_time} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formatDate(article.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          {formatContent(article.content)}
        </div>

        {article.tags.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Tag size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
