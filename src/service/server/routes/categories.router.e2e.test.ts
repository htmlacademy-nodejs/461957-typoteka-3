import http from "http";

import {Application} from "express";
import {agent as request} from "supertest";

import {initApp} from "./tests-boilerplate/init-app";

describe(`Categories router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when request categories`, async () => {
      const res = await request(app).get(`/api/categories/`);
      expect(res.status).toBe(200);
    });
    test(`Should return array`, async () => {
      const res = await request(app).get(`/api/categories/`);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
