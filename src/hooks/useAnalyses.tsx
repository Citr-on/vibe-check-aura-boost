import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Analysis {
  id: string;
  type: 'photo' | 'profil-complet';
  title: string;
  status: 'en-cours' | 'terminé' | 'échoué';
  isPremium: boolean;
  createdAt: string;
  score?: number;
  votesReceived: number;
  totalVotes?: number;
  progress?: number;
}

export const useAnalyses = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAnalyses = async () => {
    if (!user) {
      setAnalyses([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAnalyses: Analysis[] = (data || []).map((analysis) => ({
        id: analysis.id,
        type: analysis.type as 'photo' | 'profil-complet',
        title: analysis.title,
        status: analysis.status as 'en-cours' | 'terminé' | 'échoué',
        isPremium: analysis.is_premium,
        createdAt: analysis.created_at,
        score: analysis.score ? Number(analysis.score) : undefined,
        votesReceived: analysis.votes_received,
        totalVotes: analysis.total_votes || undefined,
        progress: analysis.status === 'en-cours' 
          ? Math.round((analysis.votes_received / (analysis.total_votes || 1)) * 100)
          : undefined,
      }));

      setAnalyses(formattedAnalyses);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();

    if (!user) return;

    // Subscribe to real-time updates
    const channel = supabase
      .channel('analyses-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'analyses',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAnalyses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    analyses,
    loading,
    refetch: fetchAnalyses,
  };
};