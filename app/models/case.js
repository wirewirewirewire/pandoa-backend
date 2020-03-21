var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var CaseSchema = new Schema({
  stores: [{ type: Schema.Types.ObjectId, ref: "Store" }],
  status: {
    type: Number,
    required: false
  },
  serverTime: {
    type: Date,
    required: false
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
  status: {
    type: Number
  },
  username: String,
  password: String,
  id: false
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});
CaseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Case', CaseSchema);