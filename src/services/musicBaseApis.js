import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://192.168.1.97:8085";
const baseQuery = {
  baseUrl: url,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.login.access_token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
};

export const music = createApi({
  reducerPath: "music",
  baseQuery: fetchBaseQuery(baseQuery),
  endpoints: () => ({}),
});
