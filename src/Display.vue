<template>
  <div class="container">
    <carousel
      :items-to-show="1.25"
      :autoplay="30000"
      :wrap-around="true"
      v-if="events.length > 0"
    >
      <slide v-for="event in events" :key="event.id">
        <div class="event-content">
          <img
            :src="
              event.cover
                ? event.cover
                : 'data:image/png;base64,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'
            "
          />

          <div class="an" v-if="event.daysLeft > 1">
            In {{ event.daysLeft }} Tagen!
          </div>
          <div class="an" v-if="event.daysLeft === 0">Heute!</div>
          <div class="an" v-if="event.daysLeft === 1">Morgen!</div>

          <h1>
            {{ (event.icon || "") + " " + event.title }}
          </h1>

          <h2 v-if="event.subtitle.length">
            {{ event.subtitle }}
          </h2>

          <div class="web">
            <a
              v-if="event.link"
              key="link"
              :href="
                event.link.includes('http')
                  ? event.link
                  : `https://${event.link}`
              "
              target="_blank"
              rel="noreferrer"
            >
              {{
                event.link
                  .replace(`https://`, "")
                  .replace(`http://`, "")
                  .split("/")[0]
              }}
            </a>
          </div>

          <div class="dates">
            <span>
              {{
                new Date(event.date.start)
                  .toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(", 00:00", "")
              }}
            </span>
          </div>
        </div>
      </slide>
    </carousel>

    <div v-else class="event-content">
      <div>
        .<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />.<br />
      </div>
      <h2>Nichts los demnächst...</h2>

      <h1>Interesse?</h1>
      <h2>Schreib uns an: - <i>hi@bfgm.eu</i> - !</h2>
    </div>
  </div>
</template>

<script>
import { CloudFunctions } from "@/services/firebase.js"
// import Loader from "./components/Loader.vue"
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css"
import { Carousel, Slide } from "vue3-carousel"

export default {
  name: "page-display",
  components: { Carousel, Slide },
  async setup() {
    const getNotionData = async () => {
      const { data } = await CloudFunctions("getNextEvents")()

      return data
    }

    const events = await getNotionData()

    const sortFn =
      (direction = "asc") =>
      (a, b) => {
        const eventA = new Date(a.date.end || a.date.start)
        const eventB = new Date(b.date.end || b.date.start)
        return direction === "asc" ? eventA - eventB : eventB - eventA
      }

    const newEvents = events
      .sort(sortFn("asc"))
      .filter((event) => {
        let now = new Date()
        now.setDate(now.getDate() - 1)
        return new Date(event.date.end) > now
      })
      .map((event) => {
        const eventDate = new Date(event.date.start.split("T")[0])
        const today = new Date(new Date().toISOString().split("T")[0])

        const Difference_In_Time = eventDate.getTime() - today.getTime()

        // To calculate the no. of days between two dates
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

        return { ...event, daysLeft: Difference_In_Days }
      })

    console.log({ newEvents })

    return {
      events: newEvents,
    }
  },
}
</script>

<style scoped lang="scss">
.event-content {
  box-sizing: border-box;

  * {
    text-align: left;
  }

  padding: 40px;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 10, 0.9);

  color: white;

  .an {
    margin-top: 12px;
    margin-bottom: 20px;
    font-size: 95px;
    font-style: italic;
  }

  a {
    color: white;
    text-decoration: none;
  }

  h1 {
    font-size: 70px;
    text-decoration: underline;
    margin-top: 0;
    color: white;
  }

  h2 {
    color: white;
    font-size: 60px;
  }

  img {
    border-radius: 4px;
    width: 100%;
    height: 50vh;
    object-fit: cover;
  }

  .web {
    text-align: left;

    font-size: 40px;
  }

  .dates {
    text-align: left;

    font-size: 50px;
  }
}
</style>
