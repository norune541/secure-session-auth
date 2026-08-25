interface Sessions {
  id: string;
  userId: string;
  ip: string;
  device: string;
  revoked: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  expiresAt: Date | string;
}
export interface AllSessionsResponse {
  sessions: Sessions[];
  currentSession: string;
}
