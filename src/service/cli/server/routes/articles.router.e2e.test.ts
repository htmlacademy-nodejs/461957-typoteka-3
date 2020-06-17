import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {Article} from "../../../../types/article";

const invalidArticleId = `invalid-article-id`;
const validArticleId = `-H91UO1mzYQSeSGK2rxWC`;

describe(`Articles router`, () => {
  let server: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    const app = new App();
    httpServer = app.listen();
    server = app.getServer();
  });
  afterAll(async () => {
    httpServer.close();
  });

  describe(`get articles`, () => {
    test(`Should return code 200 when request articles`, async () => {
      const res = await request(server).get(`/api/articles/`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(server).get(`/api/articles/`);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe(`get article by id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(server).get(`/api/articles/${invalidArticleId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}`);
      const responseKeys = Object.keys(res.body as Article) as string[];
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`title`);
      expect(responseKeys).toContain(`createdDate`);
      expect(responseKeys).toContain(`announce`);
      expect(responseKeys).toContain(`fullText`);
      expect(responseKeys).toContain(`category`);
      expect(responseKeys).toContain(`comments`);
    });
  });

  describe(`get comments by article id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(server).get(`/api/articles/${invalidArticleId}/comments/`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/`);
      expect(Array.isArray(res.body)).toBe(true);
    })
  })
});
