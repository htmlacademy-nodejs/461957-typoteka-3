/* eslint-disable max-nested-callbacks */
import * as http from "http";

import {Application} from "express";
import {agent as request} from "supertest";

import {Article} from "../../../types/article";
import {ArticleId} from "../../../types/article-id";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {IArticleAnnounceAndCommentsCount} from "../../../types/interfaces/article-announce-and-comments-count";
import {IArticleTitleAndDate} from "../../../types/interfaces/article-title-and-date";
import {ICollection} from "../../../types/interfaces/collection";
import {IUserPreview} from "../../../types/interfaces/user-preview";

import {getAccessToken} from "./tests-boilerplate/get-access-token";
import {getUserByAccessToken} from "./tests-boilerplate/get-user-by-access-token";
import {initApp} from "./tests-boilerplate/init-app";
import {resolveAuthHeader} from "./tests-boilerplate/resolve-auth-header";

let validArticleId: ArticleId;
const invalidArticleId = `999999999999999999999999999999999999`;
const validNewArticle: IArticleCreating = {
  announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.  1938 году.`,
  categories: [{id: 1}, {id: 3}],
  createdDate: new Date(Date.now()),
  fullText: `Освоить вёрстку несложно.`,
  title: `Как собрать камни бесконечности`,
  authorId: 2,
  pictureName: null,
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
      expect((res.body as ICollection<any>).items.length).toBe(3);
    });
  });
  describe(`GET articles by author id`, () => {
    let accessToken: string;
    let currentUser: IUserPreview;
    beforeAll(async () => {
      accessToken = await getAccessToken(app);
      currentUser = await getUserByAccessToken(app, accessToken);
    });

    test(`Should return code 200 when request articles`, async () => {
      const res = await request(app).get(`/api/articles/author/${currentUser.id}`).set(resolveAuthHeader(accessToken));
      expect(res.status).toBe(200);
    });

    test(`Should return the list of articles created by given user`, async () => {
      const articlesCount = 3;
      const availableTitles = new Array(articlesCount)
        .fill(undefined)
        .map((item, index) => `[${index}] New article title for tests`);
      await Promise.all([
        new Array(articlesCount).fill(0).map(async (_, index) => {
          const extendedArticle: IArticleCreating = {
            ...validNewArticle,
            authorId: currentUser.id,
            title: availableTitles[index],
          };
          return request(app).post(`/api/articles/`).set(resolveAuthHeader(accessToken)).send(extendedArticle);
        }),
      ]);

      const res = await request(app).get(`/api/articles/author/${currentUser.id}`).set(resolveAuthHeader(accessToken));
      const responseBody = res.body as ICollection<IArticleTitleAndDate>;
      expect(responseBody.totalCount).toBe(articlesCount);
      expect(responseBody.items.every(({title}) => availableTitles.includes(title))).toBeTruthy();
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
    let accessToken: string;
    beforeAll(async () => {
      accessToken = await getAccessToken(app);
    });
    test(`Should return code 400 when pass invalid article params`, async () => {
      const res = await request(app).post(`/api/articles/`).set(resolveAuthHeader(accessToken)).send(invalidNewArticle);
      expect(res.status).toBe(400);
    });

    test(`Should return code 201 when pass valid article params`, async () => {
      const res = await request(app).post(`/api/articles/`).set(resolveAuthHeader(accessToken)).send(validNewArticle);
      expect(res.status).toBe(201);
    });
  });

  describe(`PUT Update existing article`, () => {
    let accessToken: string;
    beforeAll(async () => {
      accessToken = await getAccessToken(app);
    });
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(app)
        .put(`/api/articles/${invalidArticleId}`)
        .set(resolveAuthHeader(accessToken))
        .send(validNewArticle);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(app)
        .put(`/api/articles/${validArticleId}`)
        .set(resolveAuthHeader(accessToken))
        .send(validNewArticle);
      expect(res.status).toBe(200);
    });
  });

  describe(`DELETE existing article`, () => {
    let accessToken: string;
    beforeAll(async () => {
      accessToken = await getAccessToken(app);
    });
    test(`Should return code 404 when pass invalid id`, async () => {
      const res = await request(app)
        .delete(`/api/articles/${invalidArticleId}`)
        .set(resolveAuthHeader(accessToken))
        .send();
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when pass valid id`, async () => {
      const res = await request(app)
        .delete(`/api/articles/${validArticleId}`)
        .set(resolveAuthHeader(accessToken))
        .send();
      expect(res.status).toBe(200);
    });
  });

  describe(`GET the most discussed articles`, () => {
    test(`Should return code 200`, async () => {
      const res = await request(app).get(`/api/articles/discussed`);
      expect(res.status).toBe(200);
    });
    test(`Should return an array`, async () => {
      const res = await request(app).get(`/api/articles/discussed`);
      expect(Array.isArray(res.body)).toBe(true);
    });
    test(`Should return an array of default length`, async () => {
      const res = await request(app).get(`/api/articles/discussed`);
      const comments = res.body as IArticleAnnounceAndCommentsCount[];
      expect(comments.length).toBe(4);
    });
    test(`Should return an array of given length`, async () => {
      const res = await request(app).get(`/api/articles/discussed?limit=7`);
      const comments = res.body as IArticleAnnounceAndCommentsCount[];
      expect(comments.length).toBe(7);
    });
    test(`If pass huge limit should return an array of max length`, async () => {
      const res = await request(app).get(`/api/articles/discussed?limit=99`);
      const comments = res.body as IArticleAnnounceAndCommentsCount[];
      expect(comments.length).toBeLessThanOrEqual(20);
    });

    test(`Should contains defined fields`, async () => {
      const res = await request(app).get(`/api/articles/discussed`);
      const comments = res.body as IArticleAnnounceAndCommentsCount[];
      comments.every(comment => {
        expect(comment.hasOwnProperty(`id`)).toBeTruthy();
        expect(comment.hasOwnProperty(`announce`)).toBeTruthy();
        expect(comment.hasOwnProperty(`commentsCount`)).toBeTruthy();
      });
    });

    test(`Should be sorted from the most discussed`, async () => {
      const res = await request(app).get(`/api/articles/discussed`);
      const comments = res.body as IArticleAnnounceAndCommentsCount[];
      comments.forEach((comment, index, array) => {
        if (index) {
          expect(comment.commentsCount).toBeLessThanOrEqual(array[index - 1].commentsCount);
        }
      });
    });
  });
});
