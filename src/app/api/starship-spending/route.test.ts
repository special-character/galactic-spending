import { getUrlID } from "./route";

test("should return the id from a standard url", () => {
  const url = "https://swapi.info/api/starships/9";

  const result = getUrlID(url);

  expect(result).toBe(9);
});

test("should raise if invalid url", () => {
  const url = "https://swapi.info/api/starships/9/";

  expect(getUrlID(url)).toThrowError();
});
