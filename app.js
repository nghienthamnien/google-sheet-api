const express = require("express");
const app = express();
const seneca = require("seneca")();
seneca.use(require("./service/sheet_api_service"));

app.use(express.json());

app.post("/consultation-form", async (req, res) => {
  try {
    const data = req.body;
    const response = await seneca.act(
      { role: "sheet", cmd: "insert_row" },
      data,
      (err, result) => {
        if (err) return res.json(err);
        res.send(result);
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

app.listen(8080);
