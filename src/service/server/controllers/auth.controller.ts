import {LoginStatus} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {IAuthorizationSuccess} from "../../../types/interfaces/authorization-result";
import {ILogin} from "../../../types/interfaces/login";
import {makeAuthTokens} from "../auth/make-auth-tokens";
import {AuthService} from "../data-access/services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async login({email, password}: ILogin): Promise<ControllerResponse<IAuthorizationSuccess>> {
    try {
      const {state, user} = await this.authService.login({email, password});
      if (state === LoginStatus.UNKNOWN_EMAIL) {
        return Promise.reject({email: `Пользователь с таким email не найден`});
      }
      if (state === LoginStatus.INVALID_PASSWORD) {
        return Promise.reject({password: `Неправильно введен логин или пароль`});
      }
      const {accessToken, refreshToken} = makeAuthTokens(user);
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
}
