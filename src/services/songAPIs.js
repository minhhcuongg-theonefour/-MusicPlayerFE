import { music } from "./musicBaseApis";

const song = music.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: () => "/songs?page=1&limit=100",
    }),
  }),
  overrideExisting: false,
});

export const { useGetSongsQuery } = song;
