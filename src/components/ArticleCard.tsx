import { Clock, Tag } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Article = Database['public']['Tables']['articles']['Row'];

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {article.summary}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{article.reading_time} min read</span>
        </div>

        {article.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag size={16} />
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
