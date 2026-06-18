import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket } from "../../app/models/basket";
import { basketApi } from "../basket/basketApi";

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<Basket, void>({
      query: () => ({ url: 'payments', method: 'POST' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
               draft.clientSecret = data.clientSecret;
            }));
        } catch (error) {
          console.log(error);
        }
      }
    })
  })
});

export const { useCreatePaymentIntentMutation } = checkoutApi;
