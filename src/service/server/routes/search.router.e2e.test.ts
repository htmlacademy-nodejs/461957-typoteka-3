import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import http from "http";

describe(`Search router`, () => {
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
    test(`Should return code 200 when pass query string`, async () => {
      const res = await request(server).get(`/api/search?query=test-query-string`);
      expect(res.status).toBe(200);
    });
    test(`Should return code 200 when pass empty query string`, async () => {
      const res = await request(server).get(`/api/search?query=`);
      expect(res.status).toBe(200);
    });
    test(`Should return code 400 when don't pass query param`, async () => {
      const res = await request(server).get(`/api/search`);
      expect(res.status).toBe(400);
    });
    test(`Should return array when pass query string`, async () => {
      const res = await request(server).get(`/api/search?query=%D1%84`);
      expect(Array.isArray(res.body)).toBe(true);
    });
    test(`Should return empty array when pass empty query string`, async () => {
      const res = await request(server).get(`/api/search?query=`);
      expect((res.body.length).toBe(0));
    });
  });
});
