const { query } = require('../db');
const logger = require('../utils/logger');
const queries = require('../utils/queries');

class CategoriesService {

  /**
   * Gets all the categories and skills.
   *
   * @returns {Categories}.
   */
  async get() {
    logger.debug('Start get@CategoriesService');

    const { rows } = await query(queries.CATEGORIES);

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