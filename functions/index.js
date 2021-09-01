const functions = require("firebase-functions")

const { Client } = require("@notionhq/client")

const DB = "54a05f4c38b645a893af5636e6fce91a"

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

exports.scheduleStandardizeCalendar = functions
  .region("europe-west3")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Europe/London")
  .onRun(async () => {
    console.log("schedule standardize calendar")

    await standardizeCalendar()
  })

exports.runStandardizeCalendar = functions
  .region("europe-west3")
  .https.onCall(async () => {
    console.log("schedule standardize calendar")

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
