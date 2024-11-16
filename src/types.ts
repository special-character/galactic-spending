type FilmUrl = `https://swapi.info/api/films/${FilmID}/`;

export type FilmID = 1 | 2 | 3 | 4 | 5 | 6;

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
  episode_id: FilmID;
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
    // will not count cost for unknown starships
    filmStarshipCost: number;
    // will not contain ships if starship was purchased in a prior film
    starshipIDs: number[];
    // will not contain unknown cost if starship was purchased in a prior film
    starshipIDsWithUnknownCost: number[];
  })[];
  starships: { [key: number]: StarshipResponse & { episodeIDs: number[] } };
}
