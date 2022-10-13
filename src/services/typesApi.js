import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://safetydevapis.safetytracker.be/public/api/",

    prepareHeaders: (headers) => {
      const token = window.sessionStorage.getItem("Bearer");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Types"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    types: builder.query({
      query: () => "management/information/type",
      providesTags: ["Types"],
    }),
    addTask: builder.mutation({
      query: (type) => ({
        url: "management/information/type",
        method: "POST",
        body: type,
      }),
      invalidatesTags: ["Types"],
    }),
    updateTypes: builder.mutation({
      query: (data) => ({
        url: "management/information/type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Types"],
    }),
    deleteTypes: builder.mutation({
      query: (ids) => ({
        url: `management/information/type`,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["Types"],
    }),
    
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useTypesQuery,
  useAddTaskMutation,
  useUpdateTypesMutation,
  useDeleteTypesMutation,
} = typesApi;
