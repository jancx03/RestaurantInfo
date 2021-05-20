/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import Prompt from 'prompt-sync';
import Restaurant from './Restaurant.js';
import { pushToDb } from './dbFiller.js';

const prompt = Prompt({ sigint: true });

const ENDL = '\n';

async function save(restaurant) {
  try {
    await pushToDb(restaurant);
    console.log('Restaurant Created Sucessfully');
    return 0;
  } catch (err) {
    console.log(err);
    return 1;
  }
}

function advancedOptions(_restaurant) {
  const restaurant = Object.assign(_restaurant);
  restaurant.rating = prompt(`rating? [${restaurant.rating}]: `, restaurant.rating);
  restaurant.cost = prompt(`cost? [${restaurant.cost}]: `, restaurant.cost);
  restaurant.type = prompt(`type? [${restaurant.type}]: `, restaurant.type);
  restaurant.sanitary = prompt(`sanitary? [${restaurant.sanitary}]: `, restaurant.sanitary);
  restaurant.payMethod = prompt(`payMethod? [${restaurant.payMethod}]: `, restaurant.payMethod);
  restaurant.accessibility = prompt(`accessibility? [${restaurant.accessibility}]: `, restaurant.accessibility);
  restaurant.kidFriendly = prompt(`kidFriendly? [${restaurant.kidFriendly}]: `, restaurant.kidFriendly);
  restaurant.waitTime = prompt(`waitTime? [${restaurant.waitTime}]: `, restaurant.waitTime);
  restaurant.reserve = prompt(`reserve? [${restaurant.reserve}]: `, restaurant.reserve);
  restaurant.serviceMethod = prompt(`serviceMethod? [${restaurant.serviceMethod}]: `, restaurant.serviceMethod);

  return restaurant;
}

async function createRestaurant() {
  const data = {};
  /* Print start up banner */
  console.clear();
  process.stdout.write(`Restaurant Creation Tool ${ENDL}`);
  process.stdout.write(ENDL);

  data.name = prompt('Restaurant Name: ');
  data.address = prompt('Address: ');
  data.contact = prompt('Contact: ');
  data.popularFood = prompt('Popular Food: ');
  let defaults = prompt('defaults? [true]: ', true);
  defaults = defaults === true;

  let restaurant = new Restaurant(data);

  if (!defaults) {
    restaurant = advancedOptions(restaurant);
  }

  await save(restaurant);

  return 0;
}

async function main() {
  await createRestaurant();
  process.exit(0);
}

main();
