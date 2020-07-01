import React from "react";

export function Layout(props) {
  return (
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
        <div className="wrapper">
          {props.header}
          {props.main}
          {props.footer}
        </div>
      </body>
    </html>
  );
}
