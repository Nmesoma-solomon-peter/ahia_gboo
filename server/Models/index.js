const db = require("../connectDb");
const Artifacts = require("./artifacts");
const Booking = require("./booking");


// Define associations
Artifacts.associate(db.models);
Booking.associate(db.models);

module.exports = {
  Artifacts,
  Booking,
};