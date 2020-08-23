import React from "react";
import {Article} from "../../../../types/article";

interface Props extends Partial<Article> {}

export function Preview(props: Props): JSX.Element {
  const categories = props.category.map(categoryItem => (
    <li className="preview__breadcrumbs-item" key={categoryItem.id}>
      <a className="preview__breadcrumbs-link" href="#">
        {categoryItem.label}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="preview__breadcrumbs">{categories}</ul>
      {false && (
        <div className="preview__background">
          <img
            className="preview__background-image"
            src={`img/@1x.jpg`}
            width="460"
            height="240"
            srcSet={`img/@1x.jpg 1x, img/@2x.jpg 2x`}
            alt=""
          />
        </div>
      )}
      <time className="preview__time" dateTime={props.createdDate.toISOString()}>
        {props.createdDate.toLocaleString()}
      </time>
      <h3 className="preview__name">
        <a className="preview__name-link" href="#">
          {props.title}
        </a>
      </h3>
      <p className="preview__text">{props.announce}</p>
      <a className="preview__comment" href="#">
        Комментарии <span className="preview__cloud"></span>
        <b className="preview__comment-count">{props.comments.length}</b>
      </a>
    </>
  );
}
