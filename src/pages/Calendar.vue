<template>
  <div class="calendar">
    <h2>Aktuelle Maßnahmen</h2>

    <ul>
      <li v-for="event in upcomingEvents" :key="event.id">
        <CalEvent :event="event" :isActual="true" />
      </li>
    </ul>

    <h2>Vergangene Maßnahmen</h2>
    <ul>
      <li v-for="event in passedEvents" :key="event.id">
        <CalEvent :event="event" :isActual="false" />
      </li>
    </ul>
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
      } = await axios.get("https://bfgm.herokuapp.com/bfgm-calendar")

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

    console.log(calendarData)

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
