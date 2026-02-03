// Утилита для генерации URL аватарки через DiceBear API
export function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}
