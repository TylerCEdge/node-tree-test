const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Factory Schema
const FactoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = Factories = mongoose.model("Factories", FactoriesSchema);
