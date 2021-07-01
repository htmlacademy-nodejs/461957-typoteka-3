import {Request} from "express";

import {IPaginationOptions} from "../../../../types/interfaces/pagination-options";

function getPaginationFromReqQuery(req: Request): IPaginationOptions {
  const rawLimit = parseInt(req.query?.limit as string, 10);
  const rawOffset = parseInt(req.query?.offset as string, 10);
  const limit = isNaN(rawLimit) ? undefined : rawLimit;
  const offset = isNaN(rawOffset) ? undefined : rawOffset;
  return {limit, offset};
}

export {
  getPaginationFromReqQuery,
};
