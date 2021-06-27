import {Application} from "express";
import {agent as request} from "supertest";

import {IAuthTokens} from "../../../../types/interfaces/auth-tokens";
import {IAuthorizationSuccess} from "../../../../types/interfaces/authorization-result";
import {ILogin} from "../../../../types/interfaces/login";

export async function signIn(app: Application, credentials: ILogin): Promise<IAuthTokens> {
  const authResponse = (await request(app).post(`/api/auth/login`).send(credentials)).body as IAuthorizationSuccess;
  return authResponse.payload;
}
