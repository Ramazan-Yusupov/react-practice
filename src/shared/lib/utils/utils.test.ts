import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('объединяет обычные классы', () => {
    expect(cn('p-2', 'text-white')).toBe('p-2 text-white');
  });

  it('игнорирет false, null и undefined', () => {
    expect(cn('p-2', false, null, undefined, 'text-white')).toBe('p-2 text-white');
  });
  it('оставляет последний конфликтующий Tailwind-класс', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
