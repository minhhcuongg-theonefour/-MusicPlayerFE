import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://192.168.1.24:8085/";
const baseQuery = {
  baseUrl: url,
  prepareHeaders: (headers) => {
    const token =
      "v2.local.tZBzdlW4-ez1Qbgkqy-ExJ5K9gRu-cvbsq9eyjnton1shIwrI-baN5ZeLd5yJx9lxfkz69AQaEQ5xFF6xjR7NyNfQvzZLHE8hBMSAfiZ9IMZvvWDJ83RpdwXQIuXS9Ms-R_IczE9_J7PuGtvtTHOjiJMyIJXnkRTpqE6lwhamKdIwDJVMVmuuUkO1CXQcPmNGfjvR-Jla4WoIu7D9c2dfmmk1BavXkudqhS0niBn072veY1HtHzbba0EB0u1AFDN33yE-Y4QV9ZSfvMAMiomeT784KOJzyC0v0KZDlQ39M01sWw7eHGd.bnVsbA";

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
