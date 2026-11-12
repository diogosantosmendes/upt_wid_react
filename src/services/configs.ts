const API_BASE_URL = "https://ipt-int-web-api.onrender.com";

export const STATION_API_URL = `${API_BASE_URL}/classes/station`;

let idToken: string | null = null;

export function setIdToken(token: string | null) {
    idToken = token;
}

export async function authenticatedFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    if (!idToken) {
        throw new Error("No ID token available for authenticated request.");
    }

    const headers = {
        ...init?.headers,
        "Authorization": `Bearer ${idToken}`
    };

    return fetch(input, { ...init, headers });
}