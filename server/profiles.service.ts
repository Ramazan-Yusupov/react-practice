import { clerkClient } from '@clerk/express';
import type { PostgrestError } from '@supabase/supabase-js';
import type { Profile, UpdateProfileInput } from '../src/shared/api/profile.schemas.ts';
import type { Database } from './database.types.ts';
import { HttpError } from './errors.ts';
import { supabase } from './supabase.ts';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfilePatch = Database['public']['Tables']['profiles']['Update'];

const UNIQUE_VIOLATION = '23505';

function dbError(error: PostgrestError): HttpError {
  console.error('Supabase error:', error);
  return new HttpError(500, 'Ошибка базы данных');
}

function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    location: row.location,
    website: row.website,
    bannerColor: row.banner_color,
    createdAt: row.created_at,
  };
}

function makeUsername(source: string, attempt: number): string {
  const base =
    source
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .slice(0, 14) || 'user';
  if (attempt === 0 && base.length >= 3) return base;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}_${suffix}`;
}

async function findByClerkId(clerkUserId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle();
  if (error) throw dbError(error);
  return data;
}

async function createFromClerk(clerkUserId: string): Promise<ProfileRow> {
  const user = await clerkClient.users.getUser(clerkUserId);
  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
  const source = user.username ?? email?.split('@')[0] ?? 'user';
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        clerk_user_id: clerkUserId,
        username: makeUsername(source, attempt),
        display_name: (fullName || user.username || source).slice(0, 50),
        avatar_url: user.imageUrl,
      })
      .select()
      .single();

    if (!error) return data;
    if (error.code !== UNIQUE_VIOLATION) throw dbError(error);

    // Либо параллельный запрос уже создал профиль, либо занят username: пробуем ещё раз
    const existing = await findByClerkId(clerkUserId);
    if (existing) return existing;
  }
  throw new HttpError(500, 'Не удалось подобрать username');
}

export async function getOrCreateProfile(clerkUserId: string): Promise<Profile> {
  const row = (await findByClerkId(clerkUserId)) ?? (await createFromClerk(clerkUserId));
  return toProfile(row);
}

export async function updateProfile(
  clerkUserId: string,
  input: Partial<UpdateProfileInput>,
): Promise<Profile> {
  // Явный маппинг: в БД попадут только разрешённые поля (id, clerk_user_id менять нельзя)
  const patch: ProfilePatch = {
    username: input.username,
    display_name: input.displayName,
    bio: input.bio,
    location: input.location,
    website: input.website,
    banner_color: input.bannerColor,
  };

  if (Object.values(patch).every((value) => value === undefined)) {
    return getOrCreateProfile(clerkUserId);
  }

  await getOrCreateProfile(clerkUserId); // вдруг PATCH пришёл раньше первого GET /me

  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('clerk_user_id', clerkUserId)
    .select()
    .single();

  if (error?.code === UNIQUE_VIOLATION) {
    throw new HttpError(409, 'Username уже занят', { username: ['Этот username уже занят'] });
  }
  if (error) throw dbError(error);
  return toProfile(data);
}

export async function getPublicProfile(username: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .maybeSingle();
  if (error) throw dbError(error);
  if (!data) throw new HttpError(404, 'Профиль не найден');
  return toProfile(data);
}
