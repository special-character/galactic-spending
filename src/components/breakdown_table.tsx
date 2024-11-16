import React from "react";

import { Card } from "@/components/shadcn/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/shadcn/table";

type FilmBreakdown = {
  episodeID: number;
  starshipID: number;
  starshipName: string;
  purchasedInPriorEpisode: number | undefined;
  starshipCost: string;
};

type BreakdownTableProps = {
  breakdown: FilmBreakdown[];
  totalStarshipCost: number;
  episodeName: string;
};

export const BreakdownTable = ({
  breakdown,
  totalStarshipCost,
  episodeName,
}: BreakdownTableProps) => {
  const formattedStarshipCost = totalStarshipCost.toLocaleString();

  return (
    <Card>
      <Table>
        <TableCaption>Breakdown for {episodeName}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Episode ID</TableHead>
            <TableHead>Starship ID</TableHead>
            <TableHead>Starship Name</TableHead>
            <TableHead>Purchased In Episode</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breakdown.map((breakdown) => {
            const starshipNumberCost = parseInt(breakdown.starshipCost, 10);
            const formattedStarshipCost = Number.isNaN(starshipNumberCost)
              ? breakdown.starshipCost
              : starshipNumberCost.toLocaleString();

            return (
              <TableRow key={`${breakdown.episodeID}-${breakdown.starshipID}`}>
                <TableCell>{breakdown.episodeID}</TableCell>
                <TableCell className="font-medium">
                  {breakdown.starshipID}
                </TableCell>
                <TableCell>{breakdown.starshipName}</TableCell>
                <TableCell>{breakdown.purchasedInPriorEpisode}</TableCell>
                <TableCell className="text-right">
                  {formattedStarshipCost}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{`${formattedStarshipCost}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
};
