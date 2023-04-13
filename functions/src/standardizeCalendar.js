const { Client } = require("@notionhq/client")

const EVENTS_DATABASE_ID = "54a05f4c38b645a893af5636e6fce91a"

exports.standardizeCalendar = async () => {
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

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const { results: databasePages } = await notion.databases.query({
    database_id: EVENTS_DATABASE_ID,
    filter: {
      property: "status",
      select: {
        is_empty: true,
      },
    },
  })

  console.log("Query Notion Calendar Database")
  console.log(`Found total ${databasePages.length} entries in calendar!`)

  await Promise.all(
    databasePages
      .filter((item) => item.properties.status.select === null)
      .map(async (_page) =>
        notion.pages
          .update({
            page_id: _page.id,
            properties: {
              status: {
                select: { name: "intern" },
              },
            },
          })
          .then(() => {
            console.log(
              `Update ${
                _page.properties.Name.title[0]?.plain_text || _page.id
              }: SET status=intern`
            )
          })
      )
  )
}
