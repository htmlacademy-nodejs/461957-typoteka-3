import React from "react";
import {LayoutFilled} from "./components/Layout/LayoutFilled";
import {Greeting} from "./components/Greeting/Greeting";
import {ThemeList} from "./components/ThemeList/ThemeList";
import {HotList} from "./components/HotList/HotList";

export default function MainPage(props) {
  const themes = [
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
    {
      title: `Title`,
      count: 5,
      link: `#`,
    },
  ];

  const hotList = [
    {
      title: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
      count: 12,
      link: `#`,
    },
    {
      title: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
      count: 153,
      link: `#`,
    },
  ];

  return (
    <LayoutFilled>
      <main className="main-page">
        <Greeting />
        <ThemeList themes={themes} />
        <div className="main-page__section-flex">
          <HotList hotList={hotList} />
        </div>
      </main>
    </LayoutFilled>
  );
}
