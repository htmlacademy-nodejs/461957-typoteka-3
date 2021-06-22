import {NextFunction, Response} from "express";
import {RequestExtended} from "../../models/types/request-extended";
import {verifyAccessToken} from "../auth/verify-access-token";
import {Context} from "../../models/context";
import {getLogger} from "../../logger";

export async function authMiddleware(req: RequestExtended, res: Response, next: NextFunction): Promise<void> {
  const logger = getLogger();
  const accessToken = req.headers[`authorization`];
  try {
    const user = await verifyAccessToken(accessToken);
    if (!req.context) {
      req.context = new Context();
    }
    req.context.user = user;
    logger.debug(`Valid access token`);
    next();
  } catch (e) {
    logger.debug(`Failed to verify access token, ${e as number}`);
    res.status(e).send();
  }
}
