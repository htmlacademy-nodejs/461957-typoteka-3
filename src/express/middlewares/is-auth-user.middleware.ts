import {NextFunction, Request} from "express";

import {RoleId} from "../../shared/constants/role-id";
import {ClientRoute} from "../../shared/constants/routes/client-route";
import {IResponseExtended} from "../../types/interfaces/response-extended";

function isAuthorUserMiddleware(req: Request, res: IResponseExtended, next: NextFunction): void {
  if (res?.locals?.currentUser?.roleId === RoleId.AUTHOR || res?.locals?.currentUser?.roleId === RoleId.ADMIN) {
    next();
    return;
  }
  res.redirect(ClientRoute.INDEX);
  return;
}

export {
  isAuthorUserMiddleware,
};
