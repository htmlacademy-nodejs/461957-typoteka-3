import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import http from "http";

describe(`CategoriesStatistics router`, () => {
  let server: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    const app = new App();
    await app.init();
    httpServer = app.listen();
    server = app.getServer();
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when request categories`, async () => {
      const res = await request(server).get(`/api/categories-statistics`);
      expect(res.status).toBe(200);
    });
    test(`Should return array`, async () => {
      const res = await request(server).get(`/api/categories-statistics`);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
