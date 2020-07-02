import React from "react";
import PropTypes from "prop-types";

export function Preview(props) {
  const categories = props.categories.map(category => (
    <li className="preview__breadcrumbs-item" key={category.link}>
      <a className="preview__breadcrumbs-link" href={category.link}>
        {category.title}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="preview__breadcrumbs">{categories}</ul>
      {props.imageFileName && (
        <div className="preview__background">
          <img
            className="preview__background-image"
            src={`img/${props.imageFileName}@1x.jpg`}
            width="460"
            height="240"
            srcSet={`img/${props.imageFileName}@1x.jpg 1x, img/${props.imageFileName}@2x.jpg 2x`}
            alt={props.imageAlt}
          />
        </div>
      )}
      <time className="preview__time" dateTime={props.date.toISOString()}>
        {props.date.toLocaleString()}
      </time>
      <h3 className="preview__name">
        <a className="preview__name-link" href={props.commentsLink}>
          {props.title}
        </a>
      </h3>
      <p className="preview__text">{props.text}</p>
      <a className="preview__comment" href={props.commentsLink}>
        Комментарии <span className="preview__cloud"></span>
        <b className="preview__comment-count">{props.commentsCount}</b>
      </a>
    </>
  );
}

Preview.PropTypes = {
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
};
