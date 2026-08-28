import bcrypt from "bcrypt";
import * as userService from "../user/user.service";
import * as sessionService from "./session.service";
import * as tokenService from "./token.service";
import { ApiError } from "../../common/errors/ApiError";
import type { LoginDto } from "./dto/login.dto";
import type { MetadataDto } from "./dto/metadata.dto";
import type { SignupDto } from "./dto/signup.dto";

export const signUser = async (userDto: SignupDto, metaDto: MetadataDto) => {
  await userService.findUserByCredentials(userDto.email, userDto.phone);

  const passwordHash = await bcrypt.hash(userDto.password, 10);
  const user = await userService.createUser(userDto, passwordHash);

  const { refreshToken, hash } = tokenService.signRefresh();

  const session = await sessionService.create(
    user.id,
    userDto.rememberMe,
    metaDto,
    hash,
  );

  const accessToken = tokenService.signAccess({
    id: user.id,
    role: user.role,
    sessionId: session.id,
  });

  return {
    refreshToken,
    accessToken,
  };
};

export const authenticateUser = async (
  userDto: LoginDto,
  metaDto: MetadataDto,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await userService.findUserByLogin(userDto.login);
  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  const ok = await bcrypt.compare(userDto.password, user.password);
  if (!ok) {
    throw new ApiError("Invalid credentials", 401);
  }

  const { hash, refreshToken } = tokenService.signRefresh();
  const session = await sessionService.create(
    user.id,
    userDto.rememberMe,
    metaDto,
    hash,
  );

  const accessToken = tokenService.signAccess({
    id: user.id,
    role: user.role,
    sessionId: session.id,
  });

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

  const accessToken = tokenService.signAccess({
    id: user.id,
    role: user.role,
    sessionId: id,
  });
  const { refreshToken, hash } = tokenService.signRefresh();

  await sessionService.update(id, hash);

  return {
    accessToken,
    refreshToken,
  };
};
