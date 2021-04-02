<template>
  <a-row :gutter="32" type="flex" justify="center">
    <a-col>
      <LoadingOutlined :style="{ fontSize: '32px', margin: '60px 0px' }" />
    </a-col>
  </a-row>
</template>

<script>
import { LoadingOutlined } from "@ant-design/icons-vue"

export default {
  name: "loader",
  components: { LoadingOutlined }
}
</script>
