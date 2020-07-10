import {Response} from "express";
import React, {FunctionComponent, PropsWithChildren} from "react";
import ReactDOMServer from "react-dom/server";

export function streamPage<T>(res: Response, page: FunctionComponent<T>, props: PropsWithChildren<T>): void {
  res.write(`<!DOCTYPE html>`);
  ReactDOMServer.renderToStaticNodeStream(React.createElement(page, props)).pipe(res);
}
