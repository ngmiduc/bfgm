<template>
  <div class="calendar">
    <h2>Veranstaltungen</h2>

    <ul>
      <li v-for="event in notion" :key="event.id">
        <img v-if="event.cover" :src="event.cover" alt="cover-image" />

        <div class="content">
          <span class="date">
            {{
              new Date(event.date.start).toLocaleDateString("de-DE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC"
              })
            }}
          </span>
          <div class="types">
            <span
              class="type"
              v-for="ttypeName in event.type"
              :key="ttypeName"
              >{{ ttypeName }}</span
            >
          </div>

          <h3>{{ event.icon }} {{ event.title }}</h3>
          <h4>{{ event.sub_title }}</h4>

          <p>
            {{ event.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "calendar",

  async setup() {
    const getNotionData = async () => {
      const {
        data: { result }
      } = await axios.get("https://bfgm.herokuapp.com/bfgm-calendar")

      return result
    }

    const notion = await getNotionData()

    return {
      notion: notion
        .sort((a, b) => new Date(a.date.start) - new Date(b.date.start))
        .filter(event => {
          let now = new Date()
          now.setDate(now.getDate() - 14)
          return new Date(event.date.start) > now && !event.anfrage
        })
        .map(event => ({
          ...event,
          cover: event.cover
            ? event.cover.indexOf("https://") !== -1
              ? "https://www.notion.so/image/" +
                event.cover.replace(/\//g, "%2F").replace(/:/g, "%3A") +
                "?table=block&id=" +
                event.id
              : "https://www.notion.so" + event.cover
            : null
        }))
        .filter(event => event.is_public)
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

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    li {
      overflow: hidden;

      margin: 16px;
      background-color: rgb(222, 217, 176);
      border-radius: 4px;
      box-shadow: 0 3px 15px 5px rgba(22, 66, 102, 0.1);
      border: 1px solid rgba(156, 152, 122, 0.1);
      transition: all 300ms;

      &:hover {
        box-shadow: 0 3px 15px 5px rgba(22, 66, 102, 0.15);
        border: 1px solid rgba(156, 152, 122, 0.15);
      }

      img {
        height: 150px;
        width: 100%;

        @media (max-width: 550px) {
          height: 250px;
        }

        object-fit: cover;
        object-position: center;
      }

      .content {
        padding: 8px;

        h3 {
          line-height: 17px;
        }
        h4 {
          line-height: 13px;
          font-weight: normal;
          font-style: italic;
        }

        .date {
        }

        .types {
          .type {
            font-size: 12px;
            background-color: rgb(85, 115, 108);
            color: white;
            margin-right: 8px;
            border-radius: 8px;
            padding: 4px 8px;
          }
        }

        p {
          line-height: 13px;
        }
      }
    }
  }
}
</style>
