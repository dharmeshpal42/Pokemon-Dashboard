export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(4, '0')}`;
};
