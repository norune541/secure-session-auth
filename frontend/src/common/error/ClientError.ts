import type { BackendError } from "@repo/types";

export class ClientError extends Error {
  public type: string;

  constructor(backendError: BackendError) {
    super(backendError.error.message);

    this.name = "ClientError";
    this.type = backendError.error.type;

    Object.setPrototypeOf(this, ClientError.prototype);
  }
}
