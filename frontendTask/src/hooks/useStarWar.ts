import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StarWarsCharacter } from "../types";

const fetchStarWarsCharacters = async () => {
  const { data } = await axios.get("https://swapi.dev/api/people/");
  return data.results;
};
export const useStarWarsCharacters = () => {
  return useQuery<StarWarsCharacter[]>({
    queryKey: ["starWarsCharacters"],
    queryFn: fetchStarWarsCharacters,
    cacheTime: 1000 * 60 * 5,
  });
};
