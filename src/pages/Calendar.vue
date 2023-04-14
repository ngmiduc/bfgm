<template>
  <div class="calendar">
    <h3>Aktuelle Maßnahmen</h3>

    <div class="grid">
      <CalEvent
        :event="event"
        :isActual="true"
        v-for="event in upcomingEvents"
        :key="event.id"
      />
    </div>

    <div dashed style="height: 2px; background-color: transparent" />

    <h3>Vergangene Maßnahmen</h3>

    <div class="grid">
      <CalEvent
        v-for="event in passedEvents"
        :key="event.id"
        :event="event"
        :isActual="false"
      />
    </div>
  </div>
</template>

<script>
import CalEvent from "@/components/Event.vue"

import { CloudFunctions } from "@/services/firebase.js"

export default {
  name: "page-calendar",
  components: {
    CalEvent,
  },
  async setup() {
    const getNotionData = async () => {
      const { data } = await CloudFunctions("getEvents")()

      return data
    }

    const events = await getNotionData()

    console.log({ events })

    const sortFn =
      (direction = "asc") =>
      (a, b) => {
        const eventA = new Date(a.date.end || a.date.start)
        const eventB = new Date(b.date.end || b.date.start)
        return direction === "asc" ? eventA - eventB : eventB - eventA
      }

    const newEvents = events.sort(sortFn("asc")).filter((event) => {
      let now = new Date()
      now.setDate(now.getDate() - 1)
      return new Date(event.date.end) > now
    })

    const oldEvents = events.sort(sortFn("desc")).filter((event) => {
      let now = new Date()
      now.setDate(now.getDate() - 1)
      return new Date(event.date.end) < now
    })

    return {
      upcomingEvents: newEvents,
      passedEvents: oldEvents,
    }
  },
}
</script>

<style scoped lang="scss">
.grid {
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 100vw;

    @media (min-width: 768px) {
      width: 50vw;
    }

    @media (min-width: 1268px) {
      width: 33vw;
    }
  }
}

.calendar {
  h3 {
    border-bottom: 1px solid black;
    margin: 0;
    padding: 16px;
  }
}
</style>
