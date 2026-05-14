import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface PokemonSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const PokemonSearch: React.FC<PokemonSearchProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 500);


  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Only call onChange if the value actually changed to avoid unnecessary resets
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);



  return (
    <div className="relative w-full sm:max-w-md group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pokemon-red transition-colors" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full rounded-full border-0 py-2.5 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pokemon-red/50 focus:outline-none transition-all duration-200 bg-white/50 focus:bg-white sm:text-sm sm:leading-6"
        placeholder="Search Pokémon..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />

    </div>
  );
};
