import { recommendMusic, newMusic } from "./home";
import { hotMusic, hotSearch } from "@/api/search";
import { getSongById, getLyricById } from "@/api/Play";
export const recommendMusicApi = recommendMusic;
export const newMusicAPI = newMusic;
export const hotMusicAPI = hotMusic;
export const hotSearchAPI = hotSearch;
export const getSongByIdAPI = getSongById;
export const getLyricByIdAPI = getLyricById;
