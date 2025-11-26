import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, TrendingUp, ThumbsUp, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Footer } from '../components/Footer';
import type { Database } from '../lib/database.types';

type Blog = Database['public']['Tables']['blogs']['Row'];

interface BlogsProps {
  onNavigate: (page: string) => void;
}

export function Blogs({ onNavigate }: BlogsProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('views', { ascending: false });

      if (error) throw error;

      if (data) {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trending blogs...</p>
        </div>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to blogs</span>
          </button>

          <article className="bg-white rounded-lg shadow-sm">
            {selectedBlog.cover_image && (
              <img
                src={selectedBlog.cover_image}
                alt={selectedBlog.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />
            )}

            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp size={20} className="text-orange-500" />
                <span className="text-sm font-semibold text-orange-500 uppercase">
                  Trending
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center space-x-6 pb-6 border-b border-gray-200 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {selectedBlog.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedBlog.author}</div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatDate(selectedBlog.published_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{selectedBlog.reading_time} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{selectedBlog.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp size={16} />
                    <span>{selectedBlog.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                {formatContent(selectedBlog.content)}
              </div>

              {selectedBlog.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, index) => (
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
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={32} />
            <h1 className="text-4xl font-bold">Trending Agile Blogs</h1>
          </div>
          <p className="text-xl text-orange-100">
            Stay updated with the latest insights, trends, and best practices in Agile methodology
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="md:flex">
                  {blog.cover_image && (
                    <div className="md:w-1/3">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:flex-1">
                    {index < 3 && (
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp size={18} className="text-orange-500" />
                        <span className="text-sm font-semibold text-orange-500 uppercase">
                          Trending #{index + 1}
                        </span>
                      </div>
                    )}

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {blog.author.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{blog.author}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(blog.published_at)}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{blog.reading_time} min read</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{blog.views.toLocaleString()} views</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <ThumbsUp size={16} />
                        <span>{blog.likes.toLocaleString()} likes</span>
                      </div>
                    </div>

                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
