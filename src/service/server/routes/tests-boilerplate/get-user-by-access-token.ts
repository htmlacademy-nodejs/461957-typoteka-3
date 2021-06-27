import {Application} from "express";
import {agent as request} from "supertest";

import {APIRoute} from "../../../../shared/constants/routes/api-route";
import {IUserPreview} from "../../../../types/interfaces/user-preview";

import {resolveAuthHeader} from "./resolve-auth-header";

export async function getUserByAccessToken(app: Application, accessToken: string): Promise<IUserPreview> {
  const response = await request(app).get(`/api${APIRoute.GET_USER}`).set(resolveAuthHeader(accessToken));
  return response.body as IUserPreview;
}
