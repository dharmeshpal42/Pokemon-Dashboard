import { describe, it, expect } from 'vitest';
import { capitalize, formatPokemonId } from '../formatters';

describe('formatters', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('pikachu')).toBe('Pikachu');
    });

    it('should return empty string if input is empty', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('formatPokemonId', () => {
    it('should format ID with leading zeros and hash', () => {
      expect(formatPokemonId(1)).toBe('#0001');
      expect(formatPokemonId(25)).toBe('#0025');
      expect(formatPokemonId(151)).toBe('#0151');
      expect(formatPokemonId(1000)).toBe('#1000');
    });
  });
});
