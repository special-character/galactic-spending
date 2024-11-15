## Getting Started

First, run the development server:

```bash
pnpm i    # install dependencies
pnpm dev  # start the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions (marked with "Assumption!!!" in code)

- A starship cost is not counted for a film if it was "purchased" in a previous film (assuming all the starships are never destroyed and rebuilt which has to be right 😁)

- Starships without a cost are totally free! This is called out on the frontend by highlighting films with starships with unknown cost

## Dev Notes

- Used Shadcn lib, it imported components (under `components/shadcn`) but they had some TS issues I chose to ignore. I would normally dig in here and fix them, but skipping for this exercise.

## Would be cool to do in the future

- Make a stacked bar chart showing colors for each ship corresponding to the tooltip color + cost (focused on the line chart for getting spending over time)
