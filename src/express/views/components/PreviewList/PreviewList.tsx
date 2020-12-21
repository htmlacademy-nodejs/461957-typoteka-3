import React, {FunctionComponent} from "react";
import {Preview} from "../Preview/Preview";
import type {Article} from "../../../../types/article";
import type {Category} from "../../../../types/category";
import type {CategoryId} from "../../../../types/category-id";

interface PreviewListProps {
  previews: Article[];
  availableCategories: Category[];
}

export const PreviewList: FunctionComponent<PreviewListProps> = ({availableCategories, previews}) => {
  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">
        {previews.map(preview => (
          <li className="preview__item" key={preview.id}>
            <Preview
              announce={preview.announce}
              selectedCategories={resolveCategoriesLabels(preview.category, availableCategories)}
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

function resolveCategoriesLabels(selectedCategories: CategoryId[], availableCategories: Category[]): Category[] {
  return availableCategories.filter(category => selectedCategories.includes(category.id));
}
