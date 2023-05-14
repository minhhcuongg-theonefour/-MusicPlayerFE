import { music } from "./musicBaseApis";

const song = music.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: () => "songs?page=1&limit=100",
    }),
    getSongByDirection: builder.query({
      query: ({ index, direction }) =>
        `songs/index/${index}?direction=${direction}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSongsQuery, useGetSongByDirectionQuery } = song;
