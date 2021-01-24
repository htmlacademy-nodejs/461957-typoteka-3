import React, {FunctionComponent} from "react";
import {CategoryWithLink} from "../../../../types/category-with-link";
import {IAnnounce, ICommentsCount, ICreatedDate, ITitle} from "../../../../types/article";

interface PreviewProps extends ICommentsCount, ITitle, IAnnounce, ICreatedDate {
  selectedCategories: CategoryWithLink[];
}

export const Preview: FunctionComponent<PreviewProps> = ({
  selectedCategories,
  createdDate,
  title,
  announce,
  commentsCount,
}) => {
  const categories = selectedCategories.map(categoryItem => (
    <li className="preview__breadcrumbs-item" key={categoryItem.id}>
      <a className="preview__breadcrumbs-link" href={categoryItem.link}>
        {categoryItem.label}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="preview__breadcrumbs" style={{flexWrap: "wrap"}}>
        {categories}
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
        <a className="preview__name-link" href="#">
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
