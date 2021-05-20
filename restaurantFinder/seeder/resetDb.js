import db from '../models/db.js';

async function resetDb() {
  try {
    await db.query('drop table rest_more_info;');
    await db.query('drop table restaurant_service;');
    await db.query('drop table restaurant_info;');
    await db.query('drop table restaurant_type;');
    await db.query('drop table cost;');
    await db.query('drop table sanitary;');
    await db.query('drop table payment;');
    await db.query('drop table rating');
    await db.query('drop table url');
    await db.query('drop table alias');
    await db.query('drop table coordinates');
    await db.query('create table sanitary (sanitary_id int NOT NULL AUTO_INCREMENT, sanitary varchar(1), PRIMARY KEY (sanitary_id)); ');
    await db.query('create table cost (cost_id int NOT NULL AUTO_INCREMENT, cost varchar(3), PRIMARY KEY (cost_id));');
    await db.query('create table rating (rate_id int NOT NULL AUTO_INCREMENT, star_rate int(1), PRIMARY KEY (rate_id));');
    await db.query('create table payment (pay_id int NOT NULL AUTO_INCREMENT, pay_method varchar(10), PRIMARY KEY (pay_id));');
    await db.query('create table restaurant_type ( type_id int NOT NULL AUTO_INCREMENT, type varchar(15), PRIMARY KEY (type_id));');
    await db.query('create table restaurant_info ( rest_id int NOT NULL AUTO_INCREMENT, restaurant varchar(32), address varchar(100), contact varchar(15), type_id int, PRIMARY KEY (rest_id), FOREIGN KEY (type_id) REFERENCES restaurant_type(type_id));');
    await db.query('create table restaurant_service ( rest_id int, service_method varchar(10), FOREIGN KEY (rest_id) REFERENCES restaurant_info(rest_id));');
    await db.query('create table rest_more_info ( rest_id int, rest_info_id int NOT NULL AUTO_INCREMENT, rating int(1), sanitary_rating int(1), cost int(1), accessibility varchar(4), wait varchar(10), kid_friendly varchar(4), pop_food varchar(10), reserve varchar(4), pay_method int(1), PRIMARY KEY (rest_info_id), FOREIGN KEY (rest_id) REFERENCES restaurant_info(rest_id), FOREIGN KEY (rating) REFERENCES rating(rate_id), FOREIGN KEY (sanitary_rating) REFERENCES sanitary(sanitary_id), FOREIGN KEY (cost) REFERENCES cost(cost_id), FOREIGN KEY (pay_method) REFERENCES payment(pay_id));');
    await db.query('create table url(url_id int not null auto_increment, url text, primary key(url_id));');
    await db.query('create table coordinates(cor_id int not null auto_increment, lng decimal(10,6), lat decimal(10,6), primary key(cor_id));');
    await db.query('create table alias(alias_id int not null auto_increment, alias_name text, primary key(alias_id));');
    process.stdout.write('Database reset finished successfully');
    process.exit(0);
  } catch (err) {
    process.stderr.write(`${err}\n`);
    process.exit(1);
  }
}

resetDb();
