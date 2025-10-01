import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useAura = () => {
  const [aura, setAura] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setAura(0);
      setLoading(false);
      return;
    }

    const fetchAura = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('aura')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setAura(Number(data?.aura) || 0);
      } catch (error) {
        console.error('Error fetching aura:', error);
        setAura(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAura();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('aura-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new && 'aura' in payload.new) {
            setAura(Number(payload.new.aura));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addAura = async (amount: number) => {
    if (!user) return;

    const newAmount = aura + amount;
    
    // Mise à jour optimiste de l'interface
    setAura(newAmount);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ aura: newAmount })
        .eq('user_id', user.id);

      if (error) {
        // Rollback en cas d'erreur
        setAura(aura);
        throw error;
      }
    } catch (error) {
      console.error('Error adding aura:', error);
    }
  };

  return {
    aura,
    loading,
    addAura,
  };
};
