const { Client } = require("@notionhq/client");

const EVENTS_DATABASE_ID = "54a05f4c38b645a893af5636e6fce91a";

exports.getEvents = async () => {
  console.log("Get public calendar events!");

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const { results: databasePages } = await notion.databases.query({
    database_id: EVENTS_DATABASE_ID,
    filter: {
      property: "status",
      select: {
        equals: "öffentliche VA",
      },
    },
  });

  const events = Promise.all(
    databasePages.map(async (_page) => {
      // const page = await notion.pages.retrieve({
      //   page_id: _page.id,
      // })

      const content = _page.properties;

      return {
        id: _page.id,
        title: content.Name.title.map((item) => item.plain_text)[0],
        subtitle: content.untertitel.rich_text.map((item) => item.plain_text),
        description: content.beschreibung.rich_text.map(
          (item) => item.plain_text
        ),
        date: content.Datum.date,
        link: content.link.url,
        icon: _page.icon?.emoji,
        cover: ((cover) => {
          if (!cover) return null;

          switch (cover.type) {
            case "file":
              return cover.file.url;
            case "external":
              return cover.external.url;

            default:
              return null;
          }
        })(_page.cover),
      };
    })
  );

  return events;
};
