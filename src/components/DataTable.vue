<template>
  <div class="datatable">
    <DataTable
      size="small"
      :pagination="false"
      :dataSource="data"
      :columns="schema"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'balance'">
          <span class="num">
            <!-- <rise-outlined :style="{ color: 'green' }" /> -->
            <!-- <fall-outlined :style="{ color: 'red' }" /> -->
            <strong class="num">
              {{
                new Intl.NumberFormat("de", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(record.balance)
              }}
            </strong></span
          >
        </template>

        <template v-if="column.key === 'income'">
          <span class="num">
            {{
              new Intl.NumberFormat("de", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(record.income)
            }}
          </span>
        </template>

        <template v-if="column.key === 'outcome'">
          <span class="num">
            {{
              new Intl.NumberFormat("de", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(record.outcome)
            }}
          </span>
        </template>
      </template>
    </DataTable>
  </div>
</template>

<script>
import "ant-design-vue/dist/antd.css"
// import { RiseOutlined, FallOutlined } from "@ant-design/icons-vue"
import { Table } from "ant-design-vue"

export default {
  name: "component-datatable",
  components: {
    DataTable: Table,
    // RiseOutlined,
    // FallOutlined,
  },

  props: ["data", "schema"],
}
</script>

<style scoped lang="scss">
.datatable {
  .num {
    font-size: 12px;
    font-family: "Courier New", Courier, monospace !important;
  }
}
</style>
