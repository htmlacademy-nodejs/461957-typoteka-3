import React, {FunctionComponent} from "react";
import {Preview} from "../Preview/Preview";
import {CategoryWithLink} from "../../../../types/category-with-link";
import {IArticlePreview} from "../../../../types/interfaces/article-preview";

interface IHasId {
  id: number;
}

interface IHasLink {
  link: string;
}

interface PreviewListProps {
  previews: IArticlePreview[];
  categories: CategoryWithLink[];
}

export const PreviewList: FunctionComponent<PreviewListProps> = ({categories, previews, children}) => {
  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">
        {previews.map(preview => (
          <li className="preview__item" key={preview.id}>
            <Preview
              announce={preview.announce}
              selectedCategories={resolveCategoriesLabels(categories, preview.categories)}
              commentsCount={preview.commentsCount}
              createdDate={preview.createdDate}
              title={preview.title}
            />
          </li>
        ))}
      </ul>
      <div className="preview__toggle-wrapper">{children}</div>
    </section>
  );
};

function resolveCategoriesLabels<T extends IHasId & IHasLink, J extends IHasId>(
  availableCategories: T[],
  selectedCategories: J[],
): T[] {
  return availableCategories.filter(category => selectedCategories.map(item => item.id).includes(category.id));
}
