const _ = require("lodash")

const { DB } = require("./utils")

const calcCharges = (v, id) => ({
  key: id,
  balance: _.round(_.sumBy(v, "balance"), 2),
  income: _.round(_.sumBy(v, "income"), 2),
  outcome: _.round(_.sumBy(v, "outcome"), 2),
})

exports.getReport = async ({ startDate, endDate }, context) => {
  console.log("Getting report...")
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

    if (
      new Date(data.date.toDate()) < new Date(startDate) ||
      new Date(data.date.toDate()) > new Date(endDate)
    ) {
      data.balance = 0
      data.income = 0
      data.outcome = 0
    }

    transactions.push(data)
  })

  console.log(`Got ${transactions.length} entries for accounting!`)

  const reportAccounts = _.chain(transactions)
    .groupBy("account")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportAccounts:", reportAccounts)

  const reportTaxCategory = _.chain(transactions)
    .groupBy("tax_category")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportTaxCategory:", reportTaxCategory)

  const reportProjects = _.chain(transactions)
    .filter(
      (item) =>
        new Date(item.date.toDate()) >= new Date(startDate) &&
        new Date(item.date.toDate()) <= new Date(endDate)
    )
    .groupBy("project")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportProjects:", reportProjects)

  const reportIDEEL = _.chain(transactions)
    .filter((i) => i.tax_category === "IDEEL")
    .groupBy("category")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportIDEEL:", reportIDEEL)

  const reportZWECK = _.chain(transactions)
    .filter((i) => i.tax_category === "ZWECK")
    .groupBy("category")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportZWECK:", reportZWECK)

  const reportWIRTS = _.chain(transactions)
    .filter((i) => i.tax_category === "WIRTS")
    .groupBy("category")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportWIRTS:", reportWIRTS)

  const reportVERMO = _.chain(transactions)
    .filter((i) => i.tax_category === "VERMO")
    .groupBy("category")
    .mapValues((v, id) => calcCharges(v, id))
    .values()
    .value()

  // console.log("reportVERMO:", reportVERMO)

  return {
    accounts: reportAccounts,
    taxCats: reportTaxCategory,
    projects: reportProjects,
    taxIDEEL: reportIDEEL,
    taxZWECK: reportZWECK,
    taxWIRTS: reportWIRTS,
    taxVERMO: reportVERMO,
  }
}
