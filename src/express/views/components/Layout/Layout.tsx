import React, {FunctionComponent, ReactNode} from "react";

import {IPageTitle} from "../../../../types/interfaces/page-title";

type WrapperMode = "default" | "admin" | "error";

interface LayoutProps extends IPageTitle {
  wrapperMode?: WrapperMode;
  header: ReactNode;
  footer: ReactNode;
}

const wrapperCssClasses: {[key in WrapperMode]: string} = {
  default: "wrapper",
  admin: "wrapper wrapper--nobackground",
  error: "wrapper-color",
};

const Layout: FunctionComponent<LayoutProps> = ({wrapperMode, header, children, footer, pageTitle}) => (
  <html lang="ru">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content="Личный блог Типотека" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{pageTitle ? `${pageTitle} | Типотека` : `Типотека`}</title>
      <link href="/fonts/Inter-Regular.woff2" as="font" crossOrigin="anonymous" />
      <link href="/fonts/Inter-Medium.woff2" as="font" crossOrigin="anonymous" />
      <link href="/fonts/SFProDisplay-Regular.woff2" as="font" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/css/fabric.min.css" />
      <link rel="stylesheet" href="/css/style.min.css" />
      <link rel="stylesheet" href="/css/custom.css" />
      <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png" />
      <link rel="manifest" href="img/favicon/site.webmanifest" />
      <base href="/" />
    </head>

    <body>
      <div className={wrapperCssClasses[wrapperMode ?? "default"]}>
        {header}
        {children}
        {footer}
      </div>
      <script src="js/vendor.js" />
      <script src="js/main.js" />
    </body>
  </html>
);

export {
  Layout,
  LayoutProps,
};
