import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth_ApiKey, Auth_BaseURL } from './keys/firebase/authentication';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: Auth_BaseURL }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ ...auth }) => ({
        url: `/accounts:signInWithPassword?key=${Auth_ApiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
    signUp: builder.mutation({
      query: ({ ...auth }) => ({
        url: `/accounts:signUp?key=${Auth_ApiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
