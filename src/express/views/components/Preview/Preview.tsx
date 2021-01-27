import React, {FunctionComponent} from "react";
import {IAnnounce, ICategoriesWithLinks, ICommentsCount, ICreatedDate, ILink, ITitle} from "../../../../types/article";

interface PreviewProps extends ICommentsCount, ITitle, IAnnounce, ICreatedDate, ILink, ICategoriesWithLinks {}

export const Preview: FunctionComponent<PreviewProps> = ({
  categories,
  createdDate,
  title,
  announce,
  commentsCount,
  link,
}) => {
  const categoriesList = categories.map(categoryItem => (
    <li className="preview__breadcrumbs-item" key={categoryItem.id}>
      <a className="preview__breadcrumbs-link" href={categoryItem.link}>
        {categoryItem.label}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="preview__breadcrumbs" style={{flexWrap: "wrap"}}>
        {categoriesList}
      </ul>
      {/*TODO: show picture*/}
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
      <time className="preview__time" dateTime={createdDate.toISOString()}>
        {createdDate.toLocaleString()}
      </time>
      <h3 className="preview__name">
        <a className="preview__name-link" href={link}>
          {title}
        </a>
      </h3>
      <p className="preview__text">{announce}</p>
      <a className="preview__comment" href="#">
        Комментарии <span className="preview__cloud" />
        <b className="preview__comment-count">{commentsCount}</b>
      </a>
    </>
  );
};
