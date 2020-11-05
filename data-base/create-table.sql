CREATE TABLE public.peoples
(
    id bigserial NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    birth_date date,
    email character varying(100),
    PRIMARY KEY (id)
);

ALTER TABLE public.peoples
    OWNER to aberesnev;