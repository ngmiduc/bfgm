<template>
  <div class="app">
    <Home />

    <Suspense>
      <template #default>
        <Calendar />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>

    <Impress />
  </div>
</template>

<script>
// components
import Loader from "@/components/Loader"

// pages
import Home from "@/pages/Home"
import Impress from "@/pages/Impress"
import Calendar from "@/pages/Calendar"

export default {
  name: "app",
  components: { Home, Impress, Calendar, Loader }
}
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  padding: 0 32px;

  @media (max-width: 850px) {
    padding: 0 8px;
  }
}
</style>
