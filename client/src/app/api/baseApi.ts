import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include'
});

type ErrorResponse = | string | {title: string} | {errors: string[]};


const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const request: FetchArgs = typeof args === 'string' ? {url: args} : {...args}
  const method = (request.method ?? 'GET').toUpperCase();

  if((method === 'GET' || method === 'HEAD') && 'body' in request){
    delete (request as any).body;
  }
  api.dispatch(startLoading());
  if (import.meta.env.DEV) await sleep();
  const result = await customBaseQuery(request, api, extraOptions);
  api.dispatch(stopLoading());
  if (result.error) {
    console.log(result.error)

    const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status

    const responseData = result.error.data as ErrorResponse;

    switch (originalStatus) {
      case 400:
        if(typeof responseData === 'string') toast.error(responseData);
        else if('errors' in responseData) {
          const message = Object.values(responseData.errors).flat().join(', ');
          toast.error(message);
        }
        else toast.error(responseData.title);
        break;
      case 401:
        if(typeof responseData === 'object' && 'title' in responseData)
        toast.error(responseData.title);
        break;
      case 404:
        if(typeof responseData === 'object' && 'title' in responseData)
        toast.error(responseData.title);
        break;
      case 500:
        if(typeof responseData === 'object' && 'title' in responseData)
        toast.error(responseData.title);
        break;
      default:
        break;
    }
  }
  return result;
}