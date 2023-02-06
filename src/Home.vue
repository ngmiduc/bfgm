<script setup>
import Loader from "./components/Loader.vue";

import Header from "./pages/Header.vue";
import Impress from "./pages/Impress.vue";
import Calendar from "./pages/Calendar.vue";
</script>

<template>
  <Header />

  <main>
    <Suspense>
      <template #default>
        <Calendar />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </main>

  <Impress />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");

html,
body {
  margin: 0;
}

body {
  background-color: #f1daff !important;
}

* {
  font-family: "Crimson Text", serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
