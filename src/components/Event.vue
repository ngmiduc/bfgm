<template>
  <div class="event-content" :class="{ passed: isActual === false }">
    <img
      v-if="event.cover"
      :src="
        event.cover
          ? event.cover
          : 'data:image/png;base64,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'
      "
    />

    <div class="items">
      <h4>
        {{ (event.icon || "") + " " + event.title }}
      </h4>

      <h5 v-if="event.subtitle[0]">
        {{ event.subtitle }}
      </h5>

      <div class="dates">
        <a
          v-if="event.link"
          key="link"
          :href="
            event.link.includes('http') ? event.link : `https://${event.link}`
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
        <span>
          {{
            event.date.end &&
            (event.date.start.split("T")[0] === event.date.end.split("T")[0]
              ? " -  " +
                new Date(event.date.end)
                  .toLocaleDateString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .split(",")[1]
              : " -  " +
                new Date(event.date.end)
                  .toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(", 00:00", ""))
          }}
        </span>
      </div>

      <div class="content">
        <Paragraph :ellipsis="{ rows: 10, expandable: true, symbol: 'more' }">
          {{ event.description.join("") }}
        </Paragraph>
      </div>
    </div>
  </div>
</template>

<script>
import { Typography } from "ant-design-vue"
import { ref } from "vue"
export default {
  name: "component-event",
  props: ["event", "isActual"],
  components: {
    Paragraph: Typography.Paragraph,
  },

  setup() {
    return {
      ellipsis: ref(true),
    }
  },
}
</script>

<style scoped lang="scss">
.event-content {
  display: inline-block;
  // flex-direction: row;
  // align-items: flex-start;
  // justify-content: center;
  // margin: 4px;
  // width: 300px;
  // height: 400px;
  // background: rgba(10, 10, 10, 0.9);
  // padding: 2px;
  // border: 8px solid rgba(10, 10, 10, 0.9);
  // overflow-y: scroll;

  border-right: 1px solid rgba(10, 10, 10, 0.9);
  border-bottom: 1px solid rgba(10, 10, 10, 0.9);

  &:first-child {
    border-top: 1px solid rgba(10, 10, 10, 0.9);
  }
  // color: white;

  a,
  h5,
  h4 {
    // color: white;
  }

  h5,
  h4 {
    font-weight: bold;
  }

  transition: all 300ms;

  // border-radius: 8px;

  img {
    margin-right: 8px;
    // border-radius: 4px;
    float: left;
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: center;
    border: 1px solid rgba(10, 10, 10, 0.9);
    border-left: none;
    border-top: none;
  }

  .items {
    // border-left: 1px solid rgba(10, 10, 10, 0.9);
    min-height: 200px;
    padding-left: 8px;
  }

  // &.passed {
  opacity: 0.8;
  box-shadow: none;

  &:hover {
    opacity: 1;
  }
  // }

  .dates {
    text-align: left;
  }

  .content {
    margin-top: 16px;

    white-space: break-spaces;
    word-break: break-word;
    text-align: left;

    p {
      margin: 0;
    }
  }
}
</style>
