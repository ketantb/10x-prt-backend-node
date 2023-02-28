const mongoose = require("mongoose")

const key = "mongodb+srv://ketan-10x-prt-backend:ketan-10x-prt-backend@cluster0.tvamht2.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(key)
mongoose.connection.on("connected", () => {"mongoDB connection connection successfull"})
mongoose.connection.on("error", () => {"mongoDB connection connection erroe"})