import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./Home.vue";
import Display from "./Display.vue";
import Finance from "./Finance.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/display",
      name: "display",
      component: Display,
    },

    {
      path: "/finance",
      name: "finance",
      component: Finance,
    },
  ],
});

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.mount("#app");
