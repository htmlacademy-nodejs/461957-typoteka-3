import {NextFunction, Request, Response} from "express";

export function categoriesToArrayMiddleware(req: Request, res: Response, next: NextFunction): void {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  if (req?.body?.category) {
    req.body.category = Object.entries(req.body.category).reduce((accumulator, [categoryId, state]) => {
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      accumulator.push(categoryId);
      return accumulator;
    }, [] as string[]);
  }
  next();
}
