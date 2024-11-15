This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

NOTE: If you haven't installed dependencies for this project, you will need to install with your preferred package manager. I (Brandon) used pnpm.

```bash
pnpm i    # install dependencies
pnpm dev  # start the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions (marked with "Assumption!!!" in code)

- A starship cost is not counted for a film if it was "purchased" in a previous film (assuming all the starships are never destroyed and rebuilt which has to be right 😁)

- Starships without a cost are totally free! This is called out on the frontend by highlighting films with starships with unknown cost
