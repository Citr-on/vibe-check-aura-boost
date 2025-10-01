import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    const fetchCredits = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('coins')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setCredits(data?.coins || 0);
      } catch (error) {
        console.error('Error fetching credits:', error);
        setCredits(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('credits-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new && 'coins' in payload.new) {
            setCredits(payload.new.coins as number);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateCredits = async (newAmount: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ coins: newAmount })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCredits(newAmount);
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  const deductCredits = async (amount: number) => {
    if (!user) return false;

    const newAmount = credits - amount;
    if (newAmount < 0) return false;

    // Mise à jour optimiste de l'interface
    setCredits(newAmount);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ coins: newAmount })
        .eq('user_id', user.id);

      if (error) {
        // Rollback en cas d'erreur
        setCredits(credits);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error deducting credits:', error);
      return false;
    }
  };

  const addCredits = async (amount: number) => {
    if (!user) return;

    const newAmount = credits + amount;
    
    // Mise à jour optimiste de l'interface
    setCredits(newAmount);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ coins: newAmount })
        .eq('user_id', user.id);

      if (error) {
        // Rollback en cas d'erreur
        setCredits(credits);
        throw error;
      }
    } catch (error) {
      console.error('Error adding credits:', error);
    }
  };

  return {
    credits,
    loading,
    updateCredits,
    deductCredits,
    addCredits,
  };
};
