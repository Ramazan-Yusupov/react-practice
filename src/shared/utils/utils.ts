import type { BoxItem } from '../types/types';

export function createBoxItem(id: number): BoxItem {
  const background = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

  return {
    id,
    text: 'stagger',
    background,
  };
}
