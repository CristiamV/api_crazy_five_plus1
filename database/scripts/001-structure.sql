CREATE SEQUENCE IF NOT EXISTS users_seq
  AS INTEGER
  INCREMENT BY 1
  START WITH 1;

CREATE TABLE IF NOT EXISTS public.users(
  id_user INTEGER DEFAULT nextval('users_seq'),
  user_name TEXT NOT NULL,

  CONSTRAINT pk_users PRIMARY KEY (id_user)
);

ALTER SEQUENCE IF EXISTS public.users_seq
    OWNED BY users.id_user;

CREATE SEQUENCE IF NOT EXISTS categories_seq
  AS INTEGER
  INCREMENT BY 1
  START WITH 1;


CREATE TABLE public.categories(
  id_cat INTEGER DEFAULT NEXTVAL('categories_seq'),
  name TEXT,

  CONSTRAINT pk_categories PRIMARY KEY (id_cat)
);

ALTER SEQUENCE IF EXISTS public.categories_seq
    OWNED BY categories.id_cat;

INSERT INTO public.categories (name) VALUES ('design');
INSERT INTO public.categories (name) VALUES ('front-end development');
INSERT INTO public.categories (name) VALUES ('back-end development');
INSERT INTO public.categories (name) VALUES ('software architecture');
INSERT INTO public.categories (name) VALUES ('leadership');

CREATE SEQUENCE IF NOT EXISTS skills_seq
  AS INTEGER
  INCREMENT BY 1
  START WITH 1;

CREATE TABLE public.skills(
  id_cat INTEGER,
  id_skill INTEGER DEFAULT nextval('skills_seq'),
  name TEXT,

  CONSTRAINT pk_skills PRIMARY KEY (id_skill),
  CONSTRAINT fk_skill_categories FOREIGN KEY (id_cat) REFERENCES public.categories (id_cat) ON DELETE CASCADE
);

ALTER SEQUENCE IF EXISTS public.skills_seq
    OWNED BY skills.id_skill;

INSERT INTO public.skills (id_cat, name) VALUES (1, 'visual');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'responsive design');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'accesibility');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'illustration');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'ux');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'user testing');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'motion design');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'interaction design');
INSERT INTO public.skills (id_cat, name) VALUES (1, 'workflows');

INSERT INTO public.skills (id_cat, name) VALUES (2, 'html + css');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'javascript');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'javascript framworks(s)');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'data visualization');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'mobile-first UI');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'highly-interactive UI');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'css preprocessors');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'whiteframing & prototyping');
INSERT INTO public.skills (id_cat, name) VALUES (2, 'consuming APIS');

INSERT INTO public.skills (id_cat, name) VALUES (3, 'back-end languages(s)');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'back-end frameworks(s)');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'API creation & maintenance');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'databases');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'hosting & deployment');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'authentication');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'containers');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'logging and reporting');
INSERT INTO public.skills (id_cat, name) VALUES (3, 'web servers (Apache, Nginx)');

INSERT INTO public.skills (id_cat, name) VALUES (4, 'software testing');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'version control system(s)');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'secure programming');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'agile methodologies');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'algorithms & data structures');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'programming design patterns');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'technical communication');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'data communication');
INSERT INTO public.skills (id_cat, name) VALUES (4, 'software architecture');

INSERT INTO public.skills (id_cat, name) VALUES (5, 'design thinking');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'workshop facilitation');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'techinical writing');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'public speaking');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'cross-discipline collaboration');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'recruiting');
INSERT INTO public.skills (id_cat, name) VALUES (5, 'mentoring');

CREATE TABLE user_level (
    id_user INTEGER,
    id_skill INTEGER,
    level INTEGER,

    CONSTRAINT pk_user_level PRIMARY KEY (id_user, id_skill),
    CONSTRAINT fk_user_level FOREIGN KEY (id_user) REFERENCES public.users (id_user) ON DELETE CASCADE,
    CONSTRAINT fk_skill_level FOREIGN KEY (id_skill) REFERENCES public.skills (id_skill) ON DELETE CASCADE
);
