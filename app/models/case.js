var mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var CaseSchema = new Schema(
  {
    stores: [{ type: Schema.Types.ObjectId, ref: "Store" }],
    status: {
      type: Number,
      required: false
    },
    //0:Privat: Share match only, 1: Share Position and Time
    privacyLevel: {
      type: Number,
      required: false,
      default: 0
    },
    serverTime: {
      type: Date,
      required: false,
      default: Date.now
    },
    btId: {
      type: String,
      required: false
    },
    contactInfo: {
      phone: String,
      info: String,
      text: String
    },
    username: String,
    password: String,
    id: false
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
CaseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Case", CaseSchema);
