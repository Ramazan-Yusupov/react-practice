import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { useSupabase } from './useSupabase';
import type { ProfileCard } from '../types/types';

export function useCards() {
  const { userId } = useAuth();
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['cards', userId],
    queryFn: async () => {
      console.log('📡 Fetching cards for user:', userId);

      const { data, error } = await supabase
        .from('profile_cards')
        .select(
          `
          *,
          skills(*),
          social_links(*)
        `,
        )
        .eq('clerk_user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Fetch cards error:', error);
        throw error;
      }

      console.log('✅ Cards fetched:', data?.length);
      return (data || []).map(mapCardFromDb);
    },
    enabled: !!userId,
  });
}

export function useCreateCard() {
  const { userId } = useAuth();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: Omit<ProfileCard, 'id'>) => {
      // 1. Создаем карточку
      const { data: cardData, error: cardError } = await supabase
        .from('profile_cards')
        .insert({
          clerk_user_id: userId,
          avatar_url: card.avatarUrl,
          avatar_position: card.avatarPosition,
          avatar_full_width: card.avatarFullWidth,
          avatar_size: card.avatarSize,
          username: card.username,
          username_position: card.usernamePosition,
          description: card.description,
          card_title: card.cardTitle || 'My Card',
          card_color: card.cardColor || '#1a1a2e',
        })
        .select()
        .single();

      if (cardError) throw cardError;

      // 2. Создаем навыки
      if (card.skills.length > 0) {
        const { error: skillsError } = await supabase.from('skills').insert(
          card.skills.map((s) => ({
            card_id: cardData.id,
            name: s.name,
            icon_name: s.iconName,
            icon_color: s.iconColor || '',
            order_index: s.orderIndex,
          })),
        );
        if (skillsError) throw skillsError;
      }

      // 3. Создаем соцсети
      if (card.socialLinks.length > 0) {
        const { error: socialsError } = await supabase.from('social_links').insert(
          card.socialLinks.map((l) => ({
            card_id: cardData.id,
            url: l.url,
            label: l.label,
            icon_name: l.iconName,
            icon_color: l.iconColor || '',
            order_index: l.orderIndex,
          })),
        );
        if (socialsError) throw socialsError;
      }

      return mapCardFromDb(cardData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
    },
  });
}

export function useUpdateCard() {
  const { userId } = useAuth();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cardId, card }: { cardId: string; card: Partial<ProfileCard> }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      if (card.avatarUrl !== undefined) updateData.avatar_url = card.avatarUrl;
      if (card.avatarPosition !== undefined) updateData.avatar_position = card.avatarPosition;
      if (card.avatarFullWidth !== undefined) updateData.avatar_full_width = card.avatarFullWidth;
      if (card.avatarSize !== undefined) updateData.avatar_size = card.avatarSize;
      if (card.username !== undefined) updateData.username = card.username;
      if (card.usernamePosition !== undefined) updateData.username_position = card.usernamePosition;
      if (card.description !== undefined) updateData.description = card.description;
      if (card.cardTitle !== undefined) updateData.card_title = card.cardTitle;
      if (card.cardColor !== undefined) updateData.card_color = card.cardColor;

      const { error } = await supabase
        .from('profile_cards')
        .update(updateData)
        .eq('id', cardId)
        .eq('clerk_user_id', userId);

      if (error) throw error;

      // Обновляем навыки
      if (card.skills) {
        await supabase.from('skills').delete().eq('card_id', cardId);
        if (card.skills.length > 0) {
          await supabase.from('skills').insert(
            card.skills.map((s) => ({
              card_id: cardId,
              name: s.name,
              icon_name: s.iconName,
              icon_color: s.iconColor || '',
              order_index: s.orderIndex,
            })),
          );
        }
      }

      // Обновляем соцсети
      if (card.socialLinks) {
        await supabase.from('social_links').delete().eq('card_id', cardId);
        if (card.socialLinks.length > 0) {
          await supabase.from('social_links').insert(
            card.socialLinks.map((l) => ({
              card_id: cardId,
              url: l.url,
              label: l.label,
              icon_name: l.iconName,
              icon_color: l.iconColor || '',
              order_index: l.orderIndex,
            })),
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
    },
  });
}

export function useDeleteCard() {
  const { userId } = useAuth();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cardId: string) => {
      const { error } = await supabase
        .from('profile_cards')
        .delete()
        .eq('id', cardId)
        .eq('clerk_user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', userId] });
    },
  });
}

// Вспомогательная функция для маппинга из БД
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCardFromDb(data: any): ProfileCard {
  return {
    id: data.id,
    clerkUserId: data.clerk_user_id,
    avatarUrl: data.avatar_url || '',
    avatarPosition: data.avatar_position || 'center',
    avatarFullWidth: data.avatar_full_width || false,
    avatarSize: data.avatar_size || 'md',
    username: data.username || '',
    usernamePosition: data.username_position || 'center',
    description: data.description || '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: (data.skills || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      iconName: s.icon_name,
      iconColor: s.icon_color,
      orderIndex: s.order_index,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socialLinks: (data.social_links || []).map((l: any) => ({
      id: l.id,
      url: l.url,
      label: l.label,
      iconName: l.icon_name,
      iconColor: l.icon_color,
      orderIndex: l.order_index,
    })),
    cardTitle: data.card_title || '',
    cardColor: data.card_color || '#1a1a2e',
  };
}
