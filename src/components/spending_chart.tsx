import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
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

type SpendingChartProps = {
  starshipChartData: {
    episode: number;
    starshipCost: number;
    starshipsWithUnknownCost: number[];
  }[];
  deathStarCost: number;
};

export const StarshipSpendingChart = ({
  starshipChartData,
  deathStarCost,
}: SpendingChartProps) => {
  const [showDeathStar, setShowDeathStar] = React.useState(true);

  if (!showDeathStar) {
    starshipChartData = starshipChartData.map((data) => {
      if (data.episode === 4) {
        return {
          ...data,
          starshipCost: data.starshipCost - deathStarCost,
        };
      }
      return data;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Starship Spending</CardTitle>
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
              stroke="var(--color-starshipCost)" // This key corresponds to the color in the chart config
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total starship spending by episode (in credits)
        </div>
        <div className="leading-none text-muted-foreground">
          Here we can see the total cost of starships in each episode. We see a
          large spike in episode 4, but after inspecting the breakdown tables,
          it is clear that the Death Star is the cause of this spike.
        </div>
        <div className="leading-none text-muted-foreground">
          The Death Star cost is an outlier compared to the other starships.
          Click here to toggle the visibility of the Death Star in the chart:{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => {
              // using the setState callback function because this state depends on the previous state
              setShowDeathStar((prevShowDeathStar) => !prevShowDeathStar);
            }}
          >
            {showDeathStar ? "Remove" : "Show"} Death Star
          </button>
        </div>
        <div className="leading-none text-muted-foreground">
          See the below data breakdowns to see how we calculate the cost for
          each episode.
        </div>
      </CardFooter>
    </Card>
  );
};
