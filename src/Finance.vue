<template>
  <div class="container">
    <TypoTitle :level="4">BFGM.E.V. Jahresbericht</TypoTitle>

    Der EÜR (Einnahmen-Überschuss-Rechnung) ist ein wichtiger Bestandteil des
    Finanzjahresberichts. In diesem Dokument werden die Konten des Unternehmens
    aufgeführt sowie die Mittelverwendung in allen Projekten detailliert
    beschrieben. Die verschiedenen Steuerklassen, in die das Unternehmen
    unterteilt ist, werden ebenfalls aufgeführt und deren spezifische
    Kontorahmen verlinkt. Bitte beachten Sie, dass die folgenden Informationen
    vorläufig sind und sich Änderungen ergeben können.

    <Divider />

    <DatePicker
      :value="year"
      @change="handleChange"
      format="YYYY"
      picker="year"
    />

    <Divider />

    <TypoTitle :level="5">I Konten</TypoTitle>

    <DataTable
      :data="report.accounts"
      :prevData="prevReport.accounts"
      :periods="periods"
    />

    <Divider />

    <TypoTitle :level="5">II Projekte</TypoTitle>
    <DataTable :data="report.projects" />

    <Divider />

    <TypoTitle :level="5">III Steuerklassen</TypoTitle>
    <DataTable
      :data="report.taxCats"
      :prevData="prevReport.taxCats"
      :periods="periods"
    />

    <Divider />

    <TypoTitle :level="5">Ideeler Bereich</TypoTitle>
    <DataTable
      :data="report.taxIDEEL"
      :prevData="prevReport.taxIDEEL"
      :periods="periods"
    />

    <Divider />

    <TypoTitle :level="5">Zweckbereich</TypoTitle>
    <DataTable
      :data="report.taxZWECK"
      :prevData="prevReport.taxZWECK"
      :periods="periods"
    />

    <Divider />

    <TypoTitle :level="5">Wirtschaftlicher Bereich</TypoTitle>
    <DataTable
      :data="report.taxWIRTS"
      :prevData="prevReport.taxWIRTS"
      :periods="periods"
    />

    <Divider />

    <TypoTitle :level="5">Vermögensbereich</TypoTitle>
    <DataTable
      :data="report.taxVERMO"
      :prevData="prevReport.taxVERMO"
      :periods="periods"
    />
  </div>
</template>

<script>
import "ant-design-vue/dist/antd.css"

import { ref, watchEffect, computed } from "vue"

import { CloudFunctions } from "@/services/firebase.js"
import DataTable from "@/components/DataTable.vue"
import { DatePicker, Divider, Typography } from "ant-design-vue"
import dayjs from "dayjs"

export default {
  name: "finance-page",
  components: {
    DatePicker,
    Divider,
    DataTable,
    TypoTitle: Typography.Title,
  },
  async setup() {
    const year = ref(dayjs())
    const report = ref({})
    const prevReport = ref({})

    const handleChange = (val) => {
      year.value = val
    }

    watchEffect(async () => {
      const fetch = async (startDate, endDate) => {
        const { data } = await CloudFunctions("getReport")({
          startDate,
          endDate,
        })

        return data
      }

      const data = await fetch(
        year.value.startOf("year").format("YYYY-MM-DD"),
        year.value.endOf("year").format("YYYY-MM-DD")
      )

      const prevData = await fetch(
        year.value.add(-1, "year").startOf("year").format("YYYY-MM-DD"),
        year.value.add(-1, "year").endOf("year").format("YYYY-MM-DD")
      )

      report.value = data
      prevReport.value = prevData
    })

    return {
      year,
      handleChange,
      report,
      prevReport,
      periods: computed(() => {
        return {
          period: year.value.format("YYYY"),
          prevPeriod: year.value.add(-1, "year").format("YYYY"),
        }
      }),
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
  padding: 16px;
  background-color: white;
}
</style>
