<template>
  <div class="app-header">
    <header>
      <img alt="logo" src="@/assets/logo512.png" />
    </header>
  </div>
</template>

<script>
export default {
  name: "app-header",
}
</script>

<style scoped lang="scss">
.app-header {
  padding: 16px;

  border-bottom: 1px solid black;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
    }

    span {
      font-size: 7vw;
      color: black;
    }
  }
}
</style>
