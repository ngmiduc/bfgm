<template>
  <Statistic
    :title="title"
    decimalSeparator=","
    groupSeparator="."
    :precision="2"
    :value="value"
    suffix="€"
    style="margin-right: 50px; width: 150px"
  />
</template>

<script>
import "ant-design-vue/dist/antd.css"

import { Statistic } from "ant-design-vue"

export default {
  name: "component-stat",
  props: ["title", "value"],
  components: {
    Statistic,
  },
}
</script>

<style scoped lang="scss"></style>
