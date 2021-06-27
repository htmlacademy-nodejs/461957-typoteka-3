import {Response} from "express";
import React, {FunctionComponent, PropsWithChildren} from "react";
import ReactDOMServer from "react-dom/server";
import {initializeIcons, ThemeProvider} from "@fluentui/react";
import {renderStatic} from "@fluentui/merge-styles/lib-commonjs/server";

initializeIcons();

export function streamPage<T>(res: Response, page: FunctionComponent<T>, props?: PropsWithChildren<T>): void {
  const app = constructApp(page, props);
  const {html, css} = resolveHtmlAndCss(app);
  const document = addCssToHtml(addDoctypeToHtml(html), css);
  res.send(document);
}

function constructApp<T>(page: FunctionComponent<T>, props: PropsWithChildren<T>): JSX.Element {
  return <ThemeProvider>{React.createElement(page, props)}</ThemeProvider>;
}

function resolveHtmlAndCss(app: JSX.Element): {html: string; css: string} {
  const {html, css} = renderStatic(() => ReactDOMServer.renderToString(app));
  return {html, css};
}

function addDoctypeToHtml(html: string): string {
  return `<!DOCTYPE html>` + html;
}

function addCssToHtml(html: string, css: string): string {
  const cssTag = createStyleTag(css);
  return html.replace(`</html>`, `${cssTag}</html>`);
}

function createStyleTag(css: string): string {
  return `<style>` + css + `</style>`;
}
