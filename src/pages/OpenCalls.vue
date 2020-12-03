<template>
  <div class="open-calls">
    <h2>Aktuelle Ausschreibungen</h2>

    <ul>
      <li v-for="event in upcomingEvents" :key="event.id">
        <CalOpen :event="event" :isActual="true" />
      </li>
    </ul>
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
  width: 100vw;

  h2 {
    text-align: center;
  }

  ul {
    margin: 0;
    padding: 24px;
    list-style: none;

    display: flex;
    flex-wrap: wrap;

    li {
      width: 350px;
      margin: 16px;

      @media (max-width: 1050px) {
        width: 40%;
        flex-grow: 1;
      }

      @media (max-width: 550px) {
        width: 100%;
        flex-grow: 1;
      }
    }
  }
}
</style>
