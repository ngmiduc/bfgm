const example = {
  object: "page",
  id: "c4f8dffb-abbc-49a6-be1f-b1fa1afbc7ed",
  created_time: "2023-03-08T12:25:00.000Z",
  last_edited_time: "2023-03-08T12:35:00.000Z",
  created_by: { object: "user", id: "f3c7bfef-72bd-40b6-adf0-bd2aa8938bc0" },
  last_edited_by: {
    object: "user",
    id: "f3c7bfef-72bd-40b6-adf0-bd2aa8938bc0",
  },
  cover: null,
  icon: null,
  parent: {
    type: "database_id",
    database_id: "0370df00-6e74-4bee-856b-68e554f20f2d",
  },
  archived: false,
  properties: {
    "zugewiesener Mitgliederbeitrag": {
      id: "%22gZ_",
      type: "relation",
      relation: [],
      has_more: false,
    },
    Einnahmen: { id: "%23Eb%7D", type: "number", number: null },
    Belegdatum: {
      id: "5gHA",
      type: "date",
      date: { start: "2023-02-02", end: null, time_zone: null },
    },
    "verbucht am": {
      id: "6R%3A5",
      type: "created_time",
      created_time: "2023-03-08T12:25:00.000Z",
    },
    "verbucht von": {
      id: "89%2CZ",
      type: "created_by",
      created_by: {
        object: "user",
        id: "f3c7bfef-72bd-40b6-adf0-bd2aa8938bc0",
      },
    },
    Ausgaben: { id: "8shg", type: "number", number: 39.99 },
    csv_steuerbereich: {
      id: "%3DVLp",
      type: "formula",
      formula: { type: "string", string: "IDEEL" },
    },
    "zugewiesener Projekt": {
      id: "F*-L",
      type: "relation",
      relation: [],
      has_more: false,
    },
    Konto: {
      id: "O%5B-H",
      type: "relation",
      relation: [{ id: "aaf704bb-c188-4abd-b548-6e9e21b7d121" }],
      has_more: false,
    },
    Monat: {
      id: "TaTJ",
      type: "formula",
      formula: { type: "string", string: "February" },
    },
    "letzte Änderung am": {
      id: "ZV%3FD",
      type: "last_edited_time",
      last_edited_time: "2023-03-08T12:35:00.000Z",
    },
    csv_projekt: {
      id: "_OKK",
      type: "formula",
      formula: { type: "string", string: "" },
    },
    csv_konto: {
      id: "%60bCV",
      type: "formula",
      formula: { type: "string", string: "GLS" },
    },
    Jahr: {
      id: "cBC1",
      type: "formula",
      formula: { type: "string", string: "2023" },
    },
    Verwendungszweck: {
      id: "f%26%22%3D",
      type: "relation",
      relation: [{ id: "0011bd8a-aeb6-4b7b-b88b-617d2e487b47" }],
      has_more: false,
    },
    Belegnummer: {
      id: "l!%7Cx",
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: { content: "818", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "818",
          href: null,
        },
      ],
    },
    Steuerbereich: {
      id: "mNB~",
      type: "relation",
      relation: [{ id: "d22ad90c-b30a-4b39-97fd-ef0803e6c7b6" }],
      has_more: false,
    },
    month_key: {
      id: "mTL%7B",
      type: "formula",
      formula: { type: "string", string: "2023-02" },
    },
    "letzte Änderung von": {
      id: "rTzI",
      type: "last_edited_by",
      last_edited_by: {
        object: "user",
        id: "f3c7bfef-72bd-40b6-adf0-bd2aa8938bc0",
      },
    },
    csv_mitglied: {
      id: "voUI",
      type: "formula",
      formula: { type: "string", string: "" },
    },
    Belegart: {
      id: "%7C%266%24",
      type: "select",
      select: {
        id: "64922327-6301-4b76-858b-5c517b853afa",
        name: "Kontoauszug",
        color: "yellow",
      },
    },
    csv_verwendungszweck: {
      id: "%7Dw%7CX",
      type: "formula",
      formula: { type: "string", string: "2702 Porto, Telefon" },
    },
    Beschreibung: {
      id: "title",
      type: "title",
      title: [
        {
          type: "text",
          text: { content: "O2 Internet", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "O2 Internet",
          href: null,
        },
      ],
    },
  },
  url: "https://www.notion.so/O2-Internet-c4f8dffbabbc49a6be1fb1fa1afbc7ed",
};

exports.example = example;
