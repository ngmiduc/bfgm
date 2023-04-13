const { Client } = require("@notionhq/client")
const { DB } = require("./utils")

const TRANSACTION_DATABASE_ID = "0370df006e744bee856b68e554f20f2d"

exports.transferAccounting = async () => {
  const newAccounting = await DB.collection("accounting").add({
    created_at: new Date(),
  })

  const accountingId = newAccounting.id

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  let hasMoreRecords = true
  let cursor = undefined
  let records = []

  while (hasMoreRecords) {
    const {
      results: databasePages,
      next_cursor: nextCursor,
      has_more: hasMore,
    } = await notion.databases.query({
      database_id: TRANSACTION_DATABASE_ID,
      start_cursor: cursor,
      filter: {
        and: [
          {
            property: "Belegnummer",
            rich_text: {
              is_not_empty: true,
            },
          },
          {
            property: "csv_konto",
            formula: {
              string: {
                is_not_empty: true,
              },
            },
          },
          {
            property: "Belegdatum",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Belegart",
            select: {
              is_not_empty: true,
            },
          },
          {
            property: "Beschreibung",
            title: {
              is_not_empty: true,
            },
          },
          {
            property: "csv_steuerbereich",
            formula: {
              string: {
                is_not_empty: true,
              },
            },
          },
          {
            property: "csv_verwendungszweck",
            formula: {
              string: {
                is_not_empty: true,
              },
            },
          },
          {
            or: [
              {
                property: "Einnahmen",
                number: {
                  is_not_empty: true,
                },
              },
              {
                property: "Ausgaben",
                number: {
                  is_not_empty: true,
                },
              },
            ],
          },
        ],
      },
    })

    console.log("Query Notion Transaktion Database")

    const items = await Promise.all(
      databasePages.map(async (_page) => {
        return _page
      })
    )

    records = [...records, ...items]

    if (hasMore) {
      cursor = nextCursor
    }

    hasMoreRecords = hasMore
  }

  console.log(`Found total ${records.length} entries in accounting!`)

  await Promise.all(
    records.map(async (record) => {
      await DB.collection("accounting")
        .doc(accountingId)
        .collection("transactions")
        .doc(record.id)
        .set({
          id: record.id,
          date: new Date(record.properties["Belegdatum"].date.start),
          tax_category: record.properties["csv_steuerbereich"].formula.string,
          transaction_id:
            record.properties["Belegnummer"].rich_text[0]?.plain_text,
          account: record.properties["csv_konto"].formula.string,
          title: record.properties["Beschreibung"].title[0]?.plain_text,
          type: record.properties["Belegart"].select.name,
          link: record.url,
          category: record.properties["csv_verwendungszweck"].formula.string,
          balance:
            record.properties["Einnahmen"].number ||
            -record.properties["Ausgaben"].number ||
            0,
          income: record.properties["Einnahmen"].number,
          outcome: record.properties["Ausgaben"].number,
          project: record.properties["csv_projekt"].formula.string || null,
          member: record.properties["csv_mitglied"].formula.string || null,
          year: record.properties["Jahr"].formula.string,
          last_edited_at: record.properties["letzte Änderung am"]
            .last_edited_time
            ? new Date(record.properties["letzte Änderung am"].last_edited_time)
            : null,
          created_at: new Date(record.properties["verbucht am"].created_time),
        })
    })
  )

  return Promise.resolve(`Transfered ${records.length} entries to firestore!`)
}
