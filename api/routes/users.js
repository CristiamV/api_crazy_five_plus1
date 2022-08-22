const express = require('express');
const router = express.Router();

const users = require('../services/UserService');
const categoriesService = require('../services/CategoriesService');

router.get('/:userName', async (req, res) => {
  const { userName } = req.params;

  const categories = await categoriesService.get();

  const user = await users.get(userName);

  if (user.exists) {
    await users.getLevel(user.id_user, categories);
  }


  res.status(200).json({ user, categories });
})

module.exports = router;
