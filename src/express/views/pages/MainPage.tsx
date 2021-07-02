import React, {FunctionComponent} from "react";

import {ILink} from "../../../types/article";
import {CategoryWithLink} from "../../../types/category-with-link";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {Greeting} from "../components/Greeting/Greeting";
import {HotList} from "../components/HotList/HotList";
import {LastList} from "../components/LastList/LastList";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {IPaginationProps, PaginationController} from "../components/Pagination/PaginationController";
import {PreviewList} from "../components/PreviewList/PreviewList";
import {ICurrentUser} from "../interfaces/current-user";

interface MainPageProps extends IPaginationProps, ICurrentUser {
  articles?: (IArticlePreview & ILink)[];
  categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[];
  categoriesWithLinks: CategoryWithLink[];
  prefix: string;
}

const MainPage: FunctionComponent<MainPageProps> = ({
  articles,
  categoriesWithLinksAndNumbers,
  categoriesWithLinks,
  page,
  total,
  prefix,
  currentUser,
}) => {
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
      authorAvatar: `🦡`,
    },
    {
      title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
      link: `#`,
      authorName: `Александр Петров`,
      authorAvatar: `🐻`,
    },
    {
      title: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
      link: `#`,
      authorName: `Игорь Шманский`,
      authorAvatar: `🦇`,
    },
  ];

  return (
    <LayoutFilled currentUser={currentUser}>
      <main className="main-page">
        <Greeting />
        <section className="main-page__theme-list">
          <h2 className="visually-hidden">Список тем</h2>
          <ul className="themes">
            <CategoriesList categories={categoriesWithLinksAndNumbers} />
          </ul>
        </section>
        <div className="main-page__section-flex">
          <HotList listOfHot={hotList} />
          <LastList listOfLast={lastList} />
        </div>
        <PreviewList previews={articles} categories={categoriesWithLinks}>
          <PaginationController page={page} total={total} prefix={prefix} />
        </PreviewList>
      </main>
    </LayoutFilled>
  );
};

export {MainPage};
