<template>
  <div class="image">
    <div>
      <h1 class="title">Restaurant Finder</h1>
      <title></title>
      <TheSearchBar />
    </div>
  </div>

</template>

<script>
import TheSearchBar from 'components/TheInputBar.vue';
import { mapActions } from 'vuex';

export default {
  components: { TheSearchBar },
  methods: {
    ...mapActions('restaurantStore', ['queryRestaurants']),

    // searchRestaurant(search) {
    //   return this.$router.push({ name: 'restaurants', query: { search } });
    // },
  },
};
</script>
<style scoped>
h1{
  font-size: 400%;
  font-weight: 400;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
 color: brown;

}

.image {
  background-image: url("https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80");
  width: 100vw;
  height: 100vh;
  display: flex;
  background-position: bottom;
  background-size: 100%;
  justify-content: center;
  align-items: center;
}

.title {
  border-radius: 4rem;
  background-color: rgba(0, 0, 0, 0.8);
  letter-spacing: .4rem;
  text-shadow: 1px 1px #ff0000;
}
</style>
