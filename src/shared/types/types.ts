// src/shared/types/card.ts

export type Position = 'left' | 'center' | 'right';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'full';

export interface Skill {
  id?: string;
  name: string;
  iconName: string; // Например: 'SiReact'
  iconColor?: string;
  orderIndex: number;
}

export interface SocialLink {
  id?: string;
  url: string;
  label: string; // Например: 'Telegram'
  iconName: string; // Например: 'SiTelegram'
  iconColor?: string;
  orderIndex: number;
}

export interface ProfileCard {
  id?: string;
  clerkUserId: string;

  // Аватарка
  avatarUrl: string;
  avatarPosition: Position;
  avatarFullWidth: boolean;
  avatarSize: AvatarSize;

  // Username
  username: string;
  usernamePosition: Position;

  // Описание
  description: string;

  // Связанные данные
  skills: Skill[];
  socialLinks: SocialLink[];

  // Мета
  cardTitle: string;
  cardColor: string;
}

export type BoxItem = {
  id: number;
  text: string;
  background: string;
};
