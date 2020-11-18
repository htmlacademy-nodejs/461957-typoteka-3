DROP DATABASE IF EXISTS typoteka;

CREATE DATABASE typoteka WITH TEMPLATE = template0 ENCODING = 'UTF8' CONNECTION LIMIT = -1 OWNER = typoteka_admin;

GRANT ALL ON DATABASE typoteka TO typoteka_admin;

\connect typoteka;

CREATE TABLE public.articles
(
    id       bigserial     NOT NULL PRIMARY KEY,
    title    varchar(250)  NOT NULL,
    date     date          NOT NULL,
    user_id  bigint        NOT NULL,
    content  varchar(1000) NOT NULL,
    image_id varchar(1000),
    announce varchar(250)  NOT NULL
);

CREATE TABLE public.permissions
(
    name varchar(100) NOT NULL PRIMARY KEY
);

CREATE TABLE public.users
(
    id         bigserial    NOT NULL PRIMARY KEY,
    email      varchar(255) NOT NULL,
    type       varchar(100) NOT NULL references permissions (name),
    first_name varchar(255) NOT NULL,
    last_name  varchar(255) NOT NULL,
    image_id   varchar(1000)
);
