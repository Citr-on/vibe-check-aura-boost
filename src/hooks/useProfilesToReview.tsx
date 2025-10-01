import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProfileToReview {
  id: string;
  name?: string;
  age?: number;
  gender?: string;
  type: 'photo' | 'profile';
  images: string[];
  tags?: string[];
  bio?: string;
  cost_amount: number;
}

export const useProfilesToReview = () => {
  const [profiles, setProfiles] = useState<ProfileToReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        
        // Récupérer les analyses depuis la base de données
        const { data: analyses, error } = await supabase
          .from('analyses')
          .select('*')
          .in('status', ['terminée', 'en-cours'])
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;

        if (analyses) {
          const formattedProfiles: ProfileToReview[] = analyses.map(analysis => ({
            id: analysis.id,
            type: analysis.type === 'photo' ? 'photo' : 'profile',
            images: analysis.images || [],
            tags: analysis.keywords || [],
            bio: analysis.bio_text || undefined,
            cost_amount: analysis.cost_amount || 1,
          }));

          setProfiles(formattedProfiles);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des profils:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, loading };
};
