var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true
    },
    location: {
      // It's important to define type within type field, because
      // mongoose use "type" to identify field's object type.
      type: { type: String, default: "Point" },
      // Default value is needed. Mongoose pass an empty array to
      // array type by default, but it will fail MongoDB's pre-save
      // validation.
      coordinates: { type: [Number], index: "2dsphere" }
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
