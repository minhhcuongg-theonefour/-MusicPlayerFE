import { music } from "./musicBaseApis";

const user = music.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `users`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUserQuery } = user;
