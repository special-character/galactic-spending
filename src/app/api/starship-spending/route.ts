import { NextRequest, NextResponse } from "next/server";
import {
  StarshipResponse,
  FilmResponse,
  StarshipSpendingResponse,
} from "@/types";

// Prone to errors if we don't have guaranteed url format
const getUrlID = (url: string) => parseInt(url.split("/").pop() as string);

export async function GET(req: NextRequest, res: NextResponse) {
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
          filmIDs: currentStarship.films.map(getUrlID), // add filmIDs so the frontend doesn't need to parse the url
        },
      }),
      {}
    );

    const byFilm = filmsJson
      // sort films by episode_id to make it easy on the frontend to show the chart in order starting with episode 1
      // this also allows us to strictly push to the byFilm array
      .sort((a, b) => a.episode_id - b.episode_id)
      .reduce(
        (
          previousCostByFilm: StarshipSpendingResponse["byFilm"],
          currentFilm: FilmResponse
        ) => {
          const totalStarshipCredits = currentFilm.starships.reduce(
            (previous, starshipUrl) => {
              const starship = starships[getUrlID(starshipUrl)];

              // only increase credit amount if it is known
              // we should call this out on the frontend
              if (starship.cost_in_credits !== "unknown") {
                return previous + parseInt(starship.cost_in_credits, 10);
              }
              return previous;
            },
            0
          );

          return {
            ...previousCostByFilm,
            [currentFilm.episode_id]: {
              ...currentFilm,
              totalStarshipCredits,
              starshipIDs: currentFilm.starships.map(getUrlID), // add starshipIDs so the frontend doesn't need to parse the url
            },
          };
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
