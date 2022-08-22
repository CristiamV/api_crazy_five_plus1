
const { query } = require('../db');
const logger = require('../utils/logger');

class UserService {

  QUERY_SCORES = `
    SELECT c.name AS category_name, s.name AS skill_name, ul.level
    FROM  user_level ul
    INNER JOIN public.skills s USING(id_skill)
    INNER JOIN public.categories c USING (id_cat)
    WHERE id_user = $1
  `;

  /**
   *
   * @param {*} userName
   * @returns
   */
  async get(userName) {
    logger.debug(`Start get@UserService for: ${userName}`);

    let exists = true;

    const { rows } = await query('SELECT * FROM public.users WHERE user_name = $1', [userName]);

    let user;
    if (!rows.length) {
      exists = !exists;
      user = await this.create(userName);
    } else {
      user = rows[0];
    }

    logger.debug(`Finish get@UserService for: ${userName}`);

    return { ...user, exists};
  }

  async getLevel(idUser, categories) {
    logger.debug(`Start getLevel@UserService: ${idUser}`);

    const { rows } = await query(this.QUERY_SCORES, [idUser]);

    console.log(rows);

    rows.forEach((row) => {
      const { category_name, skill_name, level } = row;

      categories[category_name].skills[skill_name].level = level;
    });

    logger.debug(`Finish getLevel@UserService: ${idUser}`);

    console.log(JSON.stringify(categories));
    return categories;
  }

  async create(userName) {
    logger.debug(`Start create@UserService for: ${userName}`);

    const { rows } = await query('INSERT INTO public.users (user_name) VALUES($1) RETURNING *', [userName]);
    console.log(rows);

    logger.debug(`Finish create@UserService for: ${userName}`);

    return rows[0];
  }

  async setLevels(idUser, levels) {
    logger.debug(`Start setLevels@UserService for ${idUser}`);

    []

    logger.debug(`Finish setLevels@UserService for ${idUser}`);
  }
}

module.exports = new UserService();