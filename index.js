const express = require("express");
const { reservationRouter } = require("./routes/reservation.routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/train", reservationRouter);
app.listen(8900, () => {
  console.log(`server is running at port 8900`);
});
