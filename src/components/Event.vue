<template>
  <div class="event-content" :class="{ passed: isActual === false }">
    <a-card hoverable>
      <template #cover>
        <a-image v-if="event.cover" width="100%" :src="event.cover" />
      </template>

      <template class="ant-card-actions" #actions>
        <a
          key="link"
          :href="
            event.link.includes('http') ? event.link : `https://${event.link}`
          "
          target="_blank"
          rel="noreferrer"
        >
          <send-outlined />
        </a>

        .
      </template>

      <a-card-meta
        :title="(event.icon || '') + ' ' + event.title"
        :description="event.sub_title"
      >
        <template #avatar></template>
      </a-card-meta>

      <div class="content">
        <a-space>
          <a-typography-text>
            {{
              new Date(event.date.start).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC"
              })
            }}
          </a-typography-text>
          <a-typography-text>
            {{
              event.date.end &&
                " -  " +
                  new Date(event.date.end).toLocaleDateString("de-DE", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC"
                  })
            }}
          </a-typography-text>
        </a-space>

        <a-space>
          <a-typography-text
            code
            v-for="ttypeName in event.type"
            :key="ttypeName"
          >
            {{ ttypeName }}
          </a-typography-text>
        </a-space>
      </div>

      <div class="content">
        <a-typography-paragraph
          :ellipsis="{ rows: 6, expandable: true, symbol: 'mehr' }"
          :content="event.description.join('\n')"
        >
        </a-typography-paragraph>
      </div>
    </a-card>
  </div>
</template>

<script>
import { SendOutlined } from "@ant-design/icons-vue"

export default {
  name: "component-event",
  props: ["event", "isActual"],
  components: {
    SendOutlined
  }
}
</script>

<style scoped lang="scss">
.event-content {
  transition: all 300ms;

  &.passed {
    opacity: 0.8;
    background-color: transparent;
    box-shadow: none;

    &:hover {
      opacity: 1;
    }
  }

  .content {
    margin-top: 16px;

    white-space: break-spaces;
    text-align: left;
  }
}
</style>
