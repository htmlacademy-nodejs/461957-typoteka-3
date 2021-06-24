/* eslint-disable max-nested-callbacks */
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {initApp} from "./tests-boilerplate/init-app";
import {UserId} from "../../../types/user-id";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {IUserCreatingDoublePasswords} from "../../../types/interfaces/user-creating";

const validUserId: UserId = 2;
const invalidUserId = `-1`;
const validNewUser: IUserCreatingDoublePasswords = {
  email: `ltennant@js.io`,
  firstName: `Lowe`,
  lastName: `Tennant`,
  avatar: ``,
  roleId: 2,
  password: `hzgdghdglhdgklgz`,
  passwordRepeated: `hzgdghdglhdgklgz`,
};
const invalidNewUser = {
  email: `zaberkirder8@usgs`,
  firstName: `1233*((*()__`,
  lastName: `!@#$%^&*(`,
  roleId: -1,
  password: `123`,
  passwordRepeated: `1234`,
};
const existingEmail = `existing-email@gmail.com`;

describe(`Users router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`GET user by id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(app).get(`/api/users/id/${invalidUserId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(app).get(`/api/users/id/${validUserId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return valid structure`, async () => {
      const res = await request(app).get(`/api/users/id/${validUserId}`);
      const responseKeys = Object.keys(res.body as IUserPreview);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`firstName`);
      expect(responseKeys).toContain(`lastName`);
      expect(responseKeys).toContain(`avatar`);
    });
  });

  describe(`POST user`, () => {
    test(`Should return code 201 when create new user`, async () => {
      const res = await request(app).post(`/api/users/`).send(validNewUser);
      expect(res.status).toBe(201);
    });
    test(`Should return code 400 when create new user with existing email`, async () => {
      await request(app)
        .post(`/api/users/`)
        .send({...validNewUser, email: existingEmail});
      const res = await request(app)
        .post(`/api/users/`)
        .send({...validNewUser, email: existingEmail});
      expect(res.status).toBe(400);
    });
    test(`Should validate fields`, async () => {
      const res = await request(app).post(`/api/users/`).send(invalidNewUser);
      const responseKeys = Object.keys(res.body as IUserCreatingDoublePasswords);
      expect(responseKeys).toContain(`email`);
      expect(responseKeys).toContain(`firstName`);
      expect(responseKeys).toContain(`lastName`);
      // expect(responseKeys).toContain(`avatar`);
      expect(responseKeys).toContain(`roleId`);
      expect(responseKeys).toContain(`password`);
      expect(responseKeys).toContain(`passwordRepeated`);
    });
  });
});
