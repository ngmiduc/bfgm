import os

from flask import Flask, request, jsonify
from notion.client import NotionClient
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv('NOTION_ACCESS_TOKEN')

DATABASE = 'https://www.notion.so/bfgm/54a05f4c38b645a893af5636e6fce91a?v=3c357ace0e5b4936b31aa8bdcbf2791c'
OPENCALLS = 'https://www.notion.so/bfgm/cb75c467746e4956a08d96253cfaa79f?v=7284d5aa49d347acbb9f769b11c9ff77'


app = Flask(__name__)
CORS(app, resources={"/*": {
  "origins": ["https://www.bfgm.eu", "https://bfgm.eu"]
}})


@app.route('/', methods=['GET'])
def root():
    return "Welcome to the server of BFGM.E.V!"


@app.route('/bfgm-calendar', methods=['GET'])
def api_calendar():

    client = NotionClient(token_v2=TOKEN)

    events = []

    data = client.get_collection_view(DATABASE)
    collection = data.collection.get_rows()


    for c in collection:
        if not (getattr(c,"status") == "\u00f6ffentliche VA") :
            continue

        va = dict(
            id=c.id,
            icon=c.get("format.page_icon"),
            cover=c.get("format.page_cover"),
            title=c.title,
            sub_title=getattr(c,"webseite_untertitel"),
            description=getattr(c,"webseite_text"),
            date=dict(start=getattr(c,"Datum").start, end= getattr(c,"Datum").end),
            type=getattr(c,"Format"),
            organiser=getattr(c,"Veranstalter")
            )

        events.append(va)

    return jsonify(result=events)



@app.route('/bfgm-open-calls', methods=['GET'], endpoint='bfgm-open-calls')
def api_calendar():

    client = NotionClient(token_v2=TOKEN)

    events = []

    data = client.get_collection_view(OPENCALLS)
    collection = data.collection.get_rows()


    for c in collection:
        if not getattr(c,"aktiv") :
            continue

        va = dict(
            id=c.id,
            icon=c.get("format.page_icon"),
            cover=c.get("format.page_cover"),
            title=c.title,
            sub_title=getattr(c,"webseite_untertitel"),
            description=getattr(c,"webseite_text"),
            link=getattr(c,"link"),
            date=dict(start=getattr(c,"Datum").start, end= getattr(c,"Datum").end)
            )

        events.append(va)

    return jsonify(result=events)
