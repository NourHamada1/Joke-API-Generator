import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any?type=single";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    res.render("index.ejs", {
      joke: result.data.joke,
    });
  } catch (error) {
    console.log(error.response.data);

    res.status(500);
    res.render("index.ejs");
  }
});

app.post("/post-joke", async (req, res) => {
  try {
    const filter = req.body.search;
    const result = await axios.get(API_URL + `&contains=${filter}`);

    res.render("index.ejs", {
      joke: result.data.joke,
    });
  } catch (error) {
    console.log(error.response.data);

    res.status(500);
    res.render("index.ejs", {
      joke: "No joke found",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
