import React, {FunctionComponent} from "react";

import {
  IAnnounce,
  IArticleId,
  ICategories,
  ICommentsCount,
  ICreatedDate,
  ILink,
  ITitle,
} from "../../../../types/article";
import {CategoryWithLink} from "../../../../types/category-with-link";
import {Preview} from "../preview/preview";

interface PreviewListProps {
  previews: (ICommentsCount & ITitle & IAnnounce & ICreatedDate & ILink & ICategories & IArticleId)[];
  categories: CategoryWithLink[];
}

const PreviewList: FunctionComponent<PreviewListProps> = ({categories, previews, children}) => {
  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">
        {previews.map(preview => (
          <li className="preview__item" key={preview.id}>
            <Preview
              announce={preview.announce}
              categories={resolveCategoriesLabels(categories, preview.categories)}
              commentsCount={preview.commentsCount}
              createdDate={preview.createdDate}
              title={preview.title}
              link={preview.link}
            />
          </li>
        ))}
      </ul>
      <div className="preview__toggle-wrapper">{children}</div>
    </section>
  );
};

function resolveCategoriesLabels<T extends IArticleId & ILink, J extends IArticleId>(
  availableCategories: T[],
  selectedCategories: J[],
): T[] {
  return availableCategories.filter(category => selectedCategories.map(item => item.id).includes(category.id));
}

export {PreviewList};
