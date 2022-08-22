const { query } = require('../db');
const logger = require('../utils/logger');

class CategoriesService {
  QUERY_CATEGORIES = `
    SELECT c.id_cat, c.name as category_name, id_skill, s.name as skill_name
    FROM public.categories c
    INNER JOIN public.skills s USING (id_cat)
  `;

  async get() {
    logger.debug('Start get@CategoriesService');

    const { rows } = await query(this.QUERY_CATEGORIES);

    const categories = {};
    rows.forEach((row) => {
      if (!categories[row.category_name]) {
        categories[row.category_name] = { id: row.id_cat, skills: {} };
      }

      categories[row.category_name].skills[row.skill_name] = { id: row.id_skill, level: -1 }
    });

    logger.debug('Start get@CategoriesService');

    return categories;
  }
}

module.exports = new CategoriesService();