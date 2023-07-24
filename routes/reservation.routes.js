const express = require("express");

const reservationRouter = express.Router();

let seats = [
  [0, 0, 0, 0, 0, 0, 0], //0
  [0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 0, 0, 0, 0], //3
  [0, 0, 0, 0, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0], //7
  [0, 0, 0, 0, 0, 0, 0], //8
  [0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0], //11
];
let emptySeat = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];

let status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const seatBookingPossible = (number) => {
  if (number > 7) {
    return false;
  } else {
    return true;
  }
};

const seatBooking = (number) => {
  if (seatBookingPossible(number)) {
    for (let i = 0; i < seats.length; i++) {
      console.log(emptySeat[i], number, status[i]);
      if (status[i]) {
        if (i === 11) {
          return false;
        }
        continue;
      }
      if (emptySeat[i] >= number) {
        let j;
        let startIndex = i === 11 ? 3 - emptySeat[i] : 7 - emptySeat[i];
        console.log("start index=>current row", startIndex, i);
        for (j = startIndex; j < startIndex + number; j++) {
          seats[i][j] = 1;
        }
        emptySeat[i] = emptySeat[i] - number;
        if (i !== 11 && j >= 7) {
          status[i] = 1;
        } else if (i === 11 && j >= 3) {
          status[i] = 1;
        }
        break;
      } else {
        if (i === 11) {
          return false;
        }
        continue;
      }
    }
    return true;
  } else {
    return false;
  }
};

reservationRouter.post("/book", (req, res) => {
  const number = parseInt(req.body.number);
  console.log(number);
  try {
    if (seatBooking(number)) {
      res.send({ msg: "seat booking successfuly", data: seats });
    } else {
      res.send({ msg: "seat can not booked", data: seats });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "cant do anything" });
  }
});

reservationRouter.get("/list", async (req, res) => {
  try {
    res.send({ data: "in the get" });
  } catch (error) {
    res.send({ msg: "cant sendt", error });
  }
});
reservationRouter.post("/reset", async (req, res) => {
  console.log("aaaa");
  seats = [
    [0, 0, 0, 0, 0, 0, 0], //0
    [0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0], //4
    [0, 0, 0, 0, 0, 0, 0], //5
    [0, 0, 0, 0, 0, 0, 0], //6
    [0, 0, 0, 0, 0, 0, 0], //7
    [0, 0, 0, 0, 0, 0, 0], //8
    [0, 0, 0, 0, 0, 0, 0], //9
    [0, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0], //11
  ];
  emptySeat = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  res.send({ msg: "reset successfully", data: seats });
});

module.exports = { reservationRouter };
