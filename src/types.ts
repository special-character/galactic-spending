type FilmUrl = `https://swapi.info/api/films/${FilmIDs}/`;

export type FilmIDs = 1 | 2 | 3 | 4 | 5 | 6;

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
  films: FilmUrl[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmResponse {
  title: string;
  episode_id: FilmIDs;
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
  starships: { [key: number]: StarshipResponse & { episodeIDs: number[] } };
}
