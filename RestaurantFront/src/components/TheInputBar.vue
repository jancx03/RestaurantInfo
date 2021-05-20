<template>
  <div class="field has-addons">
    <p class="control">
      <button id="input-color" class="button is-static is-medium">Find</button>
    </p>
    <p class="control">
      <input
        v-model="search"
        id="input-side"
        class="input is-medium input-control"
        type="text"
        placeholder="italian, mexican, chinese..."
      />
    </p>
    <p class="control">
      <button id="input-n" class="button is-static is-medium">Near</button>
    </p>
    <p class="control">
      <input
        v-model="location"
        class="input is-medium input-control"
        type="text"
        placeholder="addess, neighborhood, city, state or zip"
      />
    </p>
    <div @click.prevent="searchRestaurant" id="red" class="button is-medium search-button">
      <span id="white" class="icon is-small"
        ><i class="fas fa-search"></i
      ></span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  // emits: ['search-restaurant'],
  data() {
    return {
      item: '',
      search: '',
      location: 'New York 200 5th Ave',
    };
  },
  methods: {
    ...mapMutations(['addItem']),
    submit() {
      this.addItem(this.item.trim());
      this.item = '';
    },

    searchRestaurant() {
      const { search, location } = this;

      return this.$router.push({ name: 'restaurants', query: { search, location } });
    },

    // async finder() {
    //   // await quewe
    // },
  },
  mounted() {
    if (this.$route.query.search !== undefined) {
      this.search = this.$route.query.search;
      this.location = this.$route.query.location;
    }

    return 0;
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
.input-control {
  min-width: 320px;
  outline: none;
}

#red {
  background-color: #bd1f1f;
  border: none;
}
#white {
  color: white;
}
#input-color {
  background-color: white;
}
#input-n{
  background-color: white;
}
input:focus{
  outline: none;
}
/* .field.has-addons .control:not(:first-child):not(:last-child) .button,
.field.has-addons .control:not(:first-child):not(:last-child) .input,
.field.has-addons .control:not(:first-child):not(:last-child) .select select {
  border: none;
} */
/* :global(.icon){
  color: white;
} */
</style>
