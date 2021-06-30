import {Request} from "express";

import {PAGE_QUERY_PARAM, PAGE_SIZE} from "../../constants";

function getPagesCount(total: number): number {
  return Math.ceil(total / PAGE_SIZE);
}

function getCurrentPage(offset: number): number {
  return Math.ceil((offset + 1) / PAGE_SIZE);
}

function getOffsetFromPage(page: number): number {
  if (!page) {
    return 0;
  }
  return (page - 1) * PAGE_SIZE;
}

function getPageFromReqQuery(req: Request): number {
  const rawPage = parseInt(req.query[PAGE_QUERY_PARAM] as string, 10);
  return isNaN(rawPage) ? 0 : rawPage;
}

export {
  getCurrentPage,
  getOffsetFromPage,
  getPageFromReqQuery,
  getPagesCount,
};
