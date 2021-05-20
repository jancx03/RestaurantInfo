import express from 'express';
import { index, err404 } from './controllers/index.js';
import { restaurants, restaurant } from './controllers/restaurants.js';

const router = express.Router();

router.route('/')
  .get(index);

/* Routes go here... */

router.route('/restaurants')
  .get(restaurants);

router.route('/restaurant/:id')
  .get(restaurant);

router.route('/:catch_all')
  .get(err404);

export default router;
