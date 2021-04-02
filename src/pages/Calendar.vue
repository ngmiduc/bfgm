<template>
  <div class="calendar">
    <a-typography-title v-if="upcomingEvents.length !== 0" :level="2">
      Aktuelle Maßnahmen
    </a-typography-title>

    <a-row :gutter="[32, 32]" type="flex" justify="center">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="event in upcomingEvents"
        :key="event.id"
      >
        <CalEvent :event="event" :isActual="true" />
      </a-col>
    </a-row>

    <a-divider dashed style="height: 2px; background-color: transparent;" />

    <a-typography-title :level="2">
      Vergangene Maßnahmen
    </a-typography-title>

    <a-row :gutter="[32, 32]" type="flex" justify="center">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="event in passedEvents"
        :key="event.id"
      >
        <CalEvent :event="event" :isActual="false" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios"

import CalEvent from "@/components/Event.vue"

export default {
  name: "calendar",
  components: {
    CalEvent
  },
  async setup() {
    const getNotionData = async () => {
      const {
        data: { result }
      } = await axios.get(
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:5000/bfgm-calendar"
          : "https://bfgm.herokuapp.com/bfgm-calendar"
      )

      return result
    }

    const notion = await getNotionData()
    const calendarData = notion.map(event => ({
      ...event,
      description: event.description.split("\n").filter(i => i !== ""),
      cover: event.cover
        ? event.cover.indexOf("https://") !== -1
          ? "https://www.notion.so/image/" +
            event.cover.replace(/\//g, "%2F").replace(/:/g, "%3A") +
            "?table=block&id=" +
            event.id
          : "https://www.notion.so" + event.cover
        : null
    }))

    const sortFn = (direction = "asc") => (a, b) => {
      const eventA = new Date(a.date.end || a.date.start)
      const eventB = new Date(b.date.end || b.date.start)
      return direction === "asc" ? eventA - eventB : eventB - eventA
    }

    const newEvents = calendarData.sort(sortFn("asc")).filter(event => {
      let now = new Date()
      now.setDate(now.getDate() - 1)
      return new Date(event.date.end) > now
    })

    const oldEvents = calendarData.sort(sortFn("desc")).filter(event => {
      let now = new Date()
      now.setDate(now.getDate() - 1)
      return new Date(event.date.end) < now
    })

    return {
      upcomingEvents: newEvents,
      passedEvents: oldEvents
    }
  }
}
</script>

<style scoped lang="scss">
.calendar {
  text-align: center;
  padding: 40px 0;
}
</style>
