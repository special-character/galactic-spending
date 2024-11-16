"use client"; // directive to make this a client side component

import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "./page.module.css";

import { StarshipSpendingResponse } from "@/types";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/shadcn/card";

export default function StarshipSpending() {
  const [starshipSpendingData, setStarshipSpending] = React.useState<
    StarshipSpendingResponse | undefined
  >(undefined);

  React.useEffect(() => {
    // fetch the data we need to show
    const getInitData = async () => {
      const response = await fetch("/api/starship-spending");
      const starshipSpending: StarshipSpendingResponse = await response.json();
      console.log(starshipSpending);
      setStarshipSpending(starshipSpending);
    };

    getInitData();
  }, []);

  if (!starshipSpendingData) return <div>Loading...</div>;

  const starshipSpendingChartConfig = {
    starshipCost: {
      label: "Cost: ",
      color: "hsl(var(--chart-1))",
    },
    unknownCost: {
      label: "Ships with unknown cost",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const starshipChartData = starshipSpendingData.byFilm.map((film) => ({
    episode: film.episode_id,
    starshipCost: film.filmStarshipCost,
    unknownCost: film.starshipIDsWithUnknownCost,
  }));

  console.log(starshipChartData);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card>
          <CardHeader>
            <CardTitle>Starship Spending By Episode</CardTitle>
            <CardDescription>Empire & Rebels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={starshipSpendingChartConfig}>
              <LineChart data={starshipChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="episode"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="starshipCost"
                  type="linear"
                  stroke="var(--color-starshipCost)" // This key corresponds to the color in the config
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
