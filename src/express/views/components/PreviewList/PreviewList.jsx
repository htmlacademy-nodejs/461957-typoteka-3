import React from "react";
import PropTypes from "prop-types";
import {Preview} from "../Preview/Preview";

export function PreviewList(props) {
  const previews = props.previews.map(preview => (
    <li className="preview__item" key={preview.text}>
      <Preview
        categories={preview.categories}
        date={preview.date}
        title={preview.title}
        text={preview.text}
        link={preview.link}
        commentsCount={preview.commentsCount}
        commentsLink={preview.commentsLink}
        imageFileName={preview.imageFileName}
        imageAlt={preview.imageAlt}
      />
    </li>
  ));

  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">{previews}</ul>
    </section>
  );
}

PreviewList.propTypes = {
  previews: PropTypes.arrayOf(
    PropTypes.shape({
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
        }),
      ),
      date: PropTypes.instanceOf(Date).isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      commentsCount: PropTypes.number.isRequired,
      commentsLink: PropTypes.string.isRequired,
      imageFileName: PropTypes.string,
      imageAlt: PropTypes.string,
    }),
  ),
};
