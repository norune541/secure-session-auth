import bcrypt from "bcrypt";
import * as userService from "../user/user.service";
import * as sessionService from "./session.service";
import * as tokenService from "./token.service";
import { ApiError } from "../../shared/errors/ApiError";
import type { LoginDto } from "./dto/login.dto";
import type { MetadataDto } from "./dto/metadata.dto";

export const authenticateUser = async (
  userDto: LoginDto,
  metaDto: MetadataDto,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await userService.findUserByEmail(userDto.email);
  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  const ok = await bcrypt.compare(userDto.password, user.password);
  if (!ok) {
    throw new ApiError("Invalid credentials", 401);
  }

  const accessToken = tokenService.signAccess(user);
  const { hash, refreshToken } = tokenService.signRefresh();

  await sessionService.create(user.id, metaDto, hash);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Validates the input refresh token, rotates the stored refresh token hash,
 * and issues a new access token plus a new refresh token.
 *
 * @param inputToken - The refresh token string received from the client.
 * @returns An object containing a new access token and refresh token.
 * @throws ApiError when the refresh token is invalid or expired.
 */
export const refreshSession = async (
  inputToken: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const sessionContext = await sessionService.validateRefreshToken(inputToken);
  if (!sessionContext) {
    throw new ApiError("Invalid or expired refresh token", 401);
  }

  const { user, id } = sessionContext;

  const accessToken = tokenService.signAccess(user);
  const { refreshToken, hash } = tokenService.signRefresh();

  await sessionService.update(id, hash);

  return {
    accessToken,
    refreshToken,
  };
};
