const express = require("express");
const routes = require("./routes/routes");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors")
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use( bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Hello! The API is working at http://localhost:" + PORT);
});
