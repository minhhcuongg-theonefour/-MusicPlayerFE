import { music } from "./musicBaseApis";

const playlist = music.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `playlists`,
          body: body,
        };
      },
      invalidatesTags: ["UserPlaylist"],
    }),
    getPlaylist: builder.query({
      query: () => ({
        url: "playlists",
      }),
      providesTags: ["UserPlaylist"],
    }),
    removePlaylist: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `playlists/${id}`,
      }),
      invalidatesTags: ["UserPlaylist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
  useRemovePlaylistMutation,
} = playlist;
