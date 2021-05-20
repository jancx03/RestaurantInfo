/* eslint-disable no-async-promise-executor */
/* eslint-disable no-console */
import db from '../models/db.js';

export const pushToDb = async (restaurant) => {
  const {
    name,
    rating,
    cost,
    type,
    sanitary,
    payMethod,
    address,
    contact,
    accessibility,
    kidFriendly,
    popularFood,
    waitTime,
    reserve,
    serviceMethod,
    url,
    lat,
    lng,
    alias,
  } = restaurant;

  return new Promise(async (resolve, reject) => {
    try {
      await db.query(`INSERT INTO cost(cost) VALUES ('${cost}');`);

      await db.query(`INSERT INTO payment(pay_method) VALUES ('${payMethod}');`);

      await db.query(`INSERT INTO rating(star_rate) VALUES ('${rating}');`);

      await db.query(`INSERT INTO restaurant_type(type) VALUES ('${type}');`);

      await db.query(`INSERT INTO sanitary(sanitary) VALUES ('${sanitary}');`);

      await db.query(`INSERT INTO restaurant_info(restaurant, address, contact, type_id) VALUES ('${name}', '${address}', '${contact}', (SELECT LAST_INSERT_ID() FROM restaurant_type LIMIT 1));`);

      await db.query(`INSERT INTO restaurant_service(service_method, rest_id) VALUES ('${serviceMethod}',(SELECT LAST_INSERT_ID() FROM restaurant_info LIMIT 1));`);

      await db.query(`INSERT INTO rest_more_info(accessibility, wait, kid_friendly, pop_food, reserve, rest_id, rating, sanitary_rating, cost, pay_method) VALUES ('${accessibility}', '${waitTime}', '${kidFriendly}', '${popularFood}', '${reserve}', (SELECT LAST_INSERT_ID() FROM restaurant_info LIMIT 1), (SELECT LAST_INSERT_ID() FROM rating LIMIT 1), (SELECT LAST_INSERT_ID() FROM sanitary LIMIT 1), (SELECT LAST_INSERT_ID() FROM cost LIMIT 1), (SELECT LAST_INSERT_ID() FROM payment LIMIT 1));`);

      await db.query(`INSERT INTO url(url) VALUES('${url}');`);
      await db.query(`INSERT INTO coordinates(lng,lat) VALUES('${lng}','${lat}');`);
      await db.query(`INSERT INTO alias(alias_name) VALUES('${alias}');`);
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

export default { pushToDb };
