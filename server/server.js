const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3001;

const uri = 'mongodb+srv://balaji:balaji@inventorycluster.jzevfgs.mongodb.net/inventoryBilling?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const app = express();

//middlewares
app.use(cors({ origin:'*'}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/items", require("./routes/itemRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/bills", require("./routes/billsRoute"));

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
