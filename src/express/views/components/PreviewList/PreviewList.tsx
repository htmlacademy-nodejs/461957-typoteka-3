import React from "react";
import {Preview} from "../Preview/Preview";
import {Article} from "../../../../types/article";

interface Props {
  previews: Article[];
}

export function PreviewList(props: Props): JSX.Element {
  const previews = props.previews.map(preview => (
    <li className="preview__item" key={preview.id}>
      <Preview
        announce={preview.announce}
        category={preview.category}
        comments={preview.comments}
        createdDate={preview.createdDate}
        title={preview.title}
        id={preview.id}
      />
    </li>
  ));

  return (
    <section className="main-page__list preview">
      <h2 className="visually-hidden">Список превью статей</h2>
      <ul className="preview__list">{previews}</ul>
    </section>
  );
}
