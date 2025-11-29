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

    // Set up real-time subscription for blogs
    const blogsChannel = supabase
      .channel('blogs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        () => {
          // Reload blogs when any change occurs
          loadBlogs();
        }
      )
      .subscribe();

    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeChannel(blogsChannel);
    };
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
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
      } else if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.slice(3)}</h2>;
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
      } else if (paragraph.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{paragraph.slice(2)}</li>;
      } else if (paragraph.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trending blogs...</p>
        </div>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to blogs</span>
          </button>

          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {selectedBlog.cover_image && (
              <img
                src={selectedBlog.cover_image}
                alt={selectedBlog.title}
                className="w-full h-96 object-cover"
              />
            )}

            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Trending
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center justify-between mb-8 pb-8 border-b">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedBlog.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedBlog.author}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(selectedBlog.published_at)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedBlog.reading_time} min
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {selectedBlog.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {selectedBlog.likes.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {formatContent(selectedBlog.content)}
              </div>

              {selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Trending Agile Blogs</h1>
          </div>
          <p className="text-xl text-blue-100">
            Stay updated with the latest insights, trends, and best practices in Agile methodology
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  {blog.cover_image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {index < 3 && (
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          Trending #{index + 1}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {blog.author.charAt(0)}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(blog.published_at)}
                      </span>

                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {blog.reading_time} min read
                      </span>

                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {blog.views.toLocaleString()} views
                      </span>

                      <span className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {blog.likes.toLocaleString()} likes
                      </span>
                    </div>

                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
