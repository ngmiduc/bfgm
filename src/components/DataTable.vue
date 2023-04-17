<template>
  <div class="datatable">
    <DataTable
      size="small"
      :pagination="false"
      :dataSource="records"
      :columns="
        periods
          ? [
              {
                title: '',
                dataIndex: 'key',
                key: 'key',
              },

              {
                title: periods.prevPeriod,
                children: [
                  {
                    title: '↗ Eingang',
                    dataIndex: 'income_prev',
                    key: 'income_prev',
                    align: 'right',
                    width: 125,
                  },
                  {
                    title: '↘ Ausgang',
                    dataIndex: 'outcome_prev',
                    key: 'outcome_prev',
                    align: 'right',
                    width: 125,
                  },
                  {
                    title: '∑ Balance',
                    dataIndex: 'balance_prev',
                    key: 'balance_prev',
                    align: 'right',
                    width: 125,
                  },
                ],
              },

              {
                title: periods.period,
                children: [
                  {
                    title: '↗ Eingang',
                    dataIndex: 'income',
                    key: 'income',
                    align: 'right',
                    width: 125,
                  },
                  {
                    title: '↘ Ausgang',
                    dataIndex: 'outcome',
                    key: 'outcome',
                    align: 'right',
                    width: 125,
                  },
                  {
                    title: '∑ Balance',
                    dataIndex: 'balance',
                    key: 'balance',
                    align: 'right',
                    width: 125,
                  },
                ],
              },
            ]
          : [
              {
                title: '',
                dataIndex: 'key',
                key: 'key',
              },

              {
                title: 'Eingang',
                dataIndex: 'income',
                key: 'income',
                align: 'right',
                width: 125,
              },
              {
                title: 'Ausgang',
                dataIndex: 'outcome',
                key: 'outcome',
                align: 'right',
                width: 125,
              },
              {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
                align: 'right',
                width: 125,
              },
            ]
      "
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'balance_prev'">
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
                }).format(record.balance_prev)
              }}
            </strong></span
          >
        </template>

        <template v-if="column.key === 'income_prev'">
          <span class="num">
            {{
              new Intl.NumberFormat("de", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(record.income_prev)
            }}
          </span>
        </template>

        <template v-if="column.key === 'outcome_prev'">
          <span class="num">
            {{
              new Intl.NumberFormat("de", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(record.outcome_prev)
            }}
          </span>
        </template>

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
import _ from "lodash"

export default {
  name: "component-datatable",
  components: {
    DataTable: Table,
    // RiseOutlined,
    // FallOutlined,
  },

  props: ["data", "prevData", "periods"],

  computed: {
    records() {
      return this.data && this.prevData
        ? [
            ..._.chain(
              _.zipWith(
                this.data,
                _.map(this.prevData, (item) =>
                  _.mapKeys(item, (v, key) => key + "_prev")
                ),
                (a, b) => ({ ...a, ...b })
              )
            )
              .orderBy((item) => Number(item.key.split(" ")[0]))
              .value(),
            {
              key: "TOTAL",
              balance: _.chain(this.data).sumBy("balance").value(),
              income: _.chain(this.data).sumBy("income").value(),
              outcome: _.chain(this.data).sumBy("outcome").value(),
              balance_prev: _.chain(this.prevData).sumBy("balance").value(),
              income_prev: _.chain(this.prevData).sumBy("income").value(),
              outcome_prev: _.chain(this.prevData).sumBy("outcome").value(),
            },
          ]
        : [
            ..._.chain(this.data)
              .orderBy((item) => Number(item.key.split(" ")[0]))
              .value(),
            {
              key: "TOTAL",
              balance: _.chain(this.data).sumBy("balance").value(),
              income: _.chain(this.data).sumBy("income").value(),
              outcome: _.chain(this.data).sumBy("outcome").value(),
            },
          ]
    },
  },
}
</script>

<style lang="scss">
.datatable {
  .ant-table-cell {
    padding: 0 !important;
  }
  .num {
    font-size: 12px;
    font-family: "Courier New", Courier, monospace !important;
  }
}
</style>
