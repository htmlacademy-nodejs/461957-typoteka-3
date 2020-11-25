-- Список всех категорий (идентификатор, наименование категории);
SELECT *
FROM categories;

-- Список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT id, title
FROM categories
         FULL JOIN articles_categories on categories.id = articles_categories.category_id
WHERE category_id IS NOT NULL
GROUP BY id, title
ORDER BY id;

-- Список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT categories.id,
       categories.title,
       count(articles_categories.article_id) articles_count
from categories
         INNER JOIN articles_categories on categories.id = articles_categories.category_id
GROUP BY categories.id
ORDER BY articles_count DESC;

-- Список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT articles.id,
       articles.title,
       articles.announce,
       articles.date,
       concat(users.first_name, ' ', users.last_name) author,
       users.email,
       comments.count                                 comments_count,
       string_agg(categories.title, ', ')             categories
from articles
         INNER JOIN users on articles.user_id = users.id
         INNER JOIN articles_categories on articles.id = articles_categories.article_id
         INNER JOIN categories on articles_categories.category_id = categories.id
         LEFT JOIN
     (
         SELECT article_id, count(1) count
         from comments
         GROUP BY article_id
     ) comments on articles.id = comments.article_id
GROUP BY articles.id, comments_count, users.first_name, users.last_name, users.email, articles.date
ORDER BY articles.date DESC;

-- Полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
-- Список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
-- Список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;