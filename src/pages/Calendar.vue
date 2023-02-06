<template>
  <div class="calendar">
    <h3>Aktuelle Maßnahmen</h3>

    <div class="grid">
      <div v-for="event in upcomingEvents" :key="event.id">
        <CalEvent :event="event" :isActual="true" />
      </div>
    </div>

    <div dashed style="height: 2px; background-color: transparent" />

    <h3>Vergangene Maßnahmen</h3>

    <div class="grid">
      <div v-for="event in passedEvents" :key="event.id">
        <CalEvent :event="event" :isActual="false" />
      </div>
    </div>
  </div>
</template>

<script>
import CalEvent from "@/components/Event.vue";

import { CloudFunctions } from "@/services/firebase.js";

export default {
  name: "calendar",
  components: {
    CalEvent,
  },
  async setup() {
    const getNotionData = async () => {
      const { data } = await CloudFunctions("getEvents")();

      return data;
    };

    const events = await getNotionData();

    console.log({ events });

    const sortFn =
      (direction = "asc") =>
      (a, b) => {
        const eventA = new Date(a.date.end || a.date.start);
        const eventB = new Date(b.date.end || b.date.start);
        return direction === "asc" ? eventA - eventB : eventB - eventA;
      };

    const newEvents = events.sort(sortFn("asc")).filter((event) => {
      let now = new Date();
      now.setDate(now.getDate() - 1);
      return new Date(event.date.end) > now;
    });

    const oldEvents = events.sort(sortFn("desc")).filter((event) => {
      let now = new Date();
      now.setDate(now.getDate() - 1);
      return new Date(event.date.end) < now;
    });

    return {
      upcomingEvents: newEvents,
      passedEvents: oldEvents,
    };
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > div {
  }
}

.calendar {
  text-align: center;
  padding: 40px 0;
}
</style>
