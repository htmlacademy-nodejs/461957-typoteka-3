/* eslint-disable max-nested-callbacks */
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {initApp} from "./tests-boilerplate/init-app";
import {IUserCreatingDoublePasswords} from "../../../types/interfaces/user-creating";
import {ILogin} from "../../../types/interfaces/login";
import {IAuthorizationSuccess} from "../../../types/interfaces/authorization-result";

const validSignUp: ILogin = {
  email: `zaberkirder8@usgs.gov`,
  password: `hzgdghdglhdgklgz`,
};
const validUserToSignUp: IUserCreatingDoublePasswords = {
  ...validSignUp,
  firstName: `Lowe`,
  lastName: `Tennant`,
  avatar: ``,
  roleId: 2,
  passwordRepeated: `hzgdghdglhdgklgz`,
};

describe(`Users router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`/login`, () => {
    beforeAll(async () => await request(app).post(`/api/auth/login`).send(validUserToSignUp));

    describe(`POST user`, () => {
      test(`Should return code 200 when sign-up successfully`, async () => {
        const res = await request(app).post(`/api/auth/login`).send(validSignUp);
        expect(res.status).toBe(200);
      });
      test(`Should return access token and refresh token when sign-up successfully`, async () => {
        const res = await request(app).post(`/api/auth/login`).send(validSignUp);
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
            ...validSignUp,
            password: `invalid-password`,
          });
        expect(res.status).toBe(403);
      });
      test(`Should return code 400 when pass non-existing email`, async () => {
        const res = await request(app)
          .post(`/api/auth/login`)
          .send({
            ...validSignUp,
            email: `non-existing-email@gmail.com`,
          });
        expect(res.status).toBe(403);
      });
    });
  });
});
