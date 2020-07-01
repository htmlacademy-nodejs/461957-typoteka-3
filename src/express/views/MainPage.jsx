import React from "react";
import {LayoutFilled} from "./components/Layout/LayoutFilled";
import {Greeting} from "./components/Greeting/Greeting";
import {ThemeList} from "./components/ThemeList/ThemeList";

export default function MainPage(props) {
  const themes = [
    {
      title: `Title`,
      count: `5`,
      link: `#`,
    },
    {
      title: `Title`,
      count: `5`,
      link: `#`,
    },
    {
      title: `Title`,
      count: `5`,
      link: `#`,
    },
    {
      title: `Title`,
      count: `5`,
      link: `#`,
    },
    {
      title: `Title`,
      count: `5`,
      link: `#`,
    },
  ];

  return (
    <LayoutFilled>
      <main className="main-page">
        <Greeting />
        <ThemeList themes={themes} />
      </main>
    </LayoutFilled>
  );
}
