module.exports = {
  CATEGORIES: `
    SELECT c.id_cat, c.name as category_name, id_skill, s.name as skill_name
    FROM public.categories c
    INNER JOIN public.skills s USING (id_cat)
  `,
  LEVELS:  `
    SELECT c.name AS category_name, s.name AS skill_name, ul.level
    FROM  user_level ul
    INNER JOIN public.skills s USING(id_skill)
    INNER JOIN public.categories c USING (id_cat)
    WHERE id_user = $1
  `,
};