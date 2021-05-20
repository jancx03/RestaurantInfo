import geocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
import db from '../models/db.js';

const accessToken = process.env.mapbox_token;
const geocoder = geocoding({ accessToken });

export const restaurants = async (req, res, next) => {
  const {

    search,
    location,
    cost,
    rating,
    kidfriendly,
    reserve,
    accessability,
    sanitary,
    wait,
  } = req.query;
  try {
    let str1 = `SELECT restaurant_info.restaurant, restaurant_info.address,restaurant_info.contact, restaurant_type.type,cost.cost,alias.alias_name,coordinates.lng,coordinates.lat, rest_more_info.kid_friendly, rest_more_info.wait, rating.star_rate,rest_more_info.reserve, url.url_name,rest_more_info.accessibility,sanitary.sanitary from restaurant_info inner join restaurant_type ON restaurant_info.type_id=restaurant_type.type_id inner join cost on restaurant_type.type_id=cost.cost_id inner join alias on cost.cost_id=alias.alias_id inner join coordinates on alias.alias_id=cor_id inner join rest_more_info on cor_id=rest_info_id inner join rating on rest_info_id=rate_id inner join url on rate_id=url_id inner join sanitary on url_id=sanitary_id where restaurant_info.restaurant LIKE '%${search}%'`;

    let str2 = `SELECT restaurant_info.restaurant, restaurant_info.address,restaurant_info.contact, restaurant_type.type,cost.cost,alias.alias_name,coordinates.lng,coordinates.lat, rest_more_info.kid_friendly, rest_more_info.wait, rating.star_rate,rest_more_info.reserve, url.url_name, rest_more_info.accessibility,sanitary.sanitary from restaurant_info inner join restaurant_type ON restaurant_info.type_id=restaurant_type.type_id inner join cost on restaurant_type.type_id=cost.cost_id inner join alias on cost.cost_id=alias.alias_id inner join coordinates on alias.alias_id=cor_id inner join rest_more_info on cor_id=rest_info_id inner join rating on rest_info_id=rate_id inner join url on rate_id=url_id inner join sanitary on url_id=sanitary_id where restaurant_type.type LIKE '%${search}%'`;

    if (cost != undefined) {
      str1 = str1.concat(` and cost.cost = '${cost}'`);
      str2 = str2.concat(` and cost.cost = '${cost}'`);
    }

    if (rating > 0) {
      str1 = str1.concat(` and rating.star_rate>= ${rating}`);
      str2 = str2.concat(` and rating.star_rate>= ${rating}`);
    }

    if (kidfriendly != undefined) {
      str1 = str1.concat(` and rest_more_info.kid_friendly='${kidfriendly ? 'Yes' : 'No'}'`);
      str2 = str2.concat(` and rest_more_info.kid_friendly='${kidfriendly ? 'Yes' : 'No'}'`);
    }

    if (reserve != undefined) {
      str1 = str1.concat(` and rest_more_info.reserve='${reserve ? 'Yes' : 'No'}'`);
      str2 = str2.concat(` and rest_more_info.reserve='${reserve ? 'Yes' : 'No'}'`);
    }

    if (accessability != undefined) {
      str1 = str1.concat(` and rest_more_info.accessibility='${accessability ? 'Yes' : 'No'}'`);
      str2 = str2.concat(` and rest_more_info.accessibility='${accessability ? 'Yes' : 'No'}'`);
    }

    if (sanitary != undefined) {
      str1 = str1.concat(` and sanitary.sanitary='${sanitary}'`);
      str2 = str2.concat(` and sanitary.sanitary='${sanitary}'`);
    }

    if (wait > 0) {
      str1 = str1.concat(` and rest_more_info.wait<= ${wait}`);
      str2 = str2.concat(` and rest_more_info.wait<= ${wait}`);
    }

    const strList = [str1, str2];

    let str = strList.join(' union ');

    str = str.concat(';');

    const query = location.split(',').join('');

    const data = await db.query(str);
    const geojson = await geocoder.forwardGeocode({
      query,
      limit: 1,
    }).send();

    const { coordinates } = geojson.body.features[0].geometry;

    data.map((res) => {
      const distance = getDistance(coordinates[1], coordinates[0], res.lat, res.lng);
      res.distance = Math.round(distance * 10) / 10;
      return 0;
    });

    data.sort((a, b) => {
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    });

    // const body = geojson.body;

    const response = { data, coordinates };

    res.status = 200;
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const toRad = (Value) => Value * Math.PI / 180;

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of earth
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  const mi = d * 0.62137;
  return mi;
};

export default { restaurants };
