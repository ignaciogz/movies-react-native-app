import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RealtimeDB_BaseURL } from './keys/firebase/realtimeDatabase';

export const cinemaApi = createApi({
  reducerPath: "cinemaApi",
  baseQuery: fetchBaseQuery({ baseUrl: RealtimeDB_BaseURL }),
  tagTypes: ["profileImageGet", "ticketsGet"],
  endpoints: (builder) => ({
    /* ----------- CINEMA ----------- */
    getCandyBarProducts: builder.query({
      query: () => `candyBar.json`,
      transformResponse: (response) => {
        if(!response) return [];
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    getMovieGenres: builder.query({
      query: () => `movieGenres.json`,
    }),
    getMovies: builder.query({
      query: () => `movies.json`,
      transformResponse: (response) => {
        if(!response) return [];
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    getMovieById: builder.query({
      query: (movieID) => `movies.json?orderBy="id"&equalTo=${movieID}`,
      transformResponse: (response) => {
        if(!response) return null;
        const responseTransformed = Object.values(response);
        return responseTransformed[0];
      },
    }),
    getScreeningTimes: builder.query({
      query: () => `screeningTimes.json`,
      transformResponse: (response) => {
        if(!response) return [];
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    /* ----------- TICKETS ----------- */
    getTickets: builder.query({
      query: () => `tickets.json`,
      providesTags: ["ticketsGet"],
      transformResponse: (response) => {
        if(!response) return [];
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    postTickets: builder.mutation({
      query: ({ ...ticket }) => ({
        url: "tickets.json",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["ticketsGet"],
    }),
    /* ----------- USER PROFILE ----------- */
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const {
  useGetCandyBarProductsQuery,
  useGetMovieGenresQuery,
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetScreeningTimesQuery,
  useGetTicketsQuery,
  usePostTicketsMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} = cinemaApi;
