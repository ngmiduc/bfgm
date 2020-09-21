<template>
  <div class="app">
    <Home />
    <Impress />
  </div>
</template>

<script>
// pages
import Home from "@/pages/Home"
import Impress from "@/pages/Impress"

export default {
  name: "app",
  components: { Home, Impress }
  // async setup() {
  // const getNotionData = async () => {
  //   const { data } = await axios.post(
  //     "https://www.notion.so/api/v3/queryCollection",
  //     {
  //       collectionId: "526d2e7a-fdd2-4479-9b30-acd286887014",
  //       collectionViewId: "eba83c51-94de-4982-92f2-eeaf1fe8820a",
  //       query: { calendar_by: "Cui^" },
  //       loader: {
  //         type: "calendar",
  //         dateRangeStart: 1595800800000,
  //         dateRangeEnd: 1601848799999,
  //         searchQuery: "",
  //         userTimeZone: "Europe/Berlin",
  //         startDayOfWeek: 1,
  //         scale: "month"
  //       }
  //     },
  //     {
  //       headers: { "Access-Control-Allow-Origin": "*" }
  //     }
  //   )
  //   return data
  // }
  //
  // const notion = await getNotionData()
  //
  // return {
  //   notion
  // }
  // }
}
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
