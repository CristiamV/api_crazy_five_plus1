const express = require('express');
const router = express.Router();

const categoriesService = require('../services/CategoriesService');

router.get('/', async (_req, res) => {
  const categories = await categoriesService.get();

  res.status(200).json(categories);
});

module.exports = router;
