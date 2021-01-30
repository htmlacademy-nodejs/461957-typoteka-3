import {getRandomInt, shuffle} from "../../../utils";
import {
  AnnounceRestrict,
  CategoriesRestrict,
  CommentRestrict,
  CommentTextRestrict,
  FullTextRestrict,
  TitleRestrict,
} from "./constants/mocks-restrictions";
import {DAYS_IN_MONTH, MS_IN_DAY} from "../../../constants-es6";
import {Category} from "../../../types/category";
import {ICommentCreating} from "../../../types/interfaces/comment-creating";

const THREE_MONTHS_DURATION = 3 * DAYS_IN_MONTH * MS_IN_DAY;

export function getAnnounce(sentences: string[]): string {
  return shuffle(sentences)
    .slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min + 1, AnnounceRestrict.max))
    .join(` `)
    .slice(0, AnnounceRestrict.maxLength);
}

export function getCategories(categories: string[]): Category[] {
  return shuffle(categories.map((category, index) => ({id: index + 1, label: category}))).slice(
    CategoriesRestrict.min,
    getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max),
  );
}

export function getCategoriesLabels(categories: string[]): string[] {
  return shuffle(categories).slice(
    CategoriesRestrict.min,
    getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max),
  );
}

export function getFullText(sentences: string[]): string {
  return shuffle(sentences)
    .slice(0, sentences.length - 1)
    .join(` `)
    .slice(0, FullTextRestrict.maxLength);
}

export function getTitle(titles: string[]): string {
  return titles[getRandomInt(0, titles.length - 1)].slice(0, TitleRestrict.maxLength);
}

export function getComments(commentsSentences: string[]): ICommentCreating[] {
  return Array(CommentRestrict.max)
    .fill(undefined)
    .map<ICommentCreating>(() => ({
      createdDate: getDate(Date.now()),
      articleId: 1,
      text: getCommentText(commentsSentences),
    }))
    .slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, CommentRestrict.max));
}

export function getCommentText(sentences: string[]): string {
  return shuffle(sentences)
    .slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max))
    .join(` `)
    .slice(0, CommentTextRestrict.maxLength);
}

export function getDate(currentDate: number): Date {
  return new Date(currentDate - 1 - getRandomInt(0, THREE_MONTHS_DURATION));
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}
