import ky from "ky";
import type { RefreshSessionResponse } from "@repo/types";

export const authApi = ky.create({
  baseUrl: "/api/",
  credentials: "include",
});

let refreshPromise: Promise<string | null> | null = null;

export const protectedApi = ky
  .create({
    baseUrl: "/api/",
    credentials: "include",
  })
  .extend({
    hooks: {
      beforeRequest: [
        ({ request }) => {
          request.headers.set(
            "Authorization",
            `Bearer ${localStorage.getItem("accessToken")}`,
          );
        },
      ],
      afterResponse: [
        async ({ request, response }) => {
          if (response.status !== 401) {
            return;
          }

          const serverResponse = await response.clone().json();
          if (serverResponse?.error?.type === "API_ERROR") {
            return;
          }

          if (serverResponse?.error?.type === "JWT_EXPIRED") {
            if (!refreshPromise) {
              refreshPromise = (async () => {
                try {
                  const { accessToken } = await authApi
                    .post("/api/auth/sessions/refresh")
                    .json<RefreshSessionResponse>();
                  localStorage.setItem("accessToken", accessToken);
                  return accessToken;
                } finally {
                  refreshPromise = null;
                }
              })();
            }
            const accessToken = await refreshPromise;

            const headers = new Headers(response.headers);
            headers.set("Authorization", `Bearer ${accessToken}`);

            return ky.retry({
              request: new Request(request, { headers }),
              code: "TOKEN_REFRESHED",
            });
          }
        },
      ],
    },
  });
