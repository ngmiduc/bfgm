const functions = require("firebase-functions")

const { Client } = require("@notionhq/client")

const express = require("express")
const bodyParser = require("body-parser")

const DB = "54a05f4c38b645a893af5636e6fce91a"
// const DB_TRANSACTIONS = "0370df006e744bee856b68e554f20f2d"
// const DB_ACCOUNTS = "4d916526a06d49a9af1834579b7bcc35"
// const DB_TYPES = "6c1860d362344d6e8fc1e63ff23afd7b"
// const DB_TAXAREAS = "4ea16c1beae64affa75395aaa320abe5"

const app = express()
const api = express()

api.use("/api/v1", app)
api.use(bodyParser.json())

const standardizeCalendar = async () => {
  const notion = new Client({
    auth: functions.config().notion.key,
  })

  const { results: databasePages } = await notion.databases.query({
    database_id: DB,
  })
  console.log("Query Notion Calendar Database")
  console.log(`Found total ${databasePages.length} entries in calendar!`)

  await Promise.all(
    databasePages
      .filter((item) => item.properties.status.select === null)
      .map(async (_page) =>
        notion.pages.update({
          page_id: _page.id,
          properties: {
            status: {
              select: { name: "intern" },
            },
          },
        })
      )
  )
  console.log("Update Calendar entries with no status!")

  await Promise.all(
    databasePages
      .filter((item) => item.properties.Veranstalter.select === null)
      .map(async (_page) =>
        notion.pages.update({
          page_id: _page.id,
          properties: {
            Veranstalter: { select: { name: "<kein>" } },
          },
        })
      )
  )
  console.log("Update Calendar entries with no VA!")

  await Promise.all(
    databasePages
      .filter((item) => item.properties.Format.multi_select.length === 0)
      .map(async (_page) =>
        notion.pages.update({
          page_id: _page.id,
          properties: {
            Format: { multi_select: [{ name: "<kein>" }] },
          },
        })
      )
  )
  console.log("Update Calendar entries with no format!")
}

exports.webApi = functions.region("europe-west3").https.onRequest(api)

app.get("/events", async (req, res) => {
  const notion = new Client({
    auth: functions.config().notion.key,
  })

  const { results: databasePages } = await notion.databases.query({
    database_id: DB,
    filter: {
      property: "status",
      select: {
        equals: "öffentliche VA",
      },
    },
  })

  const events = await Promise.all(
    databasePages.map(async (_page) => {
      const page = await notion.pages.retrieve({
        page_id: _page.id,
      })

      const content = page.properties

      return {
        id: _page.id,
        title: content.Name.title.map((item) => item.plain_text)[0],
        subtitle: content.webseite_untertitel.rich_text.map(
          (item) => item.plain_text
        ),
        description: content.webseite_text.rich_text.map(
          (item) => item.plain_text
        ),
        date: content.Datum.date,
        link: content.link.url,
        icon: page.icon?.emoji,
        cover: ((cover) => {
          if (!cover) return null

          switch (cover.type) {
            case "file":
              return cover.file.url
            case "external":
              return cover.external.url

            default:
              return null
          }
        })(page.cover),
      }
    })
  )

  res.json(events)
})

exports.scheduleStandardizeCalendar = functions
  .region("europe-west3")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Europe/London")
  .onRun(async () => {
    console.log("Run schedule standardize calendar")
    console.log(
      "Time: ",
      new Date().toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )

    await standardizeCalendar()
  })

exports.runStandardizeCalendar = functions
  .region("europe-west3")
  .https.onCall(async () => {
    console.log("Execute standardize calendar")

    await standardizeCalendar()
  })

exports.getEvents = functions.region("europe-west3").https.onCall(async () => {
  console.log("Get public calendar events!")

  const notion = new Client({
    auth: functions.config().notion.key,
  })

  const { results: databasePages } = await notion.databases.query({
    database_id: DB,
    filter: {
      property: "status",
      select: {
        equals: "öffentliche VA",
      },
    },
  })

  const events = Promise.all(
    databasePages.map(async (_page) => {
      const page = await notion.pages.retrieve({
        page_id: _page.id,
      })

      const content = page.properties

      return {
        id: _page.id,
        title: content.Name.title.map((item) => item.plain_text)[0],
        subtitle: content.webseite_untertitel.rich_text.map(
          (item) => item.plain_text
        ),
        description: content.webseite_text.rich_text.map(
          (item) => item.plain_text
        ),
        date: content.Datum.date,
        link: content.link.url,
        icon: page.icon?.emoji,
        cover: ((cover) => {
          if (!cover) return null

          switch (cover.type) {
            case "file":
              return cover.file.url
            case "external":
              return cover.external.url

            default:
              return null
          }
        })(page.cover),
      }
    })
  )

  return events
})

// exports.getTransactions = functions
//   .region("europe-west3")
//   .https.onCall(async () => {
//     console.log("Get accounting data!")
//
//     const notion = new Client({
//       auth: functions.config().accounting.key,
//     })
//
//     let end = false
//
//     // while (!end){
//
//     const { results: databasePages } = await notion.databases.query({
//       database_id: DB_TRANSACTIONS,
//       page_size: 100,
//     })
//
//     return databasePages.has_more
//
//     const data = databasePages.map((_page) => ({
//       id: _page.id,
//       title: _page.properties.Beschreibung.title.map(
//         (item) => item.plain_text
//       )[0],
//     }))
//
//     // }
//
//     return data.length
//   })
