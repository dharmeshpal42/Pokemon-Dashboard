export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types?: string[];
  image: string;
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
    front_default: string;
  };
}

export interface TypeDetailResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
