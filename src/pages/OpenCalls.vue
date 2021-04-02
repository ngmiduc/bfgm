<template>
  <div class="open-calls">
    <a-typography-title v-if="upcomingEvents.length !== 0" :level="2">
      Aktuelle Ausschreibungen
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
        <CalOpen :event="event" :isActual="true" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios"

import CalOpen from "@/components/OpenCall.vue"

export default {
  name: "open-calls",
  components: {
    CalOpen
  },
  async setup() {
    const getNotionData = async () => {
      const {
        data: { result }
      } = await axios.get(
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:5000/bfgm-open-calls"
          : "https://bfgm.herokuapp.com/bfgm-open-calls"
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

    const newEvents = calendarData.sort(sortFn("asc"))

    return {
      upcomingEvents: newEvents
    }
  }
}
</script>

<style scoped lang="scss">
.open-calls {
  text-align: center;
  padding: 40px 0;
}
</style>
