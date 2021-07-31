import React, {FunctionComponent} from "react";

import {IAnnounce, ICategoriesWithLinks, ICommentsCount, ICreatedDate, ILink, ITitle} from "../../../../types/article";
import {IImageSrc} from "../../../../types/interfaces/image-src";

interface PreviewProps
  extends ICommentsCount,
    ITitle,
    IAnnounce,
    ICreatedDate,
    ILink,
    ICategoriesWithLinks,
    IImageSrc {}

const Preview: FunctionComponent<PreviewProps> = ({
  categories,
  createdDate,
  title,
  announce,
  commentsCount,
  link,
  imageSrc,
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
      {imageSrc ? (
        <div className="preview__background">
          <img className="preview__background-image" src={imageSrc} width="460" height="240" alt="Обложка статьи" />
        </div>
      ) : null}
      <time className="preview__time" dateTime={createdDate.toISOString()}>
        {createdDate.toLocaleString()}
      </time>
      <h3 className="preview__name">
        <a className="preview__name-link" href={link}>
          {title}
        </a>
      </h3>
      <p className="preview__text">{announce}</p>
      <a className="preview__comment" href={link + "#comments"}>
        Комментарии <span className="preview__cloud" />
        <b className="preview__comment-count">{commentsCount}</b>
      </a>
    </>
  );
};

export {Preview};
