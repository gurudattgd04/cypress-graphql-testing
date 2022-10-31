import mongoose from "mongoose";

//Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/widgets", {
  useNewUrlParser: true,
});

const widgetSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  soldout: {
    type: String,
  },
  inventory: {
    type: String,
  },
  stores: {
    type: Array,
  },
});

const Widgets = mongoose.model("widgets", widgetSchema);

export { Widgets };
