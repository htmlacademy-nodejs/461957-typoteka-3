import {App} from "../app";
import {agent as request} from "supertest";

describe(`Articles router`, () => {
  let server;
  beforeAll(async () => {
    const app = new App();
    await app.listen();
    server = app.getServer();
  });

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
