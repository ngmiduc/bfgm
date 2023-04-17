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

    <div v-if="loading">
      <Loader />
    </div>
    <div v-else class="report">
      <TypoTitle mark :level="5">Vermögen</TypoTitle>
      <Divider />
      <Statistic title="Gesamtvermögen" :value="analytics.totalCapital" />

      <Divider />

      <Chart
        :options="{
          plotOptions: {
            series: {
              cumulative: true,
            },
          },
          title: {
            text: 'Vermögensverlauf',
            align: 'left',
          },
          credits: {
            enabled: false,
          },
          yAxis: {
            title: {
              enabled: false,
              text: '€',
            },
          },
          xAxis: {
            tickLength: 0,
            gridLineColor: '#ffffff',
            lineColor: '#ffffff',
            categories: analytics.totalMonthlyCapiyal.map((item) => item.key),
          },
          series: [
            {
              name: 'Vermögen',
              type: 'spline',
              data: analytics.totalMonthlyCapiyal.map(
                (item, index) =>
                  _.chain(analytics.totalMonthlyCapiyal.slice(0, index))
                    .sumBy('balance')
                    .value() + item.balance
              ),
            },
          ],
        }"
      />

      <Divider />

      <TypoTitle mark :level="4">Bericht {{ year.format("YYYY") }}</TypoTitle>
      <Divider />

      <Space wrap>
        <Statistic title="Gesamteinnahmen" :value="charges.total.totalIncome" />

        <Statistic title="Gesamtausgaben" :value="charges.total.totalOutcome" />

        <Statistic
          title="Ø Einnahmen / Monat"
          :value="charges.total.totalMonthlyIncome"
        />

        <Statistic
          title="Ø Ausgaben / Monat"
          :value="charges.total.totalMonthlyOutcome"
        />
      </Space>

      <Divider />

      <Space wrap>
        <Statistic title="Gesamtspenden" :value="charges.donations" />

        <Statistic title="Gesamtbeiträge" :value="charges.members" />

        <Statistic title="Ø Spenden / Monat" :value="charges.donations / 12" />

        <Statistic title="Ø Beiträge / Monat" :value="charges.members / 12" />
      </Space>

      <Divider />

      <Chart
        :options="{
          title: {
            text: 'Ein- und Ausgaben / Monat',
            align: 'left',
          },
          credits: {
            enabled: false,
          },
          yAxis: {
            title: {
              enabled: false,
              text: '€',
            },
          },
          xAxis: {
            tickLength: 0,
            gridLineColor: '#ffffff',
            lineColor: '#ffffff',
            categories: periodKeys,
          },
          series: [
            {
              name: 'Einnahmen',
              type: 'column',
              data: periodKeys.map(
                (key) =>
                  analytics.monthly.find((item) => item.key === key)?.income ||
                  0
              ),
              color: '#2ecc71',
            },

            {
              name: 'Ausgaben',
              type: 'column',
              data: periodKeys.map(
                (key) =>
                  analytics.monthly.find((item) => item.key === key)?.outcome ||
                  0
              ),
              color: '#e74c3c',
            },
          ],
        }"
      />

      <Divider />

      <TypoTitle mark :level="5">I Konten</TypoTitle>

      <Divider />
      <DataTable
        :data="report.accounts"
        :prevData="prevReport.accounts"
        :periods="periods"
      />

      <Divider />

      <TypoTitle mark :level="5">II Projekte</TypoTitle>
      <DataTable
        :data="report.projects.filter((item) => item.key !== 'null')"
      />

      <Divider />

      <TypoTitle mark :level="5">III Steuerklassen</TypoTitle>

      <Divider />

      <Chart
        :options="{
          plotOptions: {
            areaspline: {
              stacking: 'normal',
            },
          },
          chart: {
            type: 'areaspline',
          },
          title: {
            text: 'Einnahmen / Monat / Steuerklasse',
            align: 'left',
          },
          credits: {
            enabled: false,
          },
          yAxis: {
            title: {
              enabled: false,
              text: '€',
            },
          },
          xAxis: {
            tickLength: 0,
            gridLineColor: '#ffffff',
            lineColor: '#ffffff',
            categories: periodKeys,
          },
          series: [
            {
              name: 'IDEEL',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyIDEEL.find((i) => i.key === key)?.income || 0
              ),
              color: '#f1c40f',
              marker: {
                enabled: false,
              },
            },
            {
              name: 'ZWECK',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyZWECK.find((i) => i.key === key)?.income || 0
              ),
              marker: {
                enabled: false,
              },
              color: '#e74c3c',
            },
            {
              name: 'WIRTS',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyWIRTS.find((i) => i.key === key)?.income || 0
              ),
              marker: {
                enabled: false,
              },
              color: '#3498db',
            },
            {
              name: 'VERMO',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyVERMO.find((i) => i.key === key)?.income || 0
              ),
              marker: {
                enabled: false,
              },
              color: '#2ecc71',
            },
          ],
        }"
      />

      <Divider />

      <DataTable
        :data="report.taxCats"
        :prevData="prevReport.taxCats"
        :periods="periods"
      />

      <Divider />

      <TypoTitle mark :level="5">Ideeler Bereich</TypoTitle>
      <Divider />
      <Space wrap>
        <Statistic title="Gesamteinnahmen" :value="charges.ideel.totalIncome" />

        <Statistic title="Gesamtausgaben" :value="charges.ideel.totalOutcome" />

        <Statistic
          title="Ø Einnahmen / Monat"
          :value="charges.ideel.totalMonthlyIncome"
        />

        <Statistic
          title="Ø Ausgaben / Monat"
          :value="charges.ideel.totalMonthlyOutcome"
        />
      </Space>

      <Divider />

      <Chart
        :options="{
          title: {
            text: 'Fixkosten vs. Mitgliedsbeiträge / Monat',
            align: 'left',
          },
          credits: {
            enabled: false,
          },
          yAxis: {
            title: {
              enabled: false,
              text: '€',
            },
          },
          xAxis: {
            tickLength: 0,
            gridLineColor: '#ffffff',
            lineColor: '#ffffff',
            categories: periodKeys,
          },
          series: [
            {
              name: 'Fixkosten',
              type: 'spline',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyFixCosts.find((i) => i.key === key)
                    ?.outcome || 0
              ),
              color: '#e74c3c',
              marker: {
                enabled: false,
              },
            },
            {
              name: 'Mitgliedsbeiträge',
              type: 'spline',
              data: periodKeys.map(
                (key) =>
                  analytics.monthlyMembers.find((i) => i.key === key)?.income ||
                  0
              ),
              color: '#3498db',
              marker: {
                enabled: false,
              },
            },
          ],
        }"
      />

      <Divider />
      <DataTable
        :data="report.taxIDEEL"
        :prevData="prevReport.taxIDEEL"
        :periods="periods"
      />

      <Divider />

      <TypoTitle mark :level="5">Zweckbereich</TypoTitle>
      <Divider />
      <Space wrap>
        <Statistic title="Gesamteinnahmen" :value="charges.zweck.totalIncome" />

        <Statistic title="Gesamtausgaben" :value="charges.zweck.totalOutcome" />

        <Statistic
          title="Ø Einnahmen / Monat"
          :value="charges.zweck.totalMonthlyIncome"
        />

        <Statistic
          title="Ø Ausgaben / Monat"
          :value="charges.zweck.totalMonthlyOutcome"
        />
      </Space>
      <Divider />
      <DataTable
        :data="report.taxZWECK"
        :prevData="prevReport.taxZWECK"
        :periods="periods"
      />

      <Divider />

      <TypoTitle mark :level="5">Wirtschaftlicher Bereich</TypoTitle>
      <Divider />
      <Space wrap>
        <Statistic title="Gesamteinnahmen" :value="charges.wirts.totalIncome" />

        <Statistic title="Gesamtausgaben" :value="charges.wirts.totalOutcome" />

        <Statistic
          title="Ø Einnahmen / Monat"
          :value="charges.wirts.totalMonthlyIncome"
        />

        <Statistic
          title="Ø Ausgaben / Monat"
          :value="charges.wirts.totalMonthlyOutcome"
        />
      </Space>
      <Divider />
      <DataTable
        :data="report.taxWIRTS"
        :prevData="prevReport.taxWIRTS"
        :periods="periods"
      />

      <Divider />

      <TypoTitle mark :level="5">Vermögensbereich</TypoTitle>
      <Divider />
      <Space wrap>
        <Statistic title="Gesamteinnahmen" :value="charges.vermo.totalIncome" />

        <Statistic title="Gesamtausgaben" :value="charges.vermo.totalOutcome" />

        <Statistic
          title="Ø Einnahmen / Monat"
          :value="charges.vermo.totalMonthlyIncome"
        />

        <Statistic
          title="Ø Ausgaben / Monat"
          :value="charges.vermo.totalMonthlyOutcome"
        />
      </Space>
      <Divider />
      <DataTable
        :data="report.taxVERMO"
        :prevData="prevReport.taxVERMO"
        :periods="periods"
      />
    </div>
  </div>
