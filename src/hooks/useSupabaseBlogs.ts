import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types/blog';
import { fetchBlogs } from '@/lib/supabaseApi';

export function useSupabaseBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { blogs, loading, error };
}
