export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isAdult(age: number) {
  return age >= 18;
}

export function createTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}
