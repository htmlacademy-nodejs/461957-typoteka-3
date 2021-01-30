import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {initApp} from "./tests-boilerplate/init-app";
import {UserId} from "../../../types/user-id";
import {IUserPreview} from "../../../types/interfaces/user-preview";

const validUserId: UserId = 2;
const invalidUserId = `-1`;

describe(`Users router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`GET comment by id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(app).get(`/api/users/${invalidUserId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(app).get(`/api/users/${validUserId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return valid structure`, async () => {
      const res = await request(app).get(`/api/users/${validUserId}`);
      const responseKeys = Object.keys(res.body as IUserPreview);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`firstName`);
      expect(responseKeys).toContain(`lastName`);
      expect(responseKeys).toContain(`avatar`);
    });
  });
});
