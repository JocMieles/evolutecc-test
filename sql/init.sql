-- Script para la creacion de la Base de datos, tienes dos opciones

--1. CREATE DATABASE postgres
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- COMMENT ON DATABASE postgres
--     IS 'default administrative connection database';



--2. "CREATE DATABASE postgres WITH OWNER = postgres ENCODING = 'UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8' TABLESPACE=pg_default CONNECTION LIMIT=-1\"

CREATE SEQUENCE user_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
    CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;

CREATE SEQUENCE video_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS public.video
(
    id integer NOT NULL DEFAULT nextval('video_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY (id),
    CONSTRAINT "FK_74e27b13f8ac66f999400df12f6" FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.video
    OWNER to postgres;    

CREATE SEQUENCE comment_id_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS public.comment
(
    id integer NOT NULL DEFAULT nextval('comment_id_seq'::regclass),
    text character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    "videoId" integer NOT NULL,
    "parentCommentId" integer,
    CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id),
    CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId")
        REFERENCES public.comment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_fae151444dcca85704ef1fbb285" FOREIGN KEY ("videoId")
        REFERENCES public.video (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comment
    OWNER to postgres;

INSERT INTO public."user" ("username", "email") VALUES ('user1', 'user1@correo.com');
INSERT INTO public."user" ("username", "email") VALUES ('user2', 'user2@correo.com');
INSERT INTO public."video" ("title", "description", "url", "userId", "username") VALUES ('Video Evolutecc', 'Comenzamos!', 'http://example.com/evolutecc.mp4', 1, 'user1');
INSERT INTO public."comment" ("text", "userId", "videoId", "username") VALUES ('Que gran Informacion!', 1, 1, 'user1');
INSERT INTO public."comment" ("text", "userId", "videoId", "parentCommentId", "username") VALUES ('Que gran Video!', 2, 1, 1, 'user2');