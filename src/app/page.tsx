"use client"; // directive to make this a client side component

import React from "react";
import styles from "./page.module.css";

import { StarshipSpendingResponse } from "@/types";

import { BreakdownTable } from "@/components/breakdown_table";
import { StarshipSpendingChart } from "@/components/spending_chart";

export default function StarshipSpending() {
  const [starshipSpendingData, setStarshipSpending] = React.useState<
    StarshipSpendingResponse | undefined
  >(undefined);

  /**
   * Fetch data from our api
   */
  React.useEffect(() => {
    const getInitData = async () => {
      const response = await fetch("/api/starship-spending");
      const starshipSpending: StarshipSpendingResponse = await response.json();
      setStarshipSpending(starshipSpending);
    };

    getInitData();
  }, []);

  if (!starshipSpendingData) return <div>Loading...</div>;
  console.log("STARSHIP SPENDING DATA", starshipSpendingData);
  /**
   * Set up data for the line chart
   */
  const starshipChartData = starshipSpendingData.byFilm.map((film) => ({
    episode: film.episode_id,
    starshipCost: film.filmStarshipCost,
    starshipsWithUnknownCost: film.starshipIDsWithUnknownCost,
  }));

  /**
   * Set up data for film breakdown tables
   */
  const starshipBreakdownData = starshipSpendingData.byFilm.map((film) => {
    const filmBreakdown = film.starshipIDs.map((starshipID) => {
      const starship = starshipSpendingData.starships[starshipID];
      const purchasedInEpisode =
        starshipSpendingData.starshipPurchasedEpisode[starshipID] <
        film.episode_id
          ? starshipSpendingData.starshipPurchasedEpisode[starshipID]
          : film.episode_id;

      const starshipCost =
        purchasedInEpisode < film.episode_id ? "-" : starship.cost_in_credits;

      return {
        episodeID: film.episode_id,
        starshipID,
        starshipName: starship.name,
        purchasedInPriorEpisode: purchasedInEpisode,
        starshipCost,
      };
    });

    return filmBreakdown;
  });

  console.log(`STARSHIP BREAKDOWN DATA`, starshipBreakdownData);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StarshipSpendingChart starshipChartData={starshipChartData} />
        {starshipBreakdownData.map((breakdown, index) => (
          <BreakdownTable
            // safe to use key={index} here because we aren't reordering this list, but we would need to use a unique key if we were
            key={index}
            breakdown={breakdown}
            totalStarshipCost={
              starshipSpendingData.byFilm[index].filmStarshipCost
            }
            episodeName={starshipSpendingData.byFilm[index].title}
          />
        ))}
      </main>
    </div>
  );
}
