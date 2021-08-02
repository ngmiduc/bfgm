const functions = require("firebase-functions")

const { Client } = require("@notionhq/client")

const DB = "54a05f4c38b645a893af5636e6fce91a"

exports.getEvents = functions.region("europe-west3").https.onCall(async () => {
  const notion = new Client({
    auth: functions.config().notion.key
  })

  const response = await notion.databases.query({
    database_id: DB,
    filter: {
      property: "status",
      select: {
        equals: "öffentliche VA"
      }
    }
  })

  return Promise.all(
    response.results.map(async c => {
      // const props = c.properties

      const res = await notion.pages.retrieve({
        page_id: c.id
      })

      console.log(res)

      return c
    })
  )
})
