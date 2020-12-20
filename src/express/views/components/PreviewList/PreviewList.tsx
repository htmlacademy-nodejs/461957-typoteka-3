import React, {FunctionComponent} from "react";
import {Preview} from "../Preview/Preview";
import type {Article} from "../../../../types/article";
import type {CategoryId} from "../../../../types/category-id";
import {CategoryWithLink} from "../../../../types/category-with-link";

interface HasId {
  id: string;
}

interface PreviewListProps {
  previews: Article[];
  categories: CategoryWithLink[];
}

export const PreviewList: FunctionComponent<PreviewListProps> = ({categories, previews}) => {
  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">
        {previews.map(preview => (
          <li className="preview__item" key={preview.id}>
            <Preview
              announce={preview.announce}
              selectedCategories={resolveCategoriesLabels(preview.category, categories)}
              comments={preview.comments}
              createdDate={preview.createdDate}
              title={preview.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

function resolveCategoriesLabels<T extends HasId>(selectedCategories: CategoryId[], availableCategories: T[]): T[] {
  return availableCategories.filter(category => selectedCategories.includes(category.id));
}
