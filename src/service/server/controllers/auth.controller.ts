import {Logger} from "pino";

import {LoginStatus} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {IAuthTokens} from "../../../types/interfaces/auth-tokens";
import {IAuthorizationSuccess} from "../../../types/interfaces/authorization-result";
import {ILogin} from "../../../types/interfaces/login";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {getLogger} from "../../logger";
import {makeAuthTokens} from "../auth/make-auth-tokens";
import {verifyAccessToken} from "../auth/verify-access-token";
import {verifyRefreshToken} from "../auth/verify-refresh-token";
import {AuthService} from "../data-access/services/auth.service";

export class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = getLogger();
  }

  public async login({email, password}: ILogin): Promise<ControllerResponse<IAuthorizationSuccess>> {
    try {
      const {state, user} = await this.authService.login({email, password});
      if (state === LoginStatus.UNKNOWN_EMAIL) {
        return Promise.reject({email: `Пользователь с таким email не найден`});
      }
      if (state === LoginStatus.INVALID_PASSWORD) {
        return Promise.reject({password: `Неправильно введен логин или пароль`});
      }
      const {accessToken, refreshToken} = await this.createNewTokens(user);
      return {
        payload: {
          isSuccess: true,
          payload: {accessToken, refreshToken},
        },
      };
    } catch (e) {
      return Promise.reject(`Failed to login`);
    }
  }

  public async getUserByToken(accessToken: string): Promise<ControllerResponse<IUserPreview>> {
    try {
      const user = await verifyAccessToken(accessToken);
      return {
        payload: user,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async refresh(existingToken: string): Promise<ControllerResponse<IAuthTokens>> {
    try {
      const user = await verifyRefreshToken(existingToken);
      await this.authService.deleteRefreshToken(existingToken);
      const {accessToken, refreshToken} = await this.createNewTokens(user);
      return {payload: {accessToken, refreshToken}};
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async dropRefreshToken(refreshToken: string): Promise<ControllerResponse<void>> {
    try {
      await this.authService.deleteRefreshToken(refreshToken);
      return {};
    } catch (e) {
      this.logger.error(`Failed to drop refresh token:  ${(e as unknown).toString()}`);
      return Promise.reject(e);
    }
  }

  private async createNewTokens(user: IUserPreview): Promise<IAuthTokens> {
    try {
      const {accessToken, refreshToken} = makeAuthTokens(user);
      await this.authService.saveRefreshToken(refreshToken, user.id);
      return {accessToken, refreshToken};
    } catch (e) {
      this.logger.error(`Failed to save refresh token: ${(e as unknown).toString()}`);
      return Promise.reject(`Failed to save refresh token`);
    }
  }
}
