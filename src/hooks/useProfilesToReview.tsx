import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          setProfiles([]);
          setLoading(false);
          return;
        }

        // Récupérer les IDs des analyses déjà évaluées par l'utilisateur
        const { data: reviewedAnalyses, error: reviewsError } = await supabase
          .from('reviews')
          .select('analysis_id')
          .eq('reviewer_id', user.id);

        if (reviewsError) throw reviewsError;

        const reviewedIds = reviewedAnalyses?.map(r => r.analysis_id) || [];

        // Construire la requête
        let query = supabase
          .from('analyses')
          .select('*')
          .in('status', ['terminée', 'en-cours'])
          .order('created_at', { ascending: false })
          .limit(20);

        // Exclure les analyses déjà évaluées si il y en a
        if (reviewedIds.length > 0) {
          query = query.not('id', 'in', `(${reviewedIds.join(',')})`);
        }

        const { data: analyses, error } = await query;

        if (error) throw error;

        if (analyses) {
          // Filtrer les analyses qui ont au moins une image valide
          const formattedProfiles: ProfileToReview[] = analyses
            .filter(analysis => analysis.images && analysis.images.length > 0)
            .map(analysis => ({
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
  }, [user]);

  return { profiles, loading };
};
