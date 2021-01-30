import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {Article} from "../../../types/article";
import {ArticleId} from "../../../types/article-id";
import {initApp} from "./tests-boilerplate/init-app";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {ICollection} from "../../../types/interfaces/collection";

let validArticleId: ArticleId;
const invalidArticleId = `999999999999999999999999999999999999`;
const validNewArticle: IArticleCreating = {
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.  1938 году.`,
  categories: [{id: 1}, {id: 3}],
  createdDate: new Date(Date.now()),
  fullText: `Освоить вёрстку несложно.`,
  title: `Как собрать камни бесконечности`,
};
const invalidNewArticle = {...validNewArticle, categories: 10};

describe(`Articles router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());

    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const {
      body: {items: articles},
    } = await request(app).get(`/api/articles/?count=100`);
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    validArticleId = (articles as Article[])[0].id;
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`GET articles`, () => {
    test(`Should return code 200 when request articles`, async () => {
      const res = await request(app).get(`/api/articles/?count=100`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(app).get(`/api/articles/?count=100`);
      expect(Array.isArray((res.body as ICollection<any>).items)).toBe(true);
    });
    test(`Should return an array given length`, async () => {
      const res = await request(app).get(`/api/articles/?limit=3`);
      console.log(`res.body`, res.body);
      expect((res.body as ICollection<any>).items.length).toBe(3);
    });
  });

  describe(`GET article by id`, () => {
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(app).get(`/api/articles/${invalidArticleId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(app).get(`/api/articles/${validArticleId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return valid properties`, async () => {
      const res = await request(app).get(`/api/articles/${validArticleId}`);
      const responseKeys = Object.keys(res.body as Article);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`title`);
      expect(responseKeys).toContain(`createdDate`);
      expect(responseKeys).toContain(`announce`);
      expect(responseKeys).toContain(`fullText`);
      expect(responseKeys).toContain(`categories`);
      expect(responseKeys).toContain(`comments`);
    });
  });

  describe(`POST Create new article`, () => {
    test(`Should return code 400 when pass invalid article params`, async () => {
      const res = await request(app).post(`/api/articles/`).send(invalidNewArticle);
      expect(res.status).toBe(400);
    });

    test(`Should return code 201 when pass valid article params`, async () => {
      const res = await request(app).post(`/api/articles/`).send(validNewArticle);
      expect(res.status).toBe(201);
    });
  });

  describe(`PUT Update existing article`, () => {
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(app).put(`/api/articles/${invalidArticleId}`).send(validNewArticle);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(app).put(`/api/articles/${validArticleId}`).send(validNewArticle);
      expect(res.status).toBe(200);
    });
  });

  describe(`DELETE existing article`, () => {
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(app).delete(`/api/articles/${invalidArticleId}`);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(app).delete(`/api/articles/${validArticleId}`);
      expect(res.status).toBe(200);
    });
  });
});
