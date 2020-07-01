export interface NewArticle {
  title: string;
  createdDate: Date;
  announce: string;
  fullText?: string;
  category: string[];
}
