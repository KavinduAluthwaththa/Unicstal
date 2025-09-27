import { useEffect, useState } from 'react';
import type { Crystal } from '@/types/crystal';
import { fetchCrystals } from '@/lib/supabaseApi';

export function useSupabaseCrystals() {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCrystals()
      .then((data) => {
        setCrystals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { crystals, loading, error };
}
