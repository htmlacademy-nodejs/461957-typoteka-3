import {App} from "../app";
import {agent as request} from "supertest";

describe(`Categories router`, () => {
  let server;
  beforeAll(async () => {
    const app = new App();
    await app.listen();
    server = app.getServer();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when request categories`, async () => {
      const res = await request(server).get(`/api/categories/`);
      expect(res.status).toBe(200);
    });
    test(`Should return array`, async () => {
      const res = await request(server).get(`/api/categories/`);
      expect(Array.isArray(res.body)).toBe(true);
    })
  });
});
