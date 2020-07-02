import React from "react";
import {LayoutFilled} from "./components/Layout/LayoutFilled";
import {Greeting} from "./components/Greeting/Greeting";
import {ThemeList} from "./components/ThemeList/ThemeList";
import {HotList} from "./components/HotList/HotList";
import {LastList} from "./components/LastList/LastList";
import {PreviewList} from "./components/PreviewList/PreviewList";

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
  const lastList = [
    {
      title: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году`,
      link: `#`,
      authorName: `Анна Артамонова`,
      authorAvatar: `img/avatar-small-1.png`,
    },
    {
      title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
      link: `#`,
      authorName: `Александр Петров`,
      authorAvatar: `img/avatar-small-2.png`,
    },
    {
      title: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
      link: `#`,
      authorName: `Игорь Шманский`,
      authorAvatar: `img/avatar-small-3.png`,
    },
  ];
  const previews = [
    {
      categories: [
        {
          title: "Дизайн",
          link: "#",
        },
      ],
      date: new Date(),
      title: "Я ничего не понял",
      text:
        "Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.",
      link: "#",
      commentsCount: "12",
      commentsLink: "#",
      imageFileName: "skyscraper",
      imageAlt: "Фотография небоскреба",
    },
  ];

  return (
    <LayoutFilled>
      <main className="main-page">
        <Greeting />
        <ThemeList themes={themes} />
        <div className="main-page__section-flex">
          <HotList hotList={hotList} />
          <LastList lastList={lastList} />
        </div>
        <PreviewList previews={previews} />
      </main>
    </LayoutFilled>
  );
}
