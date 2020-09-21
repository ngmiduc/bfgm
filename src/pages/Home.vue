<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/bg-cutted.png" class="bg" />
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
    height: auto;

    object-fit: cover;
    object-position: 50% 80%;
  }
}
</style>
