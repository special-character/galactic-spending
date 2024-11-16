import { NextResponse } from "next/server";
import {
  StarshipResponse,
  FilmResponse,
  FilmID,
  StarshipSpendingResponse,
} from "@/types";

// Prone to errors if we don't have guaranteed url format
const getUrlID = (url: string) => parseInt(url.split("/").pop() as string);

/**
 * Film url ids don't map to episode_id
 * We need a way to standardize on using episode_id using the film url
 *
 * DEV NOTE: We could make this dynamic by building this out at runtime
 * but making this static for simplicity in this exercise
 */
const filmUrlIDtoEpisodeID: { [key: number]: FilmID } = {
  4: 1,
  5: 2,
  6: 3,
  1: 4,
  2: 5,
  3: 6,
};

export async function GET() {
  try {
    // Fetch data for films and starships at the same time
    const filmsRequest = fetch("https://swapi.info/api/films", {
      method: "GET",
    });

    const starshipsRequest = fetch("https://swapi.info/api/starships", {
      method: "GET",
    });

    const [filmsResponse, starshipsResponse] = await Promise.all([
      filmsRequest,
      starshipsRequest,
    ]);
    const [filmsJson, starshipsJson]: [FilmResponse[], StarshipResponse[]] =
      await Promise.all([filmsResponse.json(), starshipsResponse.json()]);

    // make a map of starships by id for easy lookup
    const starships = starshipsJson.reduce(
      (
        prevStarships: StarshipSpendingResponse["starships"],
        currentStarship
      ) => ({
        ...prevStarships,
        [getUrlID(currentStarship.url)]: {
          ...currentStarship,
          episodeIDs: currentStarship.films.map(
            (filmUrl) => filmUrlIDtoEpisodeID[getUrlID(filmUrl)]
          ), // add episodeIDs so the frontend doesn't need to parse the url
        },
      }),
      {}
    );

    const starshipIDsAlreadyPurchased: { [key: number]: FilmID } = {};
    const byFilm = filmsJson
      // sort films by episode_id to make it easy to show the FE chart starting with episode 1
      // this also allows us to use the ordering of the films to calculate when a starship was purchased
      .sort((a, b) => a.episode_id - b.episode_id)
      .reduce(
        (
          previousCostByFilm: StarshipSpendingResponse["byFilm"],
          currentFilm: FilmResponse
        ) => {
          const starshipIDsWithUnknownCost: number[] = [];
          const filmStarshipCost = currentFilm.starships.reduce(
            (previous, starshipUrl) => {
              const starshipID = getUrlID(starshipUrl);

              /**
               * Assumption!!!
               * We don't count the cost for a starship existing
               * in a film if it was purchased in a previous film
               */
              if (starshipIDsAlreadyPurchased[starshipID]) {
                // return previous;
              } else {
                starshipIDsAlreadyPurchased[starshipID] = true;
              }

              const starship = starships[starshipID];

              if (starship.cost_in_credits !== "unknown") {
                /**
                 * Assumption!!!
                 * only increase credit amount if it is known
                 */
                return previous + parseInt(starship.cost_in_credits, 10);
              } else {
                starshipIDsWithUnknownCost.push(starshipID);
              }
              return previous;
            },
            0
          );

          return [
            ...previousCostByFilm,
            // add next film totals
            {
              ...currentFilm,
              filmStarshipCost,
              starshipIDs: currentFilm.starships.map(getUrlID), // add starshipIDs so the frontend doesn't need to parse the url
              starshipIDsWithUnknownCost,
            },
          ];
        },
        []
      );

    return NextResponse.json(
      { byFilm, starships },
      {
        status: 200,
      }
    );
  } catch (error) {
    // would normally send this to some error tracking service like Sentry with info about the request
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error: /api/starship-spending" },
      { status: 500 }
    );
  }
}
