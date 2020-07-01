import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {Article} from "../../../../types/article";
import {NewArticle} from "../../../../types/new-article";

const validArticleId = `-H91UO1mzYQSeSGK2rxWC`;
const invalidArticleId = `invalid-article-id`;
const validCommentId = `-ZyTZtrsZjjBq8k5Bskzjb`;
const invalidCommentId = `invalid-comment-id`;
const validNewArticle: NewArticle = {
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.  1938 году.`,
  category: [`Железо`, `За жизнь`],
  createdDate: new Date(Date.now()),
  fullText: `Освоить вёрстку несложно.`,
  title: `Как собрать камни бесконечности`,
};
const invalidNewArticle = {...validNewArticle, category: undefined};

describe(`Articles router`, () => {
  let server: Application;
  let httpServer: http.Server;
  beforeEach(() => {
    const app = new App();
    httpServer = app.listen();
    server = app.getServer();
  });
  afterEach(() => {
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
      const responseKeys = Object.keys(res.body as Article);
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
    });
  });

  describe(`get comment by id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      const responseKeys = Object.keys(res.body as Article);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`text`);
    });
  });

  describe(`POST Create new article`, () => {
    test(`Should return code 400 when pass invalid article params`, async () => {
      const res = await request(server)
        .post(`/api/articles/`)
        .send(invalidNewArticle);
      expect(res.status).toBe(400);
    });

    test(`Should return code 201 when pass valid article params`, async () => {
      const res = await request(server)
        .post(`/api/articles/`)
        .send(validNewArticle);
      expect(res.status).toBe(201);
    });
  });

  describe(`PUT Update existing article`, () => {
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(server).put(`/api/articles/${invalidArticleId}`).send(validNewArticle);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(server).put(`/api/articles/${validArticleId}`).send(validNewArticle);
      expect(res.status).toBe(200);
    });
  });

  describe(`DELETE Delete existing article`, () => {
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(server).delete(`/api/articles/${invalidArticleId}`);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(server).delete(`/api/articles/${validArticleId}`);
      expect(res.status).toBe(200);
    });
  });
});
