import {agent as request} from "supertest";
import {Application} from "express";
import * as http from "http";
import {Article, IArticleId, ICommentsCount} from "../../../types/article";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {ArticleId} from "../../../types/article-id";
import {initApp} from "./tests-boilerplate/init-app";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {ICommentCreating} from "../../../types/interfaces/comment-creating";

let validArticleId: ArticleId;
let articleWithCommentsId: ArticleId;
const invalidArticleId = `999999999999999999999999999999999999`;
let validCommentId: CommentId;
const invalidCommentId = `-1`;
const validNewArticle: IArticleCreating = {
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.  1938 году.`,
  categories: [{id: 1}, {id: 3}],
  createdDate: new Date(Date.now()),
  fullText: `Освоить вёрстку несложно.`,
  title: `Как собрать камни бесконечности`,
};
const invalidNewArticle = {...validNewArticle, categories: 10};
const validNewComment: ICommentCreating = {
  text: `Comment234234234234234`,
  createdDate: new Date(),
  articleId: 1,
};
const invalidNewComment = {
  text: `Comment234234234234234`,
};

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
    articleWithCommentsId = findIdOfArticleWithComments(articles as (IArticleId & ICommentsCount)[]);
  });
  afterEach(() => {
    httpServer.close();
  });

  describe(`GET articles`, () => {
    test(`Should return code 200 when request articles`, async () => {
      const res = await request(app).get(`/api/articles/?count=100`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(app).get(`/api/articles/?count=100`);
      expect(Array.isArray(res.body.items)).toBe(true);
    });
    test(`Should return an array given length`, async () => {
      const res = await request(app).get(`/api/articles/?limit=3`);
      console.log(`res.body`, res.body);
      expect(res.body.items.length).toBe(3);
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

  describe(`GET comments by article id`, () => {
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(app).get(`/api/articles/${validArticleId}/comments/`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(app).get(`/api/articles/${validArticleId}/comments/`);
      expect(Array.isArray(res.body)).toBe(true);
    });
    test(`Should return an empty array when request invalid id`, async () => {
      const res = await request(app).get(`/api/articles/${invalidArticleId}/comments/`);
      expect(res.body.length).toBe(0);
    });
  });

  describe(`GET comment by id`, () => {
    beforeEach(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {body: comments} = await request(app).get(`/api/articles/${articleWithCommentsId}/comments/`);
      validCommentId = (comments as ArticleComment[])[0].id;
    });
    test(`Should return code 404 when request invalid id`, async () => {
      const res = await request(app).get(`/api/articles/${articleWithCommentsId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when request valid id`, async () => {
      const res = await request(app).get(`/api/articles/${articleWithCommentsId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
    });
    test(`Should return valid structure`, async () => {
      const res = await request(app).get(`/api/articles/${articleWithCommentsId}/comments/${validCommentId}`);
      const responseKeys = Object.keys(res.body as Article);
      expect(responseKeys).toContain(`id`);
      expect(responseKeys).toContain(`text`);
    });
  });

  describe(`POST Create comment`, () => {
    test(`Should return code 400 when pass invalid content`, async () => {
      const res = await request(app).post(`/api/articles/${validArticleId}/comments/`).send(invalidNewComment);
      expect(res.status).toBe(400);
    });
    test(`Should return code 201 when pass valid params`, async () => {
      const res = await request(app).post(`/api/articles/${validArticleId}/comments/`).send(validNewComment);
      expect(res.status).toBe(201);
    });
  });

  describe(`DELETE comment by id`, () => {
    beforeAll(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {body: comments} = await request(app).get(`/api/articles/${validArticleId}/comments/`);
      validCommentId = (comments as ArticleComment[])[0].id;
    });
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(app).delete(`/api/articles/${validArticleId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });
    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(app).delete(`/api/articles/${validArticleId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
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

function findIdOfArticleWithComments(articles: (ICommentsCount & IArticleId)[]): ArticleId {
  return articles.find(article => article.commentsCount)?.id;
}
