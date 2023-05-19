import { music } from "./musicBaseApis";

const song = music.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: () => "songs?page=1&limit=100",
    }),
    getSongByControl: builder.query({
      query: ({ index, direction, source, playlistId, isShuffle, songId }) => {
        if (isShuffle) {
          if (source === "playlist") {
            return `playlists/${playlistId}/songs/shuffle/${songId}`;
          } else {
            return `songs/shuffle/${songId}`;
          }
        } else {
          if (source === "playlist") {
            return `playlists/${playlistId}/songs/index/${index}?direction=${direction}`;
          } else {
            return `songs/index/${index}?direction=${direction}`;
          }
        }
      },
    }),
    addSong: builder.mutation({
      query: (formData) => ({
        method: "POST",
        url: "songs",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSongsQuery,
  useGetSongByControlQuery,
  useAddSongMutation,
} = song;
