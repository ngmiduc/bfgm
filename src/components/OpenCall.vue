<template>
  <div class="event-content" :class="{ passed: isActual === false }">
    <img v-if="event.cover" :src="event.cover" alt="cover-image" />

    <div class="content">
      <span class="date">
        Einsendungen von
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
        bis zum
        {{
          new Date(event.date.end).toLocaleDateString("de-DE", {
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
        <span class="type" v-for="ttypeName in event.type" :key="ttypeName">{{
          ttypeName
        }}</span>
      </div>

      <p>
        <a
          :href="event.link"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          > weblink
        </a>
      </p>

      <h3>{{ event.icon }} {{ event.title }}</h3>
      <h4>{{ event.sub_title }}</h4>

      <p v-for="(paragraph, index) in event.description" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "component-open-call",
  props: ["event", "isActual"]
}
</script>

<style scoped lang="scss">
.event-content {
  border-radius: 8px;
  border: 1px dashed rgba(126, 126, 126, 0.5);
  overflow: hidden;
  transition: all 300ms;

  // background-color: rgba(83, 117, 154, 0.3);
  // box-shadow: 0 5px 5px 10px rgba(34, 14, 161, 0.1);

  &.passed {
    opacity: 0.6;
    background-color: transparent;
    box-shadow: none;

    &:hover {
      opacity: 1;
    }
  }

  img {
    height: 20rem;
    width: 100%;
    border-bottom: 1px dashed rgba(126, 126, 126, 0.5);

    @media (max-width: 550px) {
      height: 350px;
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
        background-color: rgba(129, 175, 164, 1);
        color: white;
        margin-right: 8px;
        border-radius: 2px;
        padding: 2px 4px;
      }
    }

    p {
      line-height: 18px;

      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>
