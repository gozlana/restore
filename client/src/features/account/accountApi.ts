import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Address, User } from "../../app/models/user";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { toast } from "react-toastify";
import { router } from "../../app/routes/Routes";

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginSchema>({
      query: (creds) => ({
        url: 'account/login?useCookies=true',
        method: 'POST',
        body: creds,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(['UserInfo']));
        } catch (error) {
          console.log(error)
        }
      }
    }),
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: 'account/register',
          method: 'POST',
          body: creds
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Registration successful - you can now sign in!');
          router.navigate('/login');
        } catch (error) {
          console.log(error);
        }
      }
    }),
    userInfo: builder.query<User, void>({
      query: () => ({
        url: 'account/user-info',
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: ['UserInfo']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'account/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(['UserInfo']));
      }
    }),
    fetchAddress: builder.query<Address, void>({
      query: () => ({
        url: 'account/address',
      })
    }),
    updateAddress: builder.mutation<Address, Address>({
      query: (address) => ({
        url: 'account/address',
        method: 'POST',
        body: address
      }),
      onQueryStarted: async (address, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          accountApi.util.updateQueryData('fetchAddress', undefined, (draft) => {
            Object.assign(draft, { ...address });
          }));
        try {
          await queryFulfilled;
          toast.success('Address updated successfully');
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      }
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, 
  useUserInfoQuery, useFetchAddressQuery, useUpdateAddressMutation } = accountApi;


