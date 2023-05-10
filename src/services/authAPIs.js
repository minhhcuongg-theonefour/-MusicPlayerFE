import { music } from "./musicBaseApis";

const auth = music.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: `login`,
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (form) => ({
        method: "POST",
        url: `register`,
        body: form,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = auth;
