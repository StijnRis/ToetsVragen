import { baseApiUrl } from "../config";

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApiError";
    }
}

export const api = {
    get: async (url, params) => {
        const apiUrl = new URL(url, baseApiUrl);
        if (params)
            Object.keys(params).forEach((key) =>
                apiUrl.searchParams.append(key, params[key])
            );

        const response = await fetch(apiUrl, {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.error);
        }

        return data;
    },

    post: async (url, body) => {
        const apiUrl = new URL(url, baseApiUrl);

        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.error);
        }

        return data;
    },
};
