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
};
export const StarshipSpendingChart = ({
  starshipChartData,
}: SpendingChartProps) => {
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
              stroke="var(--color-starshipCost)" // This key corresponds to the color in the config
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
      </CardFooter>
    </Card>
  );
};
