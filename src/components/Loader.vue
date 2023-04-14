<template>
  <div class="loading"><loading-outlined /></div>
</template>

<script>
import { LoadingOutlined } from "@ant-design/icons-vue"

export default {
  name: "component-loader",
  components: { LoadingOutlined },
}
</script>
<style scoped lang="scss">
.loading {
  text-align: center;
  padding: 50px;
}
</style>
