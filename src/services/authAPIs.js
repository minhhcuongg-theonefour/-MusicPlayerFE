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
    updateUser: builder.mutation({
      query: (formData) => ({
        method: "PUT",
        url: `user`,
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation } =
  auth;
