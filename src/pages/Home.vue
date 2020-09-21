<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/bg.jpg" class="bg" />
  </div>
</template>

<script>
export default {
  name: "pages-home"
}
</script>

<style scoped lang="scss">
.home {
  .bg {
    width: 100vw;
    height: 100vh;

    object-fit: cover;
    object-position: 50% 80%;
  }
}
</style>
