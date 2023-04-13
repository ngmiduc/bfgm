const { initializeApp } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

initializeApp()

exports.DB = getFirestore()
