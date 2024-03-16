import { LIMIT_RECOMMENDATION_SONGS, URL } from "@/lib/constants";
import { SongsRecommendationsSchema } from "@/lib/definitions/songs/recommendations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
    }),
    reducerPath: "collectionApi",

    tagTypes: ["recommendations"],
    endpoints: (build) => ({
        getRecommendations: build.query<SongsRecommendationsSchema, string>({
            query: (songID) =>
                `/api/songs/${songID}/suggestions?limit=${LIMIT_RECOMMENDATION_SONGS}`,
            providesTags: (result, error, id) => [
                { type: "recommendations", id },
            ],
        }),
    }),
});

export const { useGetRecommendationsQuery } = collectionSlice;