</template>

<script>
import "ant-design-vue/dist/antd.css"

import { ref, watchEffect, computed } from "vue"
import { Chart } from "highcharts-vue"
import { CloudFunctions } from "@/services/firebase.js"
import Loader from "@/components/Loader.vue"
import Statistic from "@/components/Stat.vue"
import DataTable from "@/components/DataTable.vue"
import { DatePicker, Divider, Typography, Space } from "ant-design-vue"
import dayjs from "dayjs"
import _ from "lodash"

export default {
  name: "finance-page",
  components: {
    Chart,
    Loader,
    DatePicker,
    Divider,
    DataTable,
    Statistic,
    TypoTitle: Typography.Title,
    Space,
  },
  async setup() {
    const year = ref(dayjs())
    const loading = ref(true)
    const report = ref({})
    const analytics = ref({})
    const prevReport = ref({})

    const handleChange = (val) => {
      year.value = val
    }

    watchEffect(async () => {
      const fetchReport = async (startDate, endDate) => {
        const { data } = await CloudFunctions("getReport")({
          startDate,
          endDate,
        })
        return data
      }

      const fetchAnalytics = async (startDate, endDate) => {
        const { data } = await CloudFunctions("getAnalytics")({
          startDate,
          endDate,
        })
        return data
      }

      loading.value = true

      const [anaData, data, prevData] = await Promise.all([
        fetchAnalytics(
          year.value.add(-1, "year").startOf("year").format("YYYY-MM-DD"),
          year.value.endOf("year").format("YYYY-MM-DD")
        ),
        fetchReport(
          year.value.startOf("year").format("YYYY-MM-DD"),
          year.value.endOf("year").format("YYYY-MM-DD")
        ),
        fetchReport(
          year.value.add(-1, "year").startOf("year").format("YYYY-MM-DD"),
          year.value.add(-1, "year").endOf("year").format("YYYY-MM-DD")
        ),
      ])

      loading.value = false

      report.value = data
      prevReport.value = prevData
      analytics.value = anaData
    })

    return {
      _,
      year,
      handleChange,
      report,
      analytics,
      loading,
      prevReport,
      periodKeys: computed(() => {
        const r = [
          ...new Array(12)
            .fill(null)
            .map(
              (i, index) =>
                `${year.value.year() - 1}-${(index + 1)
                  .toFixed(0)
                  .padStart(2, "0")}`
            ),

          ...new Array(12)
            .fill(null)
            .map(
              (i, index) =>
                `${year.value.year()}-${(index + 1)
                  .toFixed(0)
                  .padStart(2, "0")}`
            ),
        ]

        return r
      }),
      periods: computed(() => {
        return {
          period: year.value.format("YYYY"),
          prevPeriod: year.value.add(-1, "year").format("YYYY"),
        }
      }),
      charges: computed(() => {
        if (!report.value)
          return {
            donations: 0,
            members: 0,
            total: {},
            ideel: {},
            zweck: {},
            wirts: {},
            vermo: {},
          }

        return {
          totalCapital: _.chain(report.value.accounts).sumBy("balance").value(),
          donations:
            _.chain(report.value.taxIDEEL)
              .find({ key: "3220 Erhaltene Spenden / Zuwendungen" })
              .value()?.income || 0,
          members:
            _.chain(report.value.taxIDEEL)
              .find({ key: "2110 Mitgliedsbeiträge" })
              .value()?.income || 0,
          total: {
            totalIncome: _.chain(report.value.accounts).sumBy("income").value(),
            totalMonthlyIncome:
              _.chain(report.value.accounts).sumBy("income").value() / 12,
            totalOutcome: _.chain(report.value.accounts)
              .sumBy("outcome")
              .value(),
            totalMonthlyOutcome:
              _.chain(report.value.accounts).sumBy("outcome").value() / 12,
          },
          ideel: {
            totalIncome: report.value.taxCats.find(
              (item) => item.key === "IDEEL"
            ).income,
            totalMonthlyIncome:
              report.value.taxCats.find((item) => item.key === "IDEEL").income /
              12,
            totalOutcome: report.value.taxCats.find(
              (item) => item.key === "IDEEL"
            ).outcome,
            totalMonthlyOutcome:
              report.value.taxCats.find((item) => item.key === "IDEEL")
                .outcome / 12,
          },
          zweck: {
            totalIncome: report.value.taxCats.find(
              (item) => item.key === "ZWECK"
            ).income,
            totalMonthlyIncome:
              report.value.taxCats.find((item) => item.key === "ZWECK").income /
              12,
            totalOutcome: report.value.taxCats.find(
              (item) => item.key === "ZWECK"
            ).outcome,
            totalMonthlyOutcome:
              report.value.taxCats.find((item) => item.key === "ZWECK")
                .outcome / 12,
          },
          wirts: {
            totalIncome: report.value.taxCats.find(
              (item) => item.key === "WIRTS"
            ).income,
            totalMonthlyIncome:
              report.value.taxCats.find((item) => item.key === "WIRTS").income /
              12,
            totalOutcome: report.value.taxCats.find(
              (item) => item.key === "WIRTS"
            ).outcome,
            totalMonthlyOutcome:
              report.value.taxCats.find((item) => item.key === "WIRTS")
                .outcome / 12,
          },
          vermo: {
            totalIncome: report.value.taxCats.find(
              (item) => item.key === "VERMO"
            ).income,
            totalMonthlyIncome:
              report.value.taxCats.find((item) => item.key === "VERMO").income /
              12,
            totalOutcome: report.value.taxCats.find(
              (item) => item.key === "VERMO"
            ).outcome,
            totalMonthlyOutcome:
              report.value.taxCats.find((item) => item.key === "VERMO")
                .outcome / 12,
          },
        }
      }),
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  padding: 16px;
  background-color: white;

  .report {
    margin-top: 16px;
    margin-bottom: 600px;
  }
}
</style>
