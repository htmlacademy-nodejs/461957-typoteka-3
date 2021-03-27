import {NextFunction, Request} from "express";
import {RoleId} from "../../shared/constants/role-id";
import {ClientRoutes} from "../../constants-es6";
import {IResponseExtended} from "../../types/interfaces/response-extended";

export function isAuthorUserMiddleware(req: Request, res: IResponseExtended, next: NextFunction): void {
  if (res?.locals?.currentUser?.roleId === RoleId.AUTHOR || res?.locals?.currentUser?.roleId === RoleId.ADMIN) {
    next();
    return;
  }
  res.redirect(ClientRoutes.INDEX);
  return;
}
