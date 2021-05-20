<template>
  <div class="post">
    <div class="avatar"></div>
    <div>
      <p class="line"></p>
      <p class="line long"></p>
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 100%;
  position: relative;
  display: flex;
  justify-content:left;
  align-items: flex-start;
  transition: all .3s linear;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: .2rem;
  padding: 1rem;
  min-width: 30%;
}

.post .avatar {
  width: 9rem;
  height: 9rem;
  background-color: #ccc;
  border-radius: .2rem;
  margin: 8px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 100px, #ddd 80px);
  background-size: 600px;
  animation: shine-avatar 1.6s infinite linear;
}

.line {
  width: 15rem;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 100px, #ddd 80px);
  background-size: 600px;
  animation: shine-lines 1.6s infinite linear;
}

.long {
  width: 30rem;
}

.post .line ~ .line {
  background-color: #ddd;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  30% {
    background-position: -100px;
  }
  100% {
    background-position: 30rem;
  }
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
}
</style>
