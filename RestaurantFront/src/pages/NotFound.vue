<template>
  <div class="image">
    <div class="content">
      <h1 class="title">
        Sorry!, {{$route.path}} not found, error <span>404</span>., returning in {{ counter }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 5,
    };
  },
  mounted() {
    const backCounter = setInterval(() => {
      this.counter -= 1;
      if (this.counter < 1) {
        clearInterval(backCounter);
        this.$router.go(-1);
      }
    }, 1000);
    return 0;
  },
};
</script>

<style scoped>
span {
  color: rgb(255, 70, 70);
}

.title {
  color: white;
}

.image {
  background-image: url("https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80");
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: bottom;
}

.content {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
