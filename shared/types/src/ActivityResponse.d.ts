export interface ActivityResponse {
  id: string;
  sessionId: string;
  type:
    | "CREATED"
    | "REFRESHED"
    | "REVOKED"
    | "EXPIRED"
    | "REUSE_DETECTED"
    | "PASSWORD_UPDATED";
  createdAt: Date | string;
  session: {
    device: string;
    ip: string;
  };
}

export type AllActivityResponse = ActivityResponse[];
