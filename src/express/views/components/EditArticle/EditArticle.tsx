import React, {FunctionComponent} from "react";

interface EditArticleProps {}

export const EditArticle: FunctionComponent<EditArticleProps> = () => (
  <div className="new-publication">
    <div className="new-publication__header">
      <h1>Новая публикация</h1>
      <div className="new-publication__date-form">
        <h3>Дата публикации</h3>
        <form action="#" method="POST">
          <div className="new-publication__date-block">
            <label htmlFor="new-publication-date" aria-label="Календарь" />
            <input type="text" name="login" id="new-publication-date" placeholder="21.03.2019" />
          </div>
        </form>
      </div>
      <button type="submit" className="new-publication__button button button--colored">
        Опубликовать
      </button>
    </div>
    <button type="button" className="popup__button button button--popup-close" aria-label="Закрыть окно">
      Закрыть окно
    </button>
    <div className="new-publication__form form">
      <form action="#" method="get">
        <div className="form__wrapper form__wrapper--intro">
          <div className="form__field">
            <label>
              <input type="text" placeholder="Заголовок" required />
            </label>
          </div>
          <div className="form__field form__field--post-image">
            <label>
              <input id="image-name-field" type="text" placeholder="Фотография" readOnly />
            </label>
            <div className="form__image-loader form__image-loader--publication">
              <label>
                <input className="visually-hidden" type="file" />
                Обзор
              </label>
            </div>
          </div>
          <a className="new-publication__form-link button button--transparent" href="#">
            Добавить категорию
          </a>
        </div>
        <div className="form__wrapper form__wrapper--text">
          <div className="form__field form__field--publication-text">
            <label>
              <textarea rows={1} placeholder="Анонс публикации" />
            </label>
          </div>
          <div className="form__field form__field--publication-text">
            <label>
              <textarea rows={1} placeholder="Полный текст публикации" />
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
);
