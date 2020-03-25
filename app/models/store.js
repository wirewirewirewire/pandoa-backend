var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    },
    speed: {
      type: Number,
      required: false
    },
    time: {
      type: Date
    },
    geocode: {
      street: String,
      city: String,
      region: String,
      postalCode: Number,
      country: String,
      name: String,
      isoCountryCode: String
    },
    status: {
      type: Number
    },
    id: false
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

module.exports = mongoose.model("Store", StoreSchema);
