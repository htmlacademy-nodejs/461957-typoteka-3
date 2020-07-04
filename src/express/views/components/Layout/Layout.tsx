import React, {FunctionComponent, ReactNode} from "react";

type WrapperMode = "default" | "admin" | "error";

export interface LayoutProps {
  wrapperMode?: WrapperMode;
  header: ReactNode;
  footer: ReactNode;
}

const wrapperCssClasses: {[key in WrapperMode]: string} = {
  default: "wrapper",
  admin: "wrapper wrapper--nobackground",
  error: "wrapper-color",
};

export const Layout: FunctionComponent<LayoutProps> = ({wrapperMode, header, children, footer}) => (
  <html lang="ru">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="Description" content="Личный блог Типотека" />
      <title>Типотека</title>
      <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/Inter-Medium.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/SFProDisplay-Regular.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/css/style.min.css" />
      <base href="/" />
    </head>

    <body>
      <div className={wrapperCssClasses[wrapperMode ?? "default"]}>
        {header}
        {children}
        {footer}
      </div>
    </body>
  </html>
);
