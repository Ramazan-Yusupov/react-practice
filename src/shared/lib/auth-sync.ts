import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { supabase } from './supabase';

export function useAuthSync() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function syncUser() {
      try {
        // Получаем токен для проверки
        const token = await getToken({ template: 'supabase' });
        console.log('🔄 Syncing user, token received:', !!token);

        // Проверяем существующий профиль
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('clerk_user_id', user!.id)
          .maybeSingle();

        if (!existingProfile) {
          // Создаем новый профиль
          const { data, error } = await supabase
            .from('profiles')
            .insert({ clerk_user_id: user!.id })
            .select()
            .single();

          if (error) {
            console.error('❌ Error creating profile:', error);
          } else {
            console.log('✅ Profile created:', data);
          }
        } else {
          console.log('✅ Profile already exists');
        }
      } catch (error) {
        console.error('❌ Auth sync error:', error);
      }
    }

    syncUser();
  }, [user, isLoaded, getToken]);
}
