import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";

describe(`Articles router`, () => {
  let server: Application;
  let httpServer: http.Server
  beforeAll(async () => {
    const app = new App();
    httpServer = app.listen();
    server = app.getServer();
  });
  afterAll(async () => {
    httpServer.close();
  })

  describe(`get()`, () => {
    test(`Should return code 200 when request articles`, async () => {
      const res = await request(server).get(`/api/articles/`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(server).get(`/api/articles/`);
      expect(Array.isArray(res.body)).toBe(true);
    })
  });
});
