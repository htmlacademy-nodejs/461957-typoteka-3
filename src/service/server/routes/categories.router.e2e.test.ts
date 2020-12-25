import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import http from "http";

describe(`Categories router`, () => {
  let server: Application;
  let httpServer: http.Server;
  beforeAll(() => {
    const app = new App();
    httpServer = app.listen();
    server = app.getServer();
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when request categories`, async () => {
      const res = await request(server).get(`/api/categories/`);
      expect(res.status).toBe(200);
    });
    test(`Should return array`, async () => {
      const res = await request(server).get(`/api/categories/`);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
