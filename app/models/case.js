var mongoose = require('mongoose');
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
  id: false
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


module.exports = mongoose.model('Case', CaseSchema);