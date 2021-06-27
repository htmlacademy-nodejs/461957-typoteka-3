import {Time} from "../../../constants-es6";
import {Category} from "../../../types/category";
import {IAuthorId} from "../../../types/interfaces/author-id";
import {ICommentCreating} from "../../../types/interfaces/comment-creating";
import {getRandomInt, shuffle} from "../../../utils";

import {
  AnnounceRestrict,
  CategoriesRestrict,
  CommentRestrict,
  CommentTextRestrict,
  FullTextRestrict,
  TitleRestrict,
} from "./constants/mocks-restrictions";

const THREE_MONTHS_DURATION = 3 * Time.DAYS_IN_MONTH * Time.MS_IN_DAY;

export function getAnnounce(sentences: string[]): string {
  return shuffle(sentences)
    .slice(AnnounceRestrict.MIN, getRandomInt(AnnounceRestrict.MIN + 1, AnnounceRestrict.MAX))
    .join(` `)
    .slice(0, AnnounceRestrict.MAX_LENGTH);
}

export function getCategories(categories: string[]): Category[] {
  return shuffle(categories.map((category, index) => ({id: index + 1, label: category}))).slice(
    CategoriesRestrict.MIN,
    getRandomInt(CategoriesRestrict.MIN + 1, CategoriesRestrict.MAX),
  );
}

export function getCategoriesLabels(categories: string[]): string[] {
  return shuffle(categories).slice(
    CategoriesRestrict.MIN,
    getRandomInt(CategoriesRestrict.MIN + 1, CategoriesRestrict.MAX),
  );
}

export function getFullText(sentences: string[]): string {
  return shuffle(sentences)
    .slice(0, sentences.length - 1)
    .join(` `)
    .slice(0, FullTextRestrict.MAX_LENGTH);
}

export function getTitle(titles: string[]): string {
  return titles[getRandomInt(0, titles.length - 1)].slice(0, TitleRestrict.MAX_LENGTH);
}

export function getComments(commentsSentences: string[], authors: IAuthorId[]): ICommentCreating[] {
  return Array(CommentRestrict.MAX)
    .fill(undefined)
    .map<ICommentCreating>(() => ({
      createdDate: getDate(Date.now()),
      articleId: 1,
      text: getCommentText(commentsSentences),
      authorId: getRandomItem(authors).authorId,
    }))
    .slice(CommentRestrict.MIN, getRandomInt(CommentRestrict.MIN, CommentRestrict.MAX));
}

export function getCommentText(sentences: string[]): string {
  return shuffle(sentences)
    .slice(CommentTextRestrict.MIN, getRandomInt(CommentTextRestrict.MIN + 1, CommentTextRestrict.MAX))
    .join(` `)
    .slice(0, CommentTextRestrict.MAX_LENGTH);
}

export function getDate(currentDate: number): Date {
  return new Date(currentDate - 1 - getRandomInt(0, THREE_MONTHS_DURATION));
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}
