<template>
  <div class="container">
    <TypoTitle :level="2">BFGM.E.V. Jahresbericht</TypoTitle>

    <Divider />

    <RangePicker :value="range" @change="handleChange" format="YYYY-MM-DD" />

    <Divider />

    <TypoTitle :level="3">I Konten</TypoTitle>

    <DataTable :data="report.accounts" :schema="schema" />

    <Divider />

    <TypoTitle :level="3">II Projekte</TypoTitle>
    <DataTable :data="report.projects" :schema="schema" />

    <Divider />

    <TypoTitle :level="3">III Steuerklassen</TypoTitle>
    <DataTable :data="report.taxCats" :schema="schema" />

    <Divider />

    <TypoTitle :level="4">III.I Ideeler Bereich</TypoTitle>
    <DataTable :data="report.taxIDEEL" :schema="schema" />

    <Divider />

    <TypoTitle :level="4">III.II ZweckBereich</TypoTitle>
    <DataTable :data="report.taxZWECK" :schema="schema" />

    <Divider />

    <TypoTitle :level="4">III.III Wirtschaftlicher Bereich</TypoTitle>
    <DataTable :data="report.taxWIRTS" :schema="schema" />

    <Divider />

    <TypoTitle :level="4">III.IV Vermögensbereich</TypoTitle>
    <DataTable :data="report.taxVERMO" :schema="schema" />
  </div>
</template>

<script>
import "ant-design-vue/dist/antd.css"

import { ref, watchEffect } from "vue"

import { CloudFunctions } from "@/services/firebase.js"
import DataTable from "@/components/DataTable.vue"
import { DatePicker, Divider, Typography } from "ant-design-vue"
import dayjs from "dayjs"

export default {
  name: "finance-page",
  components: {
    RangePicker: DatePicker.RangePicker,
    Divider,
    DataTable,
    TypoTitle: Typography.Title,
  },
  async setup() {
    const range = ref([dayjs().startOf("year"), dayjs().endOf("year")])
    const report = ref({})

    const handleChange = (val) => {
      range.value = val
    }

    watchEffect(async () => {
      const fetch = async () => {
        const { data } = await CloudFunctions("getReport")({
          startDate: range.value[0].format("YYYY-MM-DD"),
          endDate: range.value[1].format("YYYY-MM-DD"),
        })

        return data
      }

      const data = await fetch()

      report.value = data
    })

    return {
      range,
      handleChange,
      report,
      dayjs,
      schema: [
        {
          title: "",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "income",
          dataIndex: "income",
          key: "income",
          align: "right",
          width: 125,
          customRender: ({ value }) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",

              // These options are needed to round to whole numbers if that's what you want.
              minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
              maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
            }).format(value)
          },
        },
        {
          title: "outcome",
          dataIndex: "outcome",
          key: "outcome",
          align: "right",
          width: 125,
          customRender: ({ value }) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",

              // These options are needed to round to whole numbers if that's what you want.
              minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
              maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
            }).format(value)
          },
        },
        {
          title: "balance",
          dataIndex: "balance",
          key: "balance",
          align: "right",
          width: 125,
          customRender: ({ value }) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",

              // These options are needed to round to whole numbers if that's what you want.
              minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
              maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
            }).format(value)
          },
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 100vw;
  padding: 50px 40px;
  background-color: white;
}
</style>
