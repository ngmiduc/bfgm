<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/bg.jpg" class="bg" />
  </div>
</template>

<script>
// import axios from "axios"

import {} from "vue"

export default {
  name: "Home",
  components: {}
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
.bg {
  width: 100vw;
  height: 100vh;

  object-fit: cover;
  object-position: 50% 80%;
}
</style>
