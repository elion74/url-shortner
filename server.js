const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const path = require("path");
dotenv.config();

// server init
const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  message: "Too many calls from this IP, please try again after 1 minutes",
});

// server middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const url_routes = require("./routes/url_routes.js");

// Connection to mongodb
const CONNECTION_DB = process.env.CONNECTION_DB;
mongoose.connect(CONNECTION_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Url = require("./models/url_model.js");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// rate limiter
app.use(limiter);

app.use("/url", url_routes);

app.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);

  let shorturl_query = `${process.env.DOMAIN_NAME}/${id}`;
  console.log(shorturl_query);

  try {
    await Url.findOne({ shorturl: shorturl_query }, (err, doc) => {
      if (doc) {
        res.redirect(doc.longurl); // redirect user to required Url
      } else {
        res.status(404).send({ message: "ERROR Url not found" });
      }
    });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
