
const { query } = require('../db');
const logger = require('../utils/logger');
const queries = require('../utils/queries');

class UserService {

  /**
   * Gets or creates the user
   *
   * @param {string} userName
   * @returns {User} the corresponding user.
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

  /**
   * Gets the level of the user.
   *
   * @param {number} idUser
   * @param {object} categories
   * @returns {Categories}.
   */
  async getLevel(idUser, categories) {
    logger.debug(`Start getLevel@UserService: ${idUser}`);

    const { rows } = await query(queries.LEVELS, [idUser]);

    rows.forEach((row) => {
      const { category_name, skill_name, level } = row;

      categories[category_name].skills[skill_name].level = level;
    });

    logger.debug(`Finish getLevel@UserService: ${idUser}`);

    return categories;
  }

  /**
   * Creates an user with username
   *
   * @param {string} userName
   * @returns {User} the created user.
   */
  async create(userName) {
    logger.debug(`Start create@UserService for: ${userName}`);

    const { rows } = await query('INSERT INTO public.users (user_name) VALUES($1) RETURNING *', [userName]);

    logger.debug(`Finish create@UserService for: ${userName}`);

    return rows[0];
  }

  /**
   * Sets the levels of the user
   *
   * @param {object} request
   */
  async setLevels(request) {
    logger.debug(`Start setLevels@UserService for ${request.idUser}`);

    const { idUser, levels } = request;

    for ( const score of levels) {
      const [idSkill, level] = score;

      await query('INSERT INTO user_level VALUES ($1, $2, $3)', [idUser, idSkill, level]);
    }

    logger.debug(`Finish setLevels@UserService for ${idUser}`);
  }
}

module.exports = new UserService();