export interface StarshipResponse {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: `${number}` | "unknown";
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmResponse {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarshipSpendingResponse {
  byFilm: (FilmResponse & {
    totalStarshipCredits: number;
    starshipIDs: number[];
    starshipIDsWithUnknownCost: number[];
  })[];
  starships: { [key: number]: StarshipResponse & { filmIDs: number[] } };
}
