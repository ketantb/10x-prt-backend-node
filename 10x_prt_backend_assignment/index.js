const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT;
app.use(express.json())

require("./connectionDB")
require("./contacts/contactsModel.js")
app.use(require("./contacts/contacts.js"))

app.get("/", (req, res) => {
    res.json({message: "welcome"})
})

app.listen(PORT, () => {
    console.log(`app listening to port no: ${PORT}`)
})