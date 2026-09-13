import type { ActivityResponse } from "@repo/types";

export const formatActivityType = (type: ActivityResponse["type"]) => {
  switch (type) {
    case "CREATED":
      return "Session created";
    case "REFRESHED":
      return "Session refreshed";
    case "REVOKED":
      return "Session revoked";
    case "EXPIRED":
      return "Session expired";
    case "REUSE_DETECTED":
      return "Session reuse detected";
    case "PASSWORD_UPDATED":
      return "Password updated";
  }
};
