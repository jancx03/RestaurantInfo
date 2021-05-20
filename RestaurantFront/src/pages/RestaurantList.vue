<template>
  <div class="flex justify-center pt-5">
    <TheSearchBar/>
  </div>
  <div class="main">
    <TheSideBar />
    <div v-if="notFound">
      <EmptyCard :term="$route.query.search" />
    </div>
    <ul v-else-if="ready">
      <li v-for="(restaurant, index) in restaurants" :key="restaurant.name">
        <RestaurantCard :restaurant="restaurant" :index="index + 1" />
      </li>
    </ul>
    <ul v-else>
      <li v-for="n in 10" :key="n">
        <Skeleton />
      </li>
    </ul>

    <div class="flex ml-20">

       <div id='map' class="map"></div>
    </div>

  </div>
</template>

<script>
import RestaurantCard from 'components/RestaurantCard.vue';
import Skeleton from 'components/Skeleton.vue';
import TheSearchBar from 'components/TheInputBar.vue';
import TheSideBar from 'components/SideBar.vue';
import mapboxgl from 'mapbox-gl';
import EmptyCard from 'components/EmptyCard.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    RestaurantCard, Skeleton, TheSearchBar, TheSideBar, EmptyCard,
  },
  watch: {
    $route() {
      this.getRestaurants();
    },
  },
  computed: {
    ...mapGetters('restaurantStore', ['restaurants', 'notFound']),
    ...mapGetters(['coordinates']),
    ready() {
      return !!this.restaurants.length;
    },
  },
  methods: {
    ...mapActions('restaurantStore', ['queryRestaurants']),
    async getRestaurants() {
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
      } = this.$route.query;

      const payload = {
        search,
        location,
        cost,
        rating,
        kidfriendly,
        reserve,
        accessability,
        sanitary,
        wait,
      };

      await this.queryRestaurants(payload);
      this.setMap();
      return 0;
    },
    setMap() {
      if (!this.restaurants.length) {
        console.log('No Restaurants found');
        return 0;
      }

      const geojson = {
        type: 'FeatureCollection',
        features: [],
      };

      this.restaurants.map((res, index) => {
        geojson.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [res.lng, res.lat],
          },
          properties: {
            title: `${index}. ${res.restaurant}`,
            description: 'res.address',
            image: res.url_name,
          },
        });
        return 0;
      });

      mapboxgl.accessToken = '';

      const lng = this.coordinates[0];
      const lat = this.coordinates[1];

      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 13, // starting zoom
      });

      geojson.features.forEach((marker, index) => {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${marker.properties.image})`;
        // el.style.backgroundColor = 'red';
        el.style.color = 'white';
        el.style.borderRadius = '3rem';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.textAlign = 'center';
        el.style.fontWeight = 'bold';
        el.innerText = index + 1;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {

        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });

      return 0;
    },
  },
  async mounted() {
    await this.getRestaurants();
    return 0;
  },
};
</script>

<style scoped>

.main {
  /* width: 100vw;
  display: flex;
  justify-content:left;
  align-items: flex-start; */
  display: inline-grid;
  grid-auto-rows: 1fr;
  grid-template-rows:  auto;
  transition: all .3s linear;
  justify-items: center;
  grid-template-columns: 20% 60% 20%;
}

.map {
  width: 350px;
  height: 1000px;
}

.marker {
  display: block;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0;
}
</style>
