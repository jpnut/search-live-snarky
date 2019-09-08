import { $ElementType } from "utility-types";
import shows from '../data/tagged-shows.json';

export type FileType = "flac" | "mp3";

export type ContentType = "artists" | "tracks";

export type Direction = "asc" | "desc";

export type Theme = "dark" | "light";

export type Show = $ElementType<typeof shows, number>;

export type Artist = keyof Show["tags"]["artists"];

export type Track = keyof Show["tags"]["tracks"];

export type Tag = {
  type: "artist";
  value: Artist;
} | {
  type: "track";
  value: Track;
} | {
  type: "Main";
  value: string;
};