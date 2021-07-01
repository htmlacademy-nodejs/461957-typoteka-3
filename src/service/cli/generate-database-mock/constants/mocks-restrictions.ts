const CategoriesRestrict = {
  MIN: 0,
  MAX: 5,
};

const AnnounceRestrict = {
  MIN: 0,
  MAX: 5,
  MAX_LENGTH: 250,
};

const CommentRestrict = {
  MIN: 0,
  MAX: 10,
};

const CommentTextRestrict = {
  MIN: 1,
  MAX: 5,
  MAX_LENGTH: 1000,
};

const TitleRestrict = {
  MAX_LENGTH: 250,
};

const FullTextRestrict = {
  MAX_LENGTH: 1000,
};

export {
  AnnounceRestrict,
  CategoriesRestrict,
  CommentRestrict,
  CommentTextRestrict,
  FullTextRestrict,
  TitleRestrict,
};
