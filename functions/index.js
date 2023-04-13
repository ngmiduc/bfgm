const functions = require("firebase-functions")

const { getEvents } = require("./src/getEvents")
const { getNextEvents } = require("./src/getNextEvents")
const { standardizeCalendar } = require("./src/standardizeCalendar")
const { transferAccounting } = require("./src/transferAccounting")
const { getReport } = require("./src/getReport")

exports.scheduleStandardizeCalendar = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Europe/London")
  .onRun(standardizeCalendar)

exports.runStandardizeCalendar = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .https.onCall(standardizeCalendar)

exports.scheduleTransferAccounting = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Europe/London")
  .onRun(transferAccounting)

exports.runTransferAccounting = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .https.onCall(transferAccounting)

exports.getReport = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .https.onCall(getReport)

exports.getEvents = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .https.onCall(getEvents)

exports.getNextEvents = functions
  .runWith({ secrets: ["NOTION_API_KEY"] })
  .region("europe-west3")
  .https.onCall(getNextEvents)
