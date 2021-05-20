import axios from 'axios';
import string from 'string-sanitizer';
import cliProgress from 'cli-progress';
import Restaurant from './Restaurant.js';
import { pushToDb } from './uplinkRestaurant.js';

const { token } = process.env;

const main = async () => {
  const restList = [];
  try {
    const results = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: `Bearer ${token}`,
      },
      params: {
        term: 'french',
        location: 'New York City, NYC',
      },
    });

    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar1.start(results.data.businesses.length, 0);

    results.data.businesses.forEach((res) => {
      const restaurant = new Restaurant({
        name: string.sanitize(res.name),
        alias: res.alias,
        url: res.image_url,
        rating: Math.round(res.rating),
        cost: res.price,
        type: 'French',
        address: res.location.address1,
        contact: res.display_phone,
        lat: res.coordinates.latitude,
        lng: res.coordinates.longitude,
      });
      restList.push(restaurant);
      bar1.increment(1);
    });

    bar1.update(restList.length);
    bar1.stop();

    const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    bar2.start(restList.length, 0);

    for (let i = 0; i < restList.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await pushToDb(restList[i]);
      bar2.update(i);
    }

    bar2.update(restList.length);
    bar2.stop();

    console.log('Restaurant Created Sucessfully');
    return process.exit(0);
  } catch (err) {
    console.log(err.message);
    return process.exit(1);
  }
};

main();
