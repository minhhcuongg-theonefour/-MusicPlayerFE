import { music } from "./musicBaseApis";

const genres = music.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({
        url: `genres?page=1&limit=10`,
      }),
    }),
    getGenreDetails: builder.query({
      query: ({id}) => ({
        url: `genres/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetGenresQuery, useGetGenreDetailsQuery } = genres;
