import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {SearchResult, SearchResultProps} from "../components/SearchResult/SearchResult";

export interface SearchPageProps {
  query?: string;
  matches?: SearchResultProps[];
  itemsCount?: number;
}

export const SearchPage: FunctionComponent<SearchPageProps> = ({query, matches = [], itemsCount}) => {
  const isEmpty = query && itemsCount === 0;

  return (
    <LayoutFilled>
      <main>
        <section className="search-page">
          <div className={"search-page__wrapper" + (isEmpty ? " search-page__wrapper--empty" : "")}>
            <h1>Поиск</h1>
            <div className="search search-page__form">
              <form action="#" method="get">
                <label>
                  <input type="text" placeholder="Что ищем?" defaultValue={query} />
                </label>
                <button className="search__button button button--transparent" type="submit">
                  Найти
                </button>
              </form>
              {matches.map(match => (
                <SearchResult
                  key={match.text}
                  date={match.date}
                  text={match.text}
                  match={match.match}
                  link={match.link}
                />
              ))}
            </div>
            {isEmpty && <p className="search-page__empty">Ничего не нашлось</p>}
          </div>
        </section>
      </main>
    </LayoutFilled>
  );
};
