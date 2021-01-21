import {App} from "../app";
import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {Article, NewArticle} from "../../../types/article";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {ArticleId} from "../../../types/article-id";

let validArticleId: ArticleId;
const invalidArticleId = `invalid-article-id`;
let validCommentId: CommentId;
const invalidCommentId = `invalid-comment-id`;
const validNewArticle: NewArticle = {
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.  1938 году.`,
  categories: [
    {id: 1, label: `1`},
    {id: 3, label: `3`},
  ],
  createdDate: new Date(Date.now()),
  fullText: `Освоить вёрстку несложно.`,
  title: `Как собрать камни бесконечности`,
};
const invalidNewArticle = {...validNewArticle, category: undefined};
const validNewComment: Partial<ArticleComment> = {
  text: `Comment`,
};
const invalidNewComment = {};

describe(`Articles router`, () => {
  let server: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    const app = new App();
    await app.init();
    httpServer = app.listen();
    server = app.getServer();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {body: articles} = await request(server).get(`/api/articles/?count=100`);
    validArticleId = (articles as Article[])[0].id;
  });
  afterEach(() => {
    httpServer.close();
  });

  describe(`GET articles`, () => {
    test(`Should return code 200 when request articles`, async () => {
      const res = await request(server).get(`/api/articles/?count=100`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(server).get(`/api/articles/?count=100`);
      expect(Array.isArray(res.body)).toBe(true);
    });
    test(`Should return an array given length`, async () => {
      const res = await request(server).get(`/api/articles/?count=3`);
      expect(res.body.length).toBe(3);
    });
  });

  describe(`GET article by id`, () => {
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

  describe(`GET comments by article id`, () => {
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

  describe(`GET comment by id`, () => {
    beforeEach(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {body: comments} = await request(server).get(`/api/articles/${validArticleId}/comments/`);
      validCommentId = (comments as ArticleComment[])[0].id;
    });
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return valid structure`, async () => {
      const res = await request(server).get(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      const responseKeys = Object.keys(res.body as Article);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`text`);
    });
  });

  describe(`POST Create comment`, () => {
    test(`Should return code 400 when pass invalid content`, async () => {
      const res = await request(server).post(`/api/articles/${validArticleId}/comments/`).send(invalidNewComment);
      expect(res.status).toBe(400);
    });
    test(`Should return code 201 when pass valid params`, async () => {
      const res = await request(server).post(`/api/articles/${validArticleId}/comments/`).send(validNewComment);
      expect(res.status).toBe(201);
    });
  });

  describe(`DELETE comment by id`, () => {
    beforeAll(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {body: comments} = await request(server).get(`/api/articles/${validArticleId}/comments/`);
      validCommentId = (comments as ArticleComment[])[0].id;
    });
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(server).delete(`/api/articles/${validArticleId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(server).delete(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
    });
  });

  describe(`POST Create new article`, () => {
    test(`Should return code 400 when pass invalid article params`, async () => {
      const res = await request(server).post(`/api/articles/`).send(invalidNewArticle);
      expect(res.status).toBe(400);
    });

    test(`Should return code 201 when pass valid article params`, async () => {
      const res = await request(server).post(`/api/articles/`).send(validNewArticle);
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

  describe(`DELETE existing article`, () => {
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
