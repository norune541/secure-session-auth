import ky from "ky";
import type { RefreshSessionResponse } from "@repo/types";

export const authApi = ky.create({
  baseUrl: "http://localhost:3000/api/",
  credentials: "include",
});

export const protectedApi = ky
  .create({
    baseUrl: "http://localhost:3000/api/",
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
          const serverResponse = await response.clone().json();
          if (
            response.status === 401 &&
            serverResponse?.error.type === "JWT_EXPIRED"
          ) {
            const { accessToken } = await authApi
              .post("http://localhost:3000/api/auth/sessions/refresh")
              .json<RefreshSessionResponse>();

            const headers = new Headers(response.headers);
            headers.set("Authorization", `Bearer ${accessToken}`);

            localStorage.setItem("accessToken", accessToken);

            return ky.retry({
              request: new Request(request, { headers }),
              code: "TOKEN_REFRESHED",
            });
          }
        },
      ],
    },
  });
