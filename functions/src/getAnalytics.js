const _ = require("lodash")

const { DB } = require("./utils")

const calcCharges = (v, id) => ({
  key: id,
  balance: _.round(_.sumBy(v, "balance"), 2),
  income: _.round(_.sumBy(v, "income"), 2),
  outcome: _.round(_.sumBy(v, "outcome"), 2),
})

exports.getAnalytics = async ({ startDate, endDate }, context) => {
  console.log("Getting analytics...")
  console.log(startDate, endDate)

  console.log("Get latest accounting data...")

  const snapshot = await DB.collection("accounting")
    .orderBy("created_at", "desc")
    .limit(1)
    .get()

  let accountingId

  snapshot.forEach((doc) => {
    accountingId = doc.id
  })

  console.log("accountingId:", accountingId)
  console.log("Get transactions...")

  const accounting = await DB.collection("accounting")
    .doc(accountingId)
    .collection("transactions")
    // .where("date", ">=", new Date(startDate))
    // .where("date", "<=", new Date(endDate))
    .get()

  const transactions = []

  accounting.forEach((doc) => {
    const data = _.cloneDeep(doc.data())

    transactions.push(data)
  })

  console.log(`Got ${transactions.length} entries for accounting!`)

  const periodTransactions = _.chain(transactions).filter((i) => {
    const date = i.date.toDate()
    return date >= new Date(startDate) && date <= new Date(endDate)
  })

  const totalMonthlyCapiyal = _.chain(transactions)
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .orderBy((item) => new Date(`${item.key}-01`), "asc")
    .value()

  const analyticsMonthly = _.chain(periodTransactions)
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const analyticsMonthlyIDEEL = _.chain(periodTransactions)
    .filter((i) => i.tax_category === "IDEEL")
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const monthlyMembers = _.chain(periodTransactions)
    .filter(
      (i) =>
        i.tax_category === "IDEEL" && i.category === "2110 Mitgliedsbeiträge"
    )
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const monthlyFixCosts = _.chain(periodTransactions)
    .filter(
      (i) =>
        i.tax_category === "IDEEL" &&
        ![
          "2552 Ehrenamtspauschale",
          "2900 Sonstige Kosten",
          "0705 Geldtransit",
        ].includes(i.category)
    )
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const analyticsMonthlyZWECK = _.chain(periodTransactions)
    .filter((i) => i.tax_category === "ZWECK")
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const analyticsMonthlyWIRTS = _.chain(periodTransactions)
    .filter((i) => i.tax_category === "WIRTS")
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  const analyticsMonthlyVERMO = _.chain(periodTransactions)
    .filter((i) => i.tax_category === "VERMO")
    .groupBy((item) => item.date.toDate().toISOString().slice(0, 7))
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  return {
    totalMonthlyCapiyal,
    totalCapital: _.sumBy(transactions, "balance"),
    monthly: analyticsMonthly,
    monthlyMembers,
    monthlyFixCosts,
    monthlyIDEEL: analyticsMonthlyIDEEL,
    monthlyZWECK: analyticsMonthlyZWECK,
    monthlyWIRTS: analyticsMonthlyWIRTS,
    monthlyVERMO: analyticsMonthlyVERMO,
  }
}
