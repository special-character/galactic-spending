"use client"; // directive to make this a client side component

import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "./page.module.css";

import { StarshipSpendingResponse } from "@/types";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
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
      label: "Total Spend",
      color: "hsl(var(--chart-1))",
    },
    // unknownCost: {
    //   label: "Ships with unknown cost",
    //   color: "#60a5fa",
    // },
  };

  const starshipChartData = starshipSpendingData.byFilm.map((film) => ({
    episode: film.episode_id,
    starshipCost: film.filmStarshipCost,
    // unknownCost: film.starshipIDsWithUnknownCost.length,
  }));

  console.log(starshipChartData);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

  const barChartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const barChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart - Linear</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={starshipSpendingChartConfig}
              className="min-h-[200px] w-full"
            >
              <LineChart data={starshipChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="episode"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="starshipCost"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={20}
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

        <ChartContainer
          config={barChartConfig}
          className="min-h-[200px] w-full"
        >
          <BarChart data={barChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </main>
    </div>
  );
}
