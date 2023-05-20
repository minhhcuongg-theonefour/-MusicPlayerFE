import { music } from "./musicBaseApis";

const genres = music.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({
        url: `genres?page=1&limit=10`,
      }),
      providesTags: ["Genres"],
    }),
    getGenreDetails: builder.query({
      query: (id) => ({
        url: `genres/${id}`,
      }),
      providesTags: ["Genres"],
    }),
    addGenres: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: "genres",
        body: formData,
      }),
      invalidatesTags: ["Genres"],
    }),
    updateGenres: builder.mutation({
      query: ({ id, formData }) => ({
        method: "PUT",
        url: `genres/${id}`,
        body: formData,
      }),
      invalidatesTags: ["Genres"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGenresQuery,
  useGetGenreDetailsQuery,
  useAddGenresMutation,
  useUpdateGenresMutation,
} = genres;
