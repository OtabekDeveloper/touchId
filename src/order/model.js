const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    categories: {
      type: [],
      default: null,
    },
    media: {
      type: [],
      default: null,
    },
    ordernumber: {
      type: Number,
      required: true,
    },
    device : {
      type : [
        {
          name : {type : String , minlength : 3 , maxlength : 50},
          desc : {type : String , minlength : 3 , maxlength : 500}
        }        
      ]
    },
    status : {
      type : Number,
      default : 0
    },
    customer : {
      type: mongoose.Schema.Types.ObjectId, 
      default : null
    },
    executant : {
      type: mongoose.Schema.Types.ObjectId, 
      default : null
    }
  },
  { versionKey: false }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
