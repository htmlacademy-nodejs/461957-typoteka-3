import {Application} from "express";
import http from "http";
import {agent as request} from "supertest";

import {ArticleSearchCollection} from "../../../types/article-search-collection";
import {ICollection} from "../../../types/interfaces/collection";

import {initApp} from "./tests-boilerplate/init-app";

describe(`Search router`, () => {
  let app: Application;
  let httpServer: http.Server;
  beforeAll(async () => {
    ({server: app, httpServer} = await initApp());
  });
  afterAll(() => {
    httpServer.close();
  });

  describe(`get()`, () => {
    test(`Should return code 200 when pass query string`, async () => {
      const res = await request(app).get(`/api/search?query=test-query-string`);
      expect(res.status).toBe(200);
    });
    test(`Should return code 200 when pass empty query string`, async () => {
      const res = await request(app).get(`/api/search?query=`);
      expect(res.status).toBe(200);
    });
    test(`Should return code 400 when don't pass query param`, async () => {
      const res = await request(app).get(`/api/search`);
      expect(res.status).toBe(400);
    });
    test(`Should return array when pass query string`, async () => {
      const res = await request(app).get(`/api/search?query=%D1%84`);
      expect(Array.isArray((res.body as ICollection<any>).items)).toBe(true);
    });
    test(`Should return empty array when pass empty query string`, async () => {
      const res = await request(app).get(`/api/search?query=`);
      expect((res.body as ArticleSearchCollection).items.length).toBe(0);
    });
  });
});
