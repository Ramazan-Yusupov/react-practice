import { describe, expect, it } from 'vitest';
import { isAdult, normalizeEmail } from './formatters';

describe('normalizeEmail', () => {
  it('should trim and convert email to lowercase', () => {
    const email = '  JOHN.DOE@EXAMPLE.COM  ';
    const expected = 'john.doe@example.com';
    const result = normalizeEmail(email);
    expect(result).toBe(expected);
  });
});

describe('isAdult', () => {
  it.each([
    [0, false],
    [17, false],
    [18, true],
    [25, true],
  ])('для возраста %i возвращает %s', (age, expected) => {
    expect(isAdult(age)).toBe(expected);
  });
});
