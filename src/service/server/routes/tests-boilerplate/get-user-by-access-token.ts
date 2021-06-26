import {Application} from "express";
import {agent as request} from "supertest";
import {APIRoutes} from "../../../../constants-es6";

import {IUserPreview} from "../../../../types/interfaces/user-preview";

import {resolveAuthHeader} from "./resolve-auth-header";

export async function getUserByAccessToken(app: Application, accessToken: string): Promise<IUserPreview> {
  const response = await request(app).get(`/api${APIRoutes.GET_USER}`).set(resolveAuthHeader(accessToken));
  return response.body as IUserPreview;
}
