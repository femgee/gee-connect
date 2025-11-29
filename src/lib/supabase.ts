import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
}

// Initialize the Supabase client
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Define the Article type
type Article = {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  created_at: string;
};

// Fetch logic
export const fetchArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  
  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }
  
  return data ?? [];
};

// Real-time subscription function
export const subscribeToArticles = (
  onUpdate: (articles: Article[]) => void,
  onError?: (error: any) => void
) => {
  // Initial fetch
  fetchArticles()
    .then(onUpdate)
    .catch(onError || console.error);
  
  // Subscribe to real-time changes
  const channel = supabase
    .channel('articles-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'articles'
      },
      () => {
        fetchArticles()
          .then(onUpdate)
          .catch(onError || console.error);
      }
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(channel);
  };
};

export { supabase };
export type { Article };