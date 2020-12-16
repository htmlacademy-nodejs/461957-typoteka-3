import React, {FunctionComponent} from "react";
import type {ArticleComment} from "../../../../types/article-comment";
import type {Category} from "../../../../types/category";

interface PreviewProps {
  comments: ArticleComment[];
  title: string;
  announce: string;
  createdDate: Date;
  selectedCategories: Category[];
}

export const Preview: FunctionComponent<PreviewProps> = ({
  selectedCategories,
  createdDate,
  title,
  announce,
  comments,
}) => {
  const categories = selectedCategories.map(categoryItem => (
    <li className="preview__breadcrumbs-item" key={categoryItem.id}>
      <a className="preview__breadcrumbs-link" href="#">
        {categoryItem.label}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="preview__breadcrumbs" style={{flexWrap: "wrap"}}>
        {categories}
      </ul>
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
        Комментарии <span className="preview__cloud"></span>
        <b className="preview__comment-count">{comments.length}</b>
      </a>
    </>
  );
};
