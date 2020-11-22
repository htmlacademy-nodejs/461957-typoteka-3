import {getRandomInt, shuffle} from "../../../utils";
import {CategoryId} from "../../../types/category-id";
import {transliterate} from "../../../shared/transliterate";
import {ArticleComment} from "../../../types/article-comment";
import {nanoid} from "nanoid";
import {
  AnnounceRestrict,
  CategoriesRestrict,
  CommentRestrict,
  CommentTextRestrict,
  FullTextRestrict,
  TitleRestrict,
} from "./constants/mocks-restrictions";
import {DAYS_IN_MONTH, MS_IN_DAY} from "../../../constants-es6";

const THREE_MONTHS_DURATION = 3 * DAYS_IN_MONTH * MS_IN_DAY;

export function getAnnounce(sentences: string[]): string {
  return shuffle(sentences)
    .slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min + 1, AnnounceRestrict.max))
    .join(` `)
    .slice(0, AnnounceRestrict.maxLength);
}

export function getCategories(categories: string[]): CategoryId[] {
  return shuffle(categories)
    .slice(CategoriesRestrict.min, getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max))
    .map(transliterate);
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

export function getComments(commentsSentences: string[]): ArticleComment[] {
  return Array(CommentRestrict.max)
    .fill(undefined)
    .map<ArticleComment>(() => ({
      id: nanoid(),
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
