<template>
  <div class="base-card">
    <h1 class="base-title">
      Sorry, no restaurants found with search term {{term}}, try searching a type like italian.
    </h1>
  </div>
</template>

<script>
export default {
  props: ['term'],
};
</script>

<style scoped>
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

.base-title {
  font-weight: 700;
  font-size: 1.3rem;
  color: black;
}

.normal {
  font-weight: 300;
  font-size: 1rem;
}
</style>
