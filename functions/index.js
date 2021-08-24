const functions = require("firebase-functions")

const { Client } = require("@notionhq/client")

const DB = "54a05f4c38b645a893af5636e6fce91a"

exports.getEvents = functions.region("europe-west3").https.onCall(async () => {
  const notion = new Client({
    auth: functions.config().notion.key
  })

  const { results: databasePages } = await notion.databases.query({
    database_id: DB,
    filter: {
      property: "status",
      select: {
        equals: "öffentliche VA"
      }
    }
  })

  const events = Promise.all(
    databasePages.map(async _page => {
      const page = await notion.pages.retrieve({
        page_id: _page.id
      })

      const content = page.properties

      return {
        id: _page.id,
        title: content.Name.title.map(item => item.plain_text)[0],
        subtitle: content.webseite_untertitel.rich_text.map(
          item => item.plain_text
        ),
        description: content.webseite_text.rich_text.map(
          item => item.plain_text
        ),
        date: content.Datum.date,
        link: content.link.url,
        icon: page.icon?.emoji,
        cover: (cover => {
          if (!cover) return null

          switch (cover.type) {
            case "file":
              return cover.file.url
            case "external":
              return cover.external.url

            default:
              return null
          }
        })(page.cover)
      }
    })
  )

  return events
})
