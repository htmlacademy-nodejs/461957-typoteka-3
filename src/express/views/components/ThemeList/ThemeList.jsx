import React from "react";
import {Theme} from "../Theme/Theme";
import PropTypes from "prop-types";

export function ThemeList(props) {
  const themes = props.themes.map(theme => (
    <li className="themes__item" key={theme.title}>
      <Theme title={theme.title} count={theme.count} link={theme.link}/>
    </li>
  ));
  return (
    <section className="main-page__theme-list">
      <h2 className="visually-hidden">Список тем</h2>
      <ul className="themes">{themes}</ul>
    </section>
  );
}

ThemeList.propTypes = {
  themes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ),
};
