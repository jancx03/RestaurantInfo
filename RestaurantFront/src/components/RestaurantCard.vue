<template>
  <div class="base-card">
    <div class="base-image">
      <img :src="restaurant.url_name" :alt="restaurant.url_name">
    </div>
    <div class="main">
      <p class="base-title">{{index}}. {{name}}</p>
      <i v-for="star in restaurant.star_rate" :key="star" class="fas fa-star fill"></i>
      <i v-for="star in 5 - restaurant.star_rate" :key="star" class="fas fa-star unfill"></i>
      <p class="normal">
        <span>{{restaurant.cost}}</span>
        <span class="dot">&middot;</span>
        <span>{{restaurant.type}}</span></p>
      <p class="normal">
        <span class="check" v-if="toBool(restaurant.reserve)"><i class="fas fa-check"></i></span>
        <span class="close" v-else><i class="fas fa-times"></i></span>
        <span class="feature">Reserve</span>
        <span class="check"
          v-if="toBool(restaurant.kid_friendly)">
          <i class="fas fa-check"></i>
        </span>
        <span v-else><i class="fas fa-times"></i></span>
        <span class="feature">Kid Friendly</span>
      </p>
    </div>
    <div class="info">
      <p>{{restaurant.address}}</p>
      <p>{{restaurant.contact}}</p>
      <p class="distance">{{restaurant.distance}} miles</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['restaurant', 'index'],
  computed: {
    name(/* String */) {
      /* Add space after before every capital letter */
      return this.restaurant.restaurant.replace(/([A-Z])/g, ' $1').trim();
    },
  },
  methods: {
    toBool(/* string */ value) {
      let result;

      switch (value) {
        case 'Yes':
          result = true;
          break;
        default:
          result = false;
          break;
      }

      return /* boolean */ result;
    },
  },
};
</script>

<style scoped>
img {
  border-radius: .3rem;
  height: 12.5rem;
  width: 12.5rem;
}

.base-image {
  width: 12.5rem;
}

.base-card {
  position: relative;
  display: flex;
  justify-content:left;
  align-items: flex-start;
  transition: all .3s linear;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: .2rem;
  margin: 1rem 1rem;
  padding: 1rem;
  min-width: 30%;
  width: 100%;
}

.base-card:hover {
  -webkit-box-shadow: -.2rem 0 .5rem rgba(0, 0, 0, 0.1), .2rem .2rem .5rem rgba(0, 0, 0, 0.1);
  -moz-box-shadow: -.2rem 0 .5rem rgba(0, 0, 0, 0.1), .2rem .2rem .5rem rgba(0, 0, 0, 0.1);
  box-shadow: -.2rem 0 .5rem rgba(0, 0, 0, 0.1), .2rem .2rem .5rem rgba(0, 0, 0, 0.1);
}

.info {
  font-size: .7rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.main {
  padding-left: 1rem;
  margin-right: 15rem;
}

.base-title {
  font-weight: 700;
  font-size: 1.3rem;
  color: black;
}

.normal {
  font-weight: 300;
  font-size: 1rem;
}

.fill {
  color: white;
  background-color: red;
  font-size: .7rem;
  padding: .3rem;
  margin-right: .2rem;
  border-radius: .4rem;
}

.unfill {
  color: white;
  background-color: lightgrey;
  font-size: .7rem;
  padding: .3rem;
  margin-right: .2rem;
  border-radius: .4rem;
}

.dot {
  font-weight: bold;
  margin: 0 .5rem;
}

.check {
  color: green;
  font-weight: 200;
}

.close {
  color: black;
  font-weight: 200;
}

.feature {
  margin: 0 .7rem;
  font-weight: 500;
  font-size: 1rem;
  color: black;
}

.distance {
  font-weight: 500;
  font-size: 1rem;
  color: black;
}
</style>
