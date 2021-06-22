/* eslint-disable max-nested-callbacks */
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {initApp} from "./tests-boilerplate/init-app";
import {ILogin} from "../../../types/interfaces/login";
import {IAuthorizationSuccess} from "../../../types/interfaces/authorization-result";
import {createUser} from "./tests-boilerplate/create-user";

let validUserCredentials: ILogin;

describe(`Auth router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
    validUserCredentials = await createUser(app);
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`/login`, () => {
    describe(`POST user`, () => {
      test(`Should return access token and refresh token when sign-up successfully`, async () => {
        const res = await request(app).post(`/api/auth/login`).send(validUserCredentials);
        expect(res.status).toBe(200);
        const responseKeys = Object.keys(res.body as IAuthorizationSuccess);
        const payloadKeys = Object.keys((res.body as IAuthorizationSuccess).payload);
        expect(responseKeys).toContain(`payload`);
        expect(responseKeys).toContain(`isSuccess`);
        expect(payloadKeys).toContain(`accessToken`);
        expect(payloadKeys).toContain(`refreshToken`);
      });
      test(`Should return code 400 when pass invalid password`, async () => {
        const res = await request(app)
          .post(`/api/auth/login`)
          .send({
            ...validUserCredentials,
            password: `invalid-password`,
          });
        expect(res.status).toBe(403);
      });
      test(`Should return code 400 when pass non-existing email`, async () => {
        const res = await request(app)
          .post(`/api/auth/login`)
          .send({
            ...validUserCredentials,
            email: `non-existing-email@gmail.com`,
          });
        expect(res.status).toBe(403);
      });
    });
  });
});
