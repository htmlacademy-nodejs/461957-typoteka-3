import {App} from "../app";
import {agent as request} from "supertest";

describe(`Search router`, () => {
  let server;
  beforeAll(async () => {
    const app = new App();
    await app.listen();
    server = app.getServer();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when pass query string`, async () => {
      const res = await request(server).get(`/api/search?query=test-query-string`);
      expect(res.status).toBe(200);
    });
  });
});
