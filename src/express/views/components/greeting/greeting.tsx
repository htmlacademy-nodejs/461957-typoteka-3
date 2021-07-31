import React, {FunctionComponent} from "react";

const Greeting: FunctionComponent = () => (
  <>
    <h1 className="visually-hidden">Главная страница личного блога Типотека</h1>
    <p>Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏</p>
  </>
);

export {
  Greeting,
};
